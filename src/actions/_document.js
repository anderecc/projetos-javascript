import * as PDFJS from 'pdfjs-dist';
PDFJS.GlobalWorkerOptions.workerSrc = `
//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js
`;
const _document = {
    _preview: null,
    _file: null,
    preview: (file) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            switch (file.type) {
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                case 'image/gif':
                    reader.onload = () => {
                        resolve({ src: reader.result, info: file.name });
                    };
                    reader.onerror = (err) => {
                        reject(err);
                    };
                    reader.readAsDataURL(file);
                    break;

                case 'application/pdf':
                    reader.onload = () => {
                        var loadingTask = PDFJS.getDocument({
                            url: reader.result,
                        });
                        loadingTask.promise.then(
                            (pdf) => {
                                // Fetch the first page
                                var pageNumber = 1;
                                pdf.getPage(pageNumber).then((page) => {
                                    var scale = 1.5;
                                    var viewport = page.getViewport({
                                        scale: scale,
                                    });

                                    // Prepare canvas using PDF page dimensions
                                    var canvas =
                                        document.createElement('canvas');
                                    var context = canvas.getContext('2d');
                                    canvas.height = viewport.height;
                                    canvas.width = viewport.width;

                                    // Render PDF page into canvas context
                                    var renderContext = {
                                        canvasContext: context,
                                        viewport: viewport,
                                    };
                                    var renderTask = page.render(renderContext);
                                    renderTask.promise.then(() => {
                                        const _s = pdf.numPages > 1 ? 's' : '';
                                        resolve({
                                            src: canvas.toDataURL('image/png'),
                                            info: `${pdf.numPages} página${_s}`,
                                        });
                                    });
                                });
                            },
                            (err) => reject(err)
                        );
                    };
                    reader.onerror = (err) => reject(err);

                    reader.readAsDataURL(file);

                    break;
                default:
                    reject();
                    break;
            }
        });
    },
};

export default _document;
