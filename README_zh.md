# Whisper-Flask Transcription Service

该项目利用 OpenAI 的 Whisper 模型创建了一个 Flask 网络服务，允许用户上传音频文件并接收转录。该服务旨在方便用户并提高效率，为用户提供将音频内容转换为文本格式的简单界面。音频文件上传后，Whisper 模型会对音频进行处理，并将转录结果显示在网页上。

## 功能
- 音频文件上传功能
- 使用 OpenAI 的 Whisper 模型进行音频处理
- 简单直观的用户界面

## 安装
要在本地计算机上设置 Whisper-Flask 转录服务，请按照以下步骤操作：

1. 克隆版本库：

    ```bash
    git clone https://github.com/clvsit/whisper-web.git
    cd whisper_web
    ```

2. 创建虚拟环境（可选）：

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\\Scripts\\activate`
    ```

3. 安装所需的依赖：

    ```bash
    pip install -r requirements.txt
    ```

4. 安装 ffmpeg：可参考 [whisper](https://github.com/openai/whisper) **Setup** 章节介绍的安装方式。

    ```bash
    # on Ubuntu or Debian
    sudo apt update && sudo apt install ffmpeg

    # on Arch Linux
    sudo pacman -S ffmpeg

    # on MacOS using Homebrew (https://brew.sh/)
    brew install ffmpeg

    # on Windows using Chocolatey (https://chocolatey.org/)
    choco install ffmpeg

    # on Windows using Scoop (https://scoop.sh/)
    scoop install ffmpeg
    ```

5. 获取 whisper 模型：[Hugging Face OpenAI](https://huggingface.co/openai)：
    - whisper-tiny: https://huggingface.co/openai/whisper-tiny
    - whisper-base: https://huggingface.co/openai/whisper-base
    - whisper-small：https://huggingface.co/openai/whisper-small
    - whisper-medium: https://huggingface.co/openai/whisper-medium
    - whisper-large: https://huggingface.co/openai/whisper-large
    - whisper-large-v2: https://huggingface.co/openai/whisper-large-v2

6. 修改 `setting.json` 配置文件，设置 whisper 模型的路径。
    ```json    
    {
    "model": {
        "size": "small",
        "dir_path": "model_dir"
        }
    }
    ```
    - `size`：模型的尺寸。
    - `dir_path`：存放模型的目录路径。

7. 启动 Flask 服务：

    ```bash
    python server.py
    ```

## 使用方法

要使用 Whisper-Flask 转录服务，请按照以下步骤操作：
1. 通过浏览器访问网络服务（`http://127.0.0.1:7056/whisper/`）。
2. 点击“选择文件”按钮，从电脑中选择音频文件。
3. 选择文件后，点击“进行转录”按钮开始转录过程。
4. 等待转录完成。转录的文本将显示在页面上。

![demo](https://raw.githubusercontent.com/clvsit/whisper_web/master/img/demo.png)
