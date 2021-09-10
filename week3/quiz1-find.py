from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbsparta

matrix = db.posts.find_one({'title' : "매트릭스"})
if matrix is None: 
  print("영화를 찾을 수 없습니다.")
print(matrix['score'])

score = matrix['score']
movies = db.posts.find({'score' : score})
for movie in movies:
  print(movie["title"])

db.posts.update_one({"title" : "매트릭스"}, {"$set" : {"score" : "0"}})