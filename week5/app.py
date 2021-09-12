from pymongo import MongoClient

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbsparta


# HTML 화면 보여주기
@app.route('/')
def home():
    return render_template('index.html')


# API 역할을 하는 부분
@app.route('/api/list', methods=['GET'])
def show_stars():
    # data = []
    stars = list(db.mystar.find({}, {"_id": False}).sort("like", -1))
    # for star in stars:
    #     data.append({
    #         "name": star['name'],
    #         "like": star['like'],
    #         "imgUrl": star['img_url']
    #     })
    return jsonify({'stars': stars})


@app.route('/api/like', methods=['POST'])
def like_star():
    target = request.form['target']
    db.mystar.find_one_and_update({"name": target}, {'$inc': {
        "like": 1
    }})
    return jsonify({'msg': '{target} 좋아요!'.format(target=target)})


@app.route('/api/delete', methods=['POST'])
def delete_star():
    target = request.form['target']
    db.mystar.find_one_and_delete({"name": target})
    return jsonify({'msg': 'delete 연결되었습니다!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
