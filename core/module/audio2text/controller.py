import os

import whisper
from loguru import logger

from core.utils.common import get_root_dir, get_system_config


class WhisperController:

    def __init__(self):
        self.__root_dir = get_root_dir()
        self.__model_config: dict = get_system_config("model")
        logger.info(f"Model Config: {self.__model_config}")
        
        model_size = self.__model_config.get("size", "small")
        model_path = os.path.join(self.__root_dir, self.__model_config.get("dir_path", ""))
        logger.info(f"Load whisper model, size: {model_size}, model_path: {model_path}")
        self.model = whisper.load_model(model_size, download_root=model_path)
    
    def convert(self, audio_path: str) -> dict:
        result = self.model.transcribe(audio_path)

        return {
            "text": result["text"],
            "segments": [
                {
                    "start": f"{round(segment['start'], 2):.2f}",
                    "end": f"{round(segment['end'], 2):.2f}",
                    "text": segment["text"]
                } for segment in result["segments"]
            ]
        }



# if __name__ == "__main__":
#     model = WhisperController()
    # print(model.convert("test.mp3"))
