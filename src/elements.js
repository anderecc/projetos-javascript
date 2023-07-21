import format from './utils/format';
export const el = {};
export const loadElements = () => {
    document.querySelectorAll('[id]').forEach((element) => {
        //aqui ele vai mandar o id para formatar

        el[format.getCamelCase(element.id)] = element;
    });
    return el;
};

(() => {
    loadElements();
})();

Element.prototype.hide = function () {
    this.style.display = 'none';
    return this;
};

Element.prototype.show = function () {
    this.style.display = 'block';
    return this;
};

Element.prototype.toggle = function () {
    this.style.display = this.style.display === 'block' ? 'none' : 'block';
    return this;
};

Element.prototype.on = function (events, fn) {
    events.split(' ').forEach((event) => {
        this.addEventListener(event, fn);
    });
    return this;
};

Element.prototype.css = function (styles) {
    for (const name in styles) {
        // aqui ele ta pegando a chave no name e no styles[name] ele vai retornar o valor da chave
        this.style[name] = styles[name];
    }
    return this;
};

Element.prototype.addClass = function (name) {
    this.classList.add(name);
    return this;
};

Element.prototype.removeClass = function (name) {
    this.classList.remove(name);
    return this;
};

Element.prototype.toggleClass = function (name) {
    this.classList.toggle(name);
    // retornando o this (proprio elemento) eu consigo chamar uma atras da outra
    //ex: el.app.css({}).addClass('teste')
    return this;
};

Element.prototype.hasClass = function (name) {
    return this.classList.contains(name);
};

HTMLFormElement.prototype.getForm = function () {
    return new FormData(this);
};

HTMLFormElement.prototype.toJSON = function () {
    const json = {};

    this.getForm().forEach((value, key) => {
        json[key] = value;
    });

    return json;
};
