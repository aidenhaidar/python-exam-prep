
from flask import Flask, request, jsonify, render_template
import random, json

app = Flask(__name__)

with open("questions.json","r") as f:
    questions = json.load(f)

@app.route("/")
def index():
    return render_template("index.html")

@app.get("/question")
def get_question():
    q = random.choice(list(questions.keys()))
    return jsonify({
        "question": q,
        "choices": questions[q][:5],
        "answer": questions[q][5]
    })

@app.post("/check")
def check_answer():
    data = request.json
    q = data["question"]
    user_answer = data["answer"].upper()
    correct = questions[q][5]
    return jsonify({"correct": user_answer == correct, "correct_answer": correct})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
