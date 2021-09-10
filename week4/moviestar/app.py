from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbsparta

# HTML을 주는 부분


@app.route('/')
def home():
    return render_template('index.html')

# API 역할을 하는 부분


@app.route('/review', methods=['POST'])
def write_review():
    title = request.form['title']
    author = request.form['author']
    review = request.form['review']

    if title == "" or author == "" or review == "":
        return jsonify({'msg': "빈 칸 남기지마"})

    doc = {
        'title': title,
        'author': author,
        'review': review
    }
    db.bookReview.insert_one(doc)

    # db.bookReviews.insert_one(doc)
    return jsonify({'msg': 'DB에 저장 완료!'})


@app.route('/review', methods=['GET'])
def read_reviews():
    data = []
    sample_receive = request.args.get('sample_give')
    print(sample_receive)
    reviews = db.bookReview.find()
    for review in reviews:
        print(review)
        data.append({
            'title': review['title'],
            'author': review['author'],
            'review': review['review']
        })
    return jsonify(data)


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
