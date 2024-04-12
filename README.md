# Whisper-Flask Transcription Service

This project utilizes OpenAI's Whisper model to create a Flask web service that allows users to upload audio files and receive transcriptions. The service is designed to be user-friendly and efficient, providing a simple interface for users to convert their audio content into text format. Once the audio file is uploaded, the Whisper model processes the audio and the resulting transcription is displayed on the web page.

## Features
- Audio file upload functionality
- Audio processing with OpenAI's Whisper model
- Simple and intuitive user interface

## Installation
To set up the Whisper-Flask Transcription Service on your local machine, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/clvsit/whisper-web.git
    cd whisper_web
    ```

2. Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\\Scripts\\activate`
    ```

3. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Installation of ffmpeg: You can refer to the installation method described in [whisper](https://github.com/openai/whisper) **Setup** section.

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

5. Fetch whisper model: [Hugging Face OpenAI](https://huggingface.co/openai):
    - whisper-tiny: https://huggingface.co/openai/whisper-tiny
    - whisper-base: https://huggingface.co/openai/whisper-base
    - whisper-small：https://huggingface.co/openai/whisper-small
    - whisper-medium: https://huggingface.co/openai/whisper-medium
    - whisper-large: https://huggingface.co/openai/whisper-large
    - whisper-large-v2: https://huggingface.co/openai/whisper-large-v2

6. Modify the `setting.json` configuration file to set the path to the whisper model.
    ```json    
    {
    "model": {
        "size": "small",
        "dir_path": "model_dir"
        }
    }
    ```
    - `size`：Scale of the model, such as "small"、"base" etc.
    - `dir_path`：The path to the directory where the model is stored.

7. Start the Flask server:

    ```bash
    python server.py
    ```

## Usage

To use the Whisper-Flask Transcription Service, follow these steps:
1. Access the web service through your browser.
2. Click on the "选择文件" button to select an audio file from your computer.
3. Once the file is selected, click on the "进行转录" button to start the transcription process.
4. Wait for the transcription to complete. The transcribed text will be displayed on the page.

![demo](https://markdown-picture-clvsit.oss-cn-hangzhou.aliyuncs.com/work/whisper_web/whisper_web_demo.png)
