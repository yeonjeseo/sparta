import datetime
import hashlib
from bson.objectid import ObjectId
import requests
import jwt
from pymongo import MongoClient
from bs4 import BeautifulSoup

from flask import Flask, render_template, jsonify, request
from requests.api import post

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbsparta

SECRET_KEY = "SPARTA"

# Web Crawling
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}


# route


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/signup')
def singup():
    return render_template('signup.html')

# add like


@app.route('/api/like', methods=['POST'])
def addLike():
    target = request.form['target']
    db.postings.find_one_and_update({"title": target}, {'$inc': {
        "like": 1
    }})
    return jsonify({'msg': '{target} 좋아요!'.format(target=target)})

# add dislike


@app.route('/api/dislike', methods=['POST'])
def addDislike():
    target = request.form['target']
    db.postings.find_one_and_update({"title": target}, {'$inc': {
        "dislike": 1
    }})
    return jsonify({'msg': '{target} 싫어요!'.format(target=target)})


# register


@app.route('/api/signup', methods=['POST'])
def newSignup():
    id = request.form['id']
    pw = request.form['pw']
    pw_hash = hashlib.sha256(pw.encode('utf-8')).hexdigest()
    user = {
        "id": id,
        "pw": pw_hash
    }
    db.users.insert_one(user)
    print(id, pw_hash)
    return jsonify({
        'result': 'success',
        "msg": '{id} 회원가입이 완료되었습니다!'.format(id=id)})


# login


@app.route('/api/login', methods=['POST'])
def apiLogin():
    id = request.form['id']
    pw = request.form['pw']

    # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
    pw_hash = hashlib.sha256(pw.encode('utf-8')).hexdigest()
    print(pw_hash)
    # id, 암호화된pw을 가지고 해당 유저를 찾습니다.
    result = db.users.find_one({'id': id, 'pw': pw_hash})

    if result is not None:
        payload = {
            'id': id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=60 * 60 * 24)
        }
        token = jwt.encode(payload, SECRET_KEY,
                           algorithm='HS256').decode('utf-8')

        # token을 줍니다.
        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})

# logout


@app.route('/api/logout', methods=['POST'])
def apiLogout():
    return jsonify({'result': "success", 'msg': '로그아웃되었습니다'})


@app.route('/api/url', methods=['POST'])
def apiPosting():
    # 현재 접속중인 사람이 누군지 알기 위해서 토큰 복호화
    token = request.cookies.get('mytoken')
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = db.users.find_one({"id": payload['id']})
    # 스크래핑할 url 받아오기
    url = request.form['url']

    # 여기서 스크래핑
    data = requests.get(url, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    title = soup.select_one(
        '#content > div.article > div.mv_info_area > div.mv_info > h3 > a:nth-child(1)').text

    # db.postings collection에 저장하기
    posting = {
        "title": title,
        "url": url,
        "like": 0,
        "dislike": 0,
        "owner": user["_id"]
    }
    result = db.postings.insert_one(posting)
    # print(result.inserted_id)

    # user에도 저장하기
    db.users.update_one(
        user, {"$push": {'posts': ObjectId(result.inserted_id)}})
    # user = db.users.find_one_and_update(
    #     {'id': payload['id']}, {"$push": {'posts': url}})
    return jsonify({'result': "success", 'msg': '포스팅 완료!'})

# delete a post


@app.route('/api/delete', methods=['POST'])
def apiDelete():
    # 현재 접속중인 사람이 누군지 알기 위해서 토큰 복호화
    token = request.cookies.get('mytoken')
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = db.users.find_one({"id": payload['id']})

    target = request.form['title']
    # postings collection 에서 삭제
    post = db.postings.find_one({"title": target, "owner": user['_id']})
    # 쿼리에 dictionary 타입을 쓸 수 없는데, 그래서 ObjectId 타입을 string으로 변환
    # 그리고 그걸 다시 ObjectId 타입으로 변환해서 쿼리에 사용
    postId = str(post['_id'])
    db.postings.delete_one(post)

    print(postId)
    db.users.update_one(user, {'$pull': {
        'posts': ObjectId(postId)}})
    return jsonify({'msg': '{target} 삭제되었습니다.'.format(target=target)})

# Add comment


@app.route('/api/add-comment', methods=['POST'])
def addComment():
    # 현재 접속중인 사람이 누군지 알기 위해서 토큰 복호화
    token = request.cookies.get('mytoken')
    payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    user = db.users.find_one({"id": payload['id']})
    owner = db.postings.find_one({"title": request.form['owner']})
    comment = request.form['comment']

    document = {
        "comment": comment,
        "author": user['_id'],
        "owner": owner['_id']
    }
    # db comments collection에 저장
    result = db.comments.insert_one(document)

    # users collection에 저장
    db.users.update_one(user, {'$push': {
        "comments": ObjectId(result.inserted_id)
    }})

    # postings collection에 저장
    db.collections.update_one(
        owner, {'$push': {"comments": result.inserted_id}})

    return jsonify({'result': "success", 'msg': '댓글 추가 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
