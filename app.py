
from flask import Flask, render_template, request, jsonify
import json, random

app = Flask(__name__)

with open("questions.json","r") as f:
    questions=json.load(f)

@app.route("/")
def index(): return render_template("index.html")

@app.route("/dashboard")
def dashboard(): return render_template("dashboard.html")

@app.route("/settings")
def settings(): return render_template("settings.html")

@app.get("/question")
def question(): return jsonify(random.choice(questions))

@app.post("/check")
def check():
    data=request.json
    q=next(q for q in questions if q["question"]==data["question"])
    return jsonify({"correct":data["answer"]==q["answer"],"correct_answer":q["answer"]})

if __name__=="__main__": app.run(host="0.0.0.0",port=5000)
