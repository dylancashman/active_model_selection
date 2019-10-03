from flask import Flask, request

app = Flask(__name__)


@app.route('/', methods = ["GET", "POST"])
def hello_world():
    return str(int(request.json['requested']) + 1)


if __name__ == '__main__':
    app.run()
