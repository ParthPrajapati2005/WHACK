from flask import Flask, jsonify,request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from functions import calculateTotalDebtAtEndOfGraduation
from BankAccounts import getBank
from LISA import getLISA

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

user = ""

@app.route("/register", methods =['POST'])
def register():

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    print(username,password)
    if not username or not password:
        return jsonify({"error":"Missing username or password"}),200
    
    if mycol.find_one({"name" : username}) is not None:
        return jsonify({"error":"Username already taken"},),200

    myTempUser = {"name" : username, "password" : password,
                  "debt": {"student" : 0} , "income": {"maintenance":0, "job":0, "other":0},
                  "expenses":{"groceries":0, "rent":0, "travel":0, "hobbies":0, "other":0}}
    mycol.insert_one(myTempUser)
    return jsonify({"message":"New user added"}),200

@app.route('/login', methods=['POST'])
def login():
    data=request.get_json()

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error":"Missing username or password"}),200

    if mycol.find_one({"name" : username, "password" : password}) == None:
        return jsonify({"error":"Wrong username or password"}),200
    else:
        user = username
        return jsonify({"message":"Logged In"}),200

@app.route('/income', methods=['POST'])
def getIncome():
    data=request.get_json()
    startYear = data.get('start')
    endYear = data.get('end')
    maintenance = data.get('maintenance')
    job = data.get('job')
    other = data.get('other')
    if not startYear or not endYear:
        return jsonify({"message":"Missing start or end year"},status=200),200
    if not maintenance:
        maintenance = 0
    if not job:
        job = 0
    if not other:
        other = 0
    debt = calculateTotalDebtAtEndOfGraduation(startYear,endYear,maintenance)
    mycol.update_one(
        {"name": user},  # Filter by username
        {"$set": {"debt": {"student" : debt} , "income": {"maintenance":maintenance/12, "job":job, "other":4*other}}}  # Set debt/income even if not already there
    )
    return jsonify({"income": (maintenance / 12) + job + 4 * other, "debt": debt}), 200


@app.route('/expenses', methods=['POST'])
def getExpenses():
    data=request.get_json()
    groceries = data.get('groceries')
    rent = data.get('rent')
    travel = data.get('travel')
    hobbies = data.get('hobbies')
    other = data.get('other')
    if not rent or not groceries:
        return jsonify({"message":"Missing rent or groceries"},status=200),200
    if not travel:
        travel = 0
    if not hobbies:
        hobbies = 0
    if not other:
        other = 0
    mycol.update_one(
        {"name": user},  # Filter by username
        {"$set": {"expenses":{"groceries":groceries*4, "rent":rent, "travel":travel*4, "hobbies":hobbies*4, "other":other*4}}}
    )
    return jsonify({"expenses":(groceries+travel+hobbies+other)*4+rent}),200

@app.route('/homepage', methods=['POST'])
def getData():
    data=request.get_json()
    username = data.get('username')
    theUser = mycol.find_one({"username": username})
    if theUser == None:
        return jsonify({"message":"User not found"},status=404),404
    return jsonify(theUser,status=200),200

@app.route('/banks', methods=['POST'])
def getData():
    return jsonify({"bank":getBank(), "LISA":getLISA()})

if __name__ == "__main__":
    app.run(debug=True)