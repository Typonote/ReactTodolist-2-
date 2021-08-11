from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

todos = []

@app.route("/delete", methods=["POST"])
def delete():
    data = request.get_json()
    for i in range(len(todos)):
        if todos[i]['id'] == data['id']:
            del todos[i]
            break
    return jsonify(status="success")

@app.route("/todo", methods=["GET","POST"])
def todo():
    if request.method == 'GET':
        return jsonify(todos)
    elif request.method == 'POST':
        data = request.get_json()
        todos.append(data)
        return jsonify(status="success")


if __name__ == "__main__":
    app.run(debug=True)