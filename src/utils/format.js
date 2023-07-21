const format = {
    _locale: 'pt-BR',
    getCamelCase: (text) => {
        // criando uma div apenas para pegar o id formatado
        let div = document.createElement('div');
        div.innerHTML = `<div data-${text}="id"></div>`;
        //js formata automaticamente o dataset, ex: data-nome-anderson ele retorna nomeAnderson
        return Object.keys(div.firstChild.dataset)[0];
    },
    toTime: (time) => {
        const seconds = parseInt(time / 1000) % 60;
        const minutes = parseInt(time / (1000 * 60)) % 60;
        const hours = parseInt(time / (1000 * 60 * 60)) % 60;

        return hours > 0
            ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
                  .toString()
                  .padStart(2, '0')}`
            : `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },
    timeStampToTime: function (timeStamp) {
        return timeStamp && typeof timeStamp.toDate === 'function'
            ? this.dateToTime(timeStamp.toDate())
            : '';
    },
    dateToTime: function (date) {
        return date.toLocaleTimeString(this._locale, {
            hour: '2-digit',
            minute: '2-digit',
        });
    },
    sizeToMB: (size) => {
        return `${parseFloat(size / 100000).toFixed(2)} MB`;
    },
};

export default format;
