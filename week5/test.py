import datetime
import hashlib
from flask.helpers import url_for
import requests
import jwt
from pymongo import MongoClient
from bs4 import BeautifulSoup
from bson.objectid import ObjectId

from flask import Flask, render_template, jsonify, request
from requests.api import post
from werkzeug.utils import redirect

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbsparta

SECRET_KEY = "SPARTA"

# Web Crawling


def get_urls():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    url = "https://movie.naver.com/movie/bi/mi/basic.naver?code=66751"
    data = requests.get(url, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    title = soup.select_one(
        '#content > div.article > div.mv_info_area > div.mv_info > h3 > a:nth-child(1)').text

    # 중복 확인
    # if db.postings.find({"title": title}) != None:
    #     return redirect(url_for("home"))

    description = soup.select_one(
        '#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div.story_area > p').text

    # 요소에서 장르의 텍스트만 추출해서 배열에 저장
    genresArray = []
    genres = soup.select(
        '#content > div.article > div.mv_info_area > div.mv_info > dl > dd:nth-child(2) > p > span:nth-child(1) > a')
    for genre in genres:
        genresArray.append(genre.text)

    imageUrl = soup.select_one(
        '#content > div.article > div.mv_info_area > div.poster > a > img')['src']
    # db.postings collection에 저장하기
    posting = {
        "url": url,
        "title": title,
        "description": description,
        "like": 0,
        "dislike": 0,
        #   "owner": user["id"],
        "comments": [],
        "genres": genresArray,
        "imageUrl": imageUrl
    }

    db.postings.insert_one(posting)


get_urls()
