import {
    closeRecordMicrophone,
    startRecordMicrophoneTime,
} from '../utils/functions';

const _microphone = {
    _stream: false,
    _mimeType: 'audio/webm',
    _mediaRecorder: null,
    _recordedChunks: [],
    _finishFile: null,
    resetAudio: function () {
        this._mediaRecorder = null;
        this._recordedChunks = [];
        this._finishFile = null;
        this._stream = false;
    },
    start: function () {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
            })
            .then((stream) => {
                this.resetAudio();
                this._stream = stream;

                this.startRecorder();
            })
            .catch((err) => {
                closeRecordMicrophone();
                console.log(err);
            });
    },
    stop: function () {
        if (this._stream) {
            this._stream.getTracks().forEach((track) => track.stop());
        }
    },
    startRecorder: function () {
        if (this._stream) {
            startRecordMicrophoneTime();
            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType,
            });

            this._mediaRecorder.addEventListener('dataavailable', (e) => {
                this._recordedChunks.push(e.data);
            });

            this._mediaRecorder.start();
        }
    },
    stopRecorder: function () {
        return new Promise((resolve, reject) => {
            try {
                this._mediaRecorder.addEventListener('stop', () => {
                    const blob = new Blob(this._recordedChunks, {
                        type: this._mimeType,
                    });
                    const fileName = `rec-${Date.now()}.webm`;

                    const file = new File([blob], fileName, {
                        type: this._mimeType,
                        lastModified: Date.now(),
                    });
                    resolve(file);
                });

                this.stop();
                this._mediaRecorder.stop();
                this.resetAudio();
            } catch (err) {
                reject(err);
                this.resetAudio();
            }
        });
    },
};

export default _microphone;
