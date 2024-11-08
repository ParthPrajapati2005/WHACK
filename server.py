from flask import Flask, jsonify,request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from functions import calculateTotalDebtAtEndOfGraduation
from functions import suggestSpendingMl
from BankAccounts import getBank
from LISA import getLISA
from salary import getSalary

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
                  "debt": {} , "income": {},
                  "expenses":{}, "balance":0}
    mycol.insert_one(myTempUser)
    return jsonify({"message":"New user added"}),200

@app.route('/login', methods=['POST'])
def login():
    global user
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

@app.route('/userobject', methods=['POST'])
def getUserObject():
    x = mycol.find_one({"name" : user})
    print("I AM USING USER ", user)
    print("I GOT USER : ",x)

    if x and "_id" in x:
        x["_id"] = str(x["_id"])

    return jsonify({"user": x})

@app.route('/setuserobject', methods=['POST'])
def setUserObject():
    data = request.get_json()
    x = data.get('userObj')

    del x['_id']

    mycol.update_one(
        {"name": user},  # Filter by username
        {"$set": x}
    )

    return jsonify({"message":"recieved"}), 200

@app.route('/homepage', methods=['POST'])
def getData():
    data = request.get_json()
    username = data.get('username')
    print(f"Username: {username}")
    theUser = mycol.find_one({"username": username})
    print(f"The user {theUser}")
    if theUser == None:
        print("None found")
        return jsonify({"message":"User not found"}),200
    return jsonify(theUser),200

@app.route('/getDataNoName', methods=['POST'])
def getDataNoName():
    theUser = mycol.find_one({"username": user})
    if theUser == None:
        return jsonify({"message":"User not found"},status=404),404
    return jsonify(theUser),200

@app.route('/banks', methods=['POST'])
def getBankData():
    lisa_data = getLISA() 
    lisa_data_json = [list(row) for row in lisa_data]
    return jsonify({"bank":getBank(), "LISA":lisa_data_json})

@app.route('/suggested',methods=['POST'])
def getSuggested():
    # print("IN SUGGESTED")
    data = request.get_json()
    print(data)
    # print("My income",data.get("income"))
    return jsonify(suggestSpendingMl(int(data['income']))),200


@app.route('/future', methods=['POST'])
def futurePlanner():
    data = request.get_json()
    startYear = data.get('start')
    time = data.get('end')
    degree = data.get('degreeType')
    county = data.get('counties')
    maintenance = data.get('maintenance')
    salary = getSalary(degree,county)
    debt = calculateTotalDebtAtEndOfGraduation(int(startYear),int(time), int(maintenance))
    if salary < 27295:
        years = "You won't have to pay back loans at this wage"
    else:
        years = "You pay back £" +str((salary-27295)*1.09)+" a year"
  
    return jsonify({"debt":debt,"salary":salary,"years":years})

if __name__ == "__main__":
    app.run(debug=True)