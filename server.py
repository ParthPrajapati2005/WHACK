from flask import Flask, jsonify,request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
database={}
@app.route('/hello', methods=['POST'])
def index():
    print("Hello TERMINAL")
    return "",200

@app.route("/register", methods =['POST'])
def register():
    data = request.get_json()
    username =data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message":"Missing username or password"},status=400),400
    
    if username in database:
        return jsonify({"message":"Username already taken"},status=400),400
    
    database[username]={"username":username,"password":password}
    return jsonify({"message":"New user added"},status=200),200

def login():
    data=request.get_json()
    pass
if __name__ == "__main__":
    app.run(debug=True)
