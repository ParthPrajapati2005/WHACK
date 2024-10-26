from flask import Flask, jsonify,request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://whack:whack2024@cluster0.dyjyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))

app = Flask(__name__)
CORS(app)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

mydb = client["whack"]
mycol = mydb["users"]

mydict = { "name": "John", "password": "Highway37" }

x = mycol.insert_one(mydict)


@app.route('/hello', methods=['POST'])
def index():
    print("Hello TERMINAL")
    
    return "",200

if __name__ == "__main__":
    app.run(debug=True)
