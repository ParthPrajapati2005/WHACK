from flask import Flask, jsonify,request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from functions import calculateTotalDebtAtEndOfGraduation
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

    if not username or not password:
        return jsonify({"message":"Missing username or password"},status=400),400
    
    if mycol.find_one({"name" : username}) is not None:
        return jsonify({"message":"Username already taken"},status=400),400

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

@app.route('/income', methods=['POST'])
def getIncome():
    data=request.get_json()
    startYear = data.get('start')
    endYear = data.get('end')
    maintenance = data.get('maintenance')
    job = data.get('job')
    if not startYear or not endYear:
        return jsonify({"message":"Missing start or end year"},status=400),400
    if not maintenance:
        maintenance = 0
    if not job:
        job = 0
    debt = calculateTotalDebtAtEndOfGraduation(startYear,endYear,maintenance)
    return jsonify({"income":(maintenance/12)+job, "debt":debt},status=200),200


@app.route('/expenses', methods=['POST'])
def getExpenses():
    data=request.get_json()
    groceries = data.get('groceries')
    rent = data.get('rent')
    travel = data.get('travel')
    hobbies = data.get('hobbies')
    if not rent or not groceries:
        return jsonify({"message":"Missing rent or groceries"},status=400),400
    if not travel:
        travel = 0
    if not hobbies:
        hobbies = 0
    return jsonify({"expenses":(groceries+rent+travel+hobbies)*4},status=200),200

if __name__ == "__main__":
    app.run(debug=True)