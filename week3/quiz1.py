from pymongo import MongoClient
import requests
from bs4 import BeautifulSoup

client = MongoClient('localhost', 27017)
db = client.dbsparta

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://movie.naver.com/movie/sdb/rank/rmovie.nhn?sel=pnt&date=20200303',headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')

trs = soup.select('#old_content > table > tbody > tr')
for tr in trs:
  aTag = tr.select_one('td.title > div > a')
  if aTag is not None:
    title = aTag.text
    rank = tr.select_one('td:nth-child(1) > img')['alt']
    score = tr.select_one('td.point').text

    doc = {
      "title" : title,
      "rank" : rank,
      "score" : score
    }

    db.posts.insert_one(doc)