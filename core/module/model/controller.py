import whisper


class WhisperController:

    def __init__(self):
        self.model = whisper.load_model("small")
    
    def convert(self, audio_path: str) -> str:
        result = self.model.transcribe(audio_path)
        return result["text"]



# if __name__ == "__main__":
#     model = WhisperController()
#     print(model.convert("test.mp3"))
