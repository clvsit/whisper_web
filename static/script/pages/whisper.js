const vue = new Vue({
    el: "#app",
    data: {
        file: {
            infer: {
                list: []
            },
        },
        input: {
            voice: ""
        },
        recorder: {
            obj: null,
            method: 2, // 0 表示没有操作，1 表示录音，2 表示文件
        },
        result: {
            isHave: false,
            isRun: false,
            sourceAudio: null,
            audioText: "",
            textSpans: [],
        },
        alert: {
            isShow: false,
            type: "info",
            msg: ""
        },
        panel: 0
    },
    created() {
        let _this = this;

        this.$nextTick(() => {
            _this.setHeight();
            Particles.init({
                selector: '.particle-background',
                maxParticles: 450
            });
            $("#inferFile").on("change", () => {
                _this.changeFileItemByFile("infer");
            });
        });

        let recorder = Recorder({
            type: "wav",
            sampleRate: 24000,
            bitRate: 16
        });

        recorder.open(() => {
            console.log("已打开录音，可以点击录制开始录音了");
        });
        this.recorder.obj = recorder;
    },
    methods: {
        setHeight() {
            this.$nextTick(() => {
                let height = document.documentElement.clientHeight;

                document.getElementById("app").style.height = (height - 1) + "px";
                $("#main").height(height - 172);
                $("#mainBody").height(height - 252);
                $("#resultPanel").height(height - 432);
                $("#resultPanelSegments").height(height - 228);
            });
        },
        startRecord() {
            this.recorder.blob = null;
            this.recorder.status = 1;
            this.recorder.obj.start();
        },
        stopRecord() {
            let _this = this;

            this.recorder.status = 0;
            this.recorder.obj.stop((blob, duration) => {
                console.log(blob, (window.URL || webkitURL).createObjectURL(blob), "时长:" + duration + "ms");
                _this.recorder.blob = blob;

                const reader = new FileReader();

                reader.readAsDataURL(_this.recorder.blob);
                reader.onload = function (e) {
                    _this.recorder.blob = e.target.result;
                }
            }, (msg) => {
                console.log(msg);
            });
        },
        openAlert(times) {
            let _this = this;

            this.alert.isShow = true;

            if (times > 0) {
                setTimeout(() => {
                    _this.alert.isShow = false;
                    _this.alert.msg = "";
                }, times);
            }
        },

        changeFileItemByFile(type) {
            let fileList = $("#" + type + "File")[0].files;

            console.dir(fileList);

            for (let i = 0; i < fileList.length; i++) {
                const fileItem = fileList[i];

                if (type === "infer" && (fileItem.type === "audio/mpeg")) {
                    this.file.infer = {
                        name: fileItem.name,
                        // size: this.getFileSize(fileItem.size),
                        type: fileItem.type,
                        status: "no-upload",
                        file: fileItem
                    };
                }
                else {
                    console.log(fileItem.type);
                    this.alert.msg = "上传文件类型 " + fileItem.type + " 不支持，请上传 mp3 格式的音频文件";
                    this.alert.type = "error";
                    this.openAlert(3000);
                }
            }

            if (type === "infer") {
                const reader = new FileReader(),
                    _this = this;

                // 将文件以 Data URL 形式读入页面
                reader.readAsDataURL(this.file.infer.file);
                reader.onload = function (e) {
                    _this.recorder.blob = this.result;
                    _this.recorder.method = 2;
                }
            }
        },

        request(type) {
            let _this = this;

            if (type === "infer") {
                // 先清空历史记录
                this.result.sourceAudio = null;
                this.result.audioText = ""
                this.result.textSpans = [];

                this.result.isRun = true;
                setTimeout(() => {
                    _this.result.sourceAudio = _this.recorder.blob;
                    $.ajax({
                        method: "POST",
                        url: "/whisper/transcribe",
                        data: JSON.stringify({
                            data: (/.+;\s*base64\s*,\s*(.+)$/i.exec(_this.recorder.blob) || [])[1]
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        },
                        success(resp) {
                            _this.result.audioText = resp.data.text;
                            _this.result.textSpans = resp.data.segments;
                        },
                        error(status) {
                            console.log(status);
                        },
                        complete() {
                            _this.result.isRun = false;
                        }
                    });
                    _this.result.isHave = true;
                }, 1000);
            }
        }
    }
})