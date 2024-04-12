import os
import uuid
import base64

from flask import Blueprint, render_template, request

from core.module.audio2text.controller import WhisperController


whisper_blue = Blueprint("whisper", __name__, url_prefix="/whisper")
whisper_model = WhisperController()

cur_path = os.path.abspath(os.path.dirname(__file__))   # 获取当前文件的目录
proj_path = cur_path[:cur_path.find('core')]   # 获取根目录
static_dir = os.path.join(proj_path, "static/audio")


@whisper_blue.route("/")
def page_whisper():
    return render_template("whisper.html")


@whisper_blue.route("/transcribe", methods=["POST"])
def transcribe():
    if request.method != "POST":
        return {"code": 0, "msg": "请求方法有误！"}
    
    req_json = request.json
    file_name = f"{str(uuid.uuid4())}.mp3"
    audio_path = os.path.join(static_dir, file_name)
    print(f"audio path: {audio_path}")
    
    with open(audio_path, "wb") as file:
        file.write(base64.b64decode(req_json["data"]))

    result: dict = whisper_model.convert(audio_path)
    
    return {"code": 1, "msg": "音频转文本成功！", "data": {"text": result["text"], "segments": result["segments"]}}
