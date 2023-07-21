import { el } from '../elements';
import { closeAllMainPanel } from '../utils/functions';

const _camera = {
    _stream: null,
    _videoEl: null,
    start: function (videoEl) {
        this._videoEl = videoEl;

        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: false,
            })
            .then((stream) => {
                this._stream = stream;
                videoEl.srcObject = stream;
                videoEl.play();
            })
            .catch((err) => {
                closeAllMainPanel();
                el.panelMessagesContainer.show();
                console.log(err);
            });
    },
    stop: function () {
        this._stream.getTracks().forEach((track) => track.stop());
    },
    takePhoto: function (mimeType = 'image/png') {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('height', this._videoEl.videoHeight);
        canvas.setAttribute('width', this._videoEl.videoWidth);

        const context = canvas.getContext('2d');

        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL(mimeType);
    },
};

export default _camera;
