function Class() {}
Class.extend = function (desc) {
    // Реализовать данный метод
    const result = function(...args) {
        desc.constructor.apply(this, args);
        for (let key of Object.keys(desc)) {
            if (key !== 'constructor') {
                this[key] = desc[key].bind(this);
            }
        }
        
    }
    result.extend = Class.extend;
    result.prototype.__proto__ = this.prototype;
    
    return result;
};


/** @class Widget */
var Widget = Class.extend(/** @lends Widget.prototype */{
    constructor: function (el, options) {
        this.el = el;
        this.options = options;
    },

    find: function (selector) {
        return this.el.querySelector(selector);
    }
});

/** @class Dropdown */
/** @extends Widget */
var Dropdown = Widget.extend(/** @lends Dropdown.prototype */{
    constructor: function () {
        Widget.apply(this, arguments);
        console.log(this);
        this.find('.js-ctrl').addEventListener('click', this);
    },

    handleEvent: function (evt) {
        this.toggle();
    },

    toggle: function () {
        var menu = this.find('.js-menu');
        menu.classList.toggle('collapsed');
    }
});


// Используем
document.addEventListener("DOMContentLoaded", function(event) {
    var menu = document.querySelector("#menu");
    let dd = new Dropdown(menu);


    // Тесты
    console.log('dd is Class:', dd instanceof Class);
    console.log('dd is Widget:', dd instanceof Widget);
    console.log('dd is Dropdown:', dd instanceof Dropdown);
});



