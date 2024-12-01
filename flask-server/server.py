from flask import Flask, request, jsonify

app = Flask(__name__)

#members api route
@app.route("/members")
def members():
    return {'members':['M1','M2','M3','M4']}

@app.route("/add", methods=["POST"])
def add_numbers():
    try:
        data = request.get_json()
        num1 = data.get('num1')
        num2 = data.get('num2')
        
        if num1 is None or num2 is None:
            return jsonify({"error": "Both numbers are required"}), 400

        result = num1 + num2
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)