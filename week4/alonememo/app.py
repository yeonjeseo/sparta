import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client.dbsparta

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/memo', methods=['POST'])
def saveArticle():
    test = request.get_json()
    articleUrl = test['articleUrl']
    comment = test['comment']

    # Crawling
    data = requests.get(
        articleUrl, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')

    imgUrl = soup.select_one(
        '#content > div.article > div.mv_info_area > div.poster > a > img')['src']
    description = soup.select_one(
        '#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div.story_area > p').text
    title = soup.select_one(
        '#content > div.article > div.mv_info_area > div.mv_info > h3 > a:nth-child(1)').text

    data = {
        "title": title,
        "url": articleUrl,
        "imgUrl": imgUrl,
        "description": description,
        "comment": comment
    }

    db.articles.insert_one(data)

    return jsonify({"result": '여기는 백엔드, 잘 받았음'})


@app.route('/memo', methods=['GET'])
def showArticles():
    data = []
    articles = list(db.articles.find())
    print(articles)
    for article in articles:
        data.append({
            "title": article['title'],
            "url": article['url'],
            "imgUrl": article['imgUrl'],
            "description": article['description'],
            "comment": article['comment'],
        })
    return jsonify({
        "data": data,
        "result": "Hello World!"})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
