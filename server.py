from flask import Flask, jsonify,request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/hello', methods=['POST'])
def index():
    print("Hello TERMINAL")
    return "",200

if __name__ == "__main__":
    app.run(debug=True)
