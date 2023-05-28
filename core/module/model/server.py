import os
import uuid
import base64

from flask import Blueprint, render_template, request

from core.module.model.controller import WhisperController


whisper_blue = Blueprint("whisper", __name__, url_prefix="/whisper")
# whisper_model = WhisperController()
static_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "static/audio")


@whisper_blue.route("/")
def page_asr():
    return render_template("whisper.html")


@whisper_blue.route("/transcribe", methods=["POST"])
def transcribe():
    if request.method != "POST":
        return {"code": 0, "msg": "请求方法有误！"}
    
    req_json = request.json
    file_name = f"{str(uuid.uuid4())}.mp3"
    audio_path = os.path.join(static_dir, file_name)
    
    with open(audio_path, "wb") as file:
        file.write(base64.b64decode(req_json["data"]))
    
    print(audio_path)
    # text = whisper_model.convert(audio_path)
    text = "测试一下"
    
    return {"code": 1, "msg": "音频转文本成功！", "data": {"text": text}}
