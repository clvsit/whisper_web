from flask import Flask, render_template

from core.entry import whisper_blue


app = Flask(__name__)
app.register_blueprint(whisper_blue)


@app.route("/")
def page_index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7056, debug=True)
