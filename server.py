from flask import Flask, jsonify,request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://whack:whack2024@cluster0.dyjyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

mydb = client["whack"]
mycol = mydb["users"]

@app.route('/hello', methods=['GET'])
def index():
    print("Hello TERMINAL")
    return "test"

@app.route("/register", methods =['POST'])
def register():

    print("I GOT A POST REQ")

    data = request.get_json()
    username =data.get('username')
    password = data.get('password')

    print(username,password)
    if not username or not password:
        print("Null")
        return jsonify({"error":"Missing username or password"}),200
    
    if mycol.find_one({"name" : username}) is not None:
        print("Taken")
        return jsonify({"error":"Username already taken"}),200

    myTempUser = {"name" : username, "password" : password}
    mycol.insert_one(myTempUser)
    return jsonify({"message":"New user added"}),200

@app.route('/login', methods=['POST'])
def login():
    data=request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message":"Missing username or password"},status=400),400

    if mycol.find_one({"name" : username, "password" : password}) == None:
        return jsonify({"message":"Wrong username or password"},status=400),400
    else:
        return jsonify({"message":"Logged In"},status=200),200


if __name__ == "__main__":
    app.run(debug=True)