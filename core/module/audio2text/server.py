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
    # text = """
    # 欢迎来到Onboard,真实的一线经验,走心的投资思考。我是Monica。我是高宁,我们一起聊聊软件如何改变世界。
    # 大家好,欢迎来到Onboard,我是Monica。自从OpenAI发布的chatGBT掀起了席卷世界的AI热潮,不到三个月就积累了超过一亿的月货用户,
    # 超过1300万的日货用户,真的是展现了AI让人惊叹的能力,也让很多人直呼这就是下一个互联网的未来。有不少观众都说,希望我们再做一期AI的讨论,
    # 于是这次硬核讨论就来了。这次我们请来了Google Brain的研究员雪芝,她是Google大语研模型Pump Pathway Language Model的作者之一。
    # 要知道,这个模型的参数量是GPT3的三倍还多。另外还有两位AI产品大牛,一位来自著名的Stable Diffusion背后的商业公司Sublity AI,
    # 另一位来自某硅骨科技大厂,也曾在无人大教授的Landing AI中担任产品负责人。此外,Monica还邀请到一位一直关注AI的投资人朋友Bio,
    # 当作我的特邀共同主持嘉宾。我们主要讨论几个话题,一方面,从研究的视角,最前沿的研究者在关注什么?
    # 现在技术的天花板和未来大的变量可能会在哪里?从产品和商业的角度,什么是一个好的AI产品?整个争态可能随着技术有怎样的演变?
    # 更重要的是,我们又能从上一波AI的创业热潮中学到什么?最后,Monica和Bio还会从投资人的视角做一个回顾、总结和畅想。
    # 这里还有一个小的update,在本集发布的时候,Google也对爆发式增长的GPT做出了回应。
    # 正在测试一个基于Lumda模型的聊天机器人ApprenticeBot。正式发布后会有怎样的惊喜,我们都拭目以待。
    # AI无理是未来几年最令人兴奋的变量之一。Monica也希望未来能邀请到更多一线从业者从不同角度讨论这个话题。
    # 不论是想要做创业、研究、产品还是投资的同学,希望这些对话对于大家了解这些技术眼镜、商业的可能,
    # 甚至未来对我们每个人、每个社会意味着什么都能引发一些思考,提供一些启发。这次的讨论有些技术硬核,
    # 需要各位对生成是AI、大模型都有一些基础了解。讨论中涉及到的论文和重要概念也会总结在本集的简介中供大家复习参考。
    # 几位嘉宾在北美工作生活多年,夹杂英文在所难免,也请大家体谅了。欢迎来到未来,大家enjoy!
    # """
    
    return {"code": 1, "msg": "音频转文本成功！", "data": {"text": result["text"], "segments": result["segments"]}}
