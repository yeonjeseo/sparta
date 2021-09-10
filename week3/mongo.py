from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta

# insert / find / update / delete
doc = {
  "author" : "Mike",
  "text" : "My first pymongo!"
}
db.posts.insert_one(doc)