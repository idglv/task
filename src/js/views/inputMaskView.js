var libs = require('../libs.js');
var Backbone = libs.Backbone;
var $ = libs.$;
var _ = libs._;

var isNumber = require('../utils/isNumber.js');
var createMask = require('../utils/mask.js');

module.exports = Backbone.View.extend({
  initialize: function() {
    this.$input = this.$('input');
    this.BACKSPACE = 8;
    this.DELETE = 46;

    var mask = this.$input.attr('data-mask');
    this.applyMask = createMask(mask);
    this.allowLength = mask.length;
    this.pattern = new RegExp(this.$input.attr('pattern'));

    this.tabindex = +this.$input.attr('tabindex');
    this.$next = $('[tabindex="' + (this.tabindex + 1) +'"]');
    this.$prev = $('[tabindex="' + (this.tabindex - 1) +'"]');

    this.listenTo(this.model, 'change:value', this.render);
  },
  events: {
    'keydown input': 'handleInputKeyDown',
    'keypress input': 'handleInputPress',
    'paste input': 'handleInputPaste',
    'custompaste input': 'handleInputCustomPaste'
  },
  validate: function(value) {
    this.model.set('valid', this.pattern.test(value));
  },
  handleInputCustomPaste: function(e, value) {
    //Собираем строку следуя маске
    var result = _.foldl(value.slice(0, this.allowLength).split(''), function(value, symbol) {
      return this.applyMask(value, symbol);
    }.bind(this), '');

    this.model.set('value', result);
    if (!this.$prev.length) {
      this.$next.trigger('custompaste', value.slice(this.allowLength, value.length));
      this.$next.focus();
    }
    this.render();
  },
  handleInputPress: function(e) {
    var value = this.$input.val();
    var symbol = String.fromCharCode(e.which);
    //Пропускаем только числа
    if (value.length < this.allowLength && isNumber(e.which)) {
      //Добавляем символы вручную
      this.model.set('value', this.applyMask(value, symbol));
    };
    e.preventDefault();
  },
  handleInputKeyDown: function(e) {
    var value = this.$input.val();
    //Перехватываем удаление символов
    if (this.BACKSPACE === e.which || this.DELETE === e.which) {
      this.model.set('value', this.applyMask(value));
      e.preventDefault();
    }

    //Переходы по курсору
    //Проверяем позицию курсора
    setTimeout(function() {
      if (this.$input[0].selectionStart === 0) {
        this.$prev.focus();
      }
      if (this.$input[0].selectionStart === this.allowLength) {
        this.$next.focus();
      }
    }.bind(this));
  },
  handleInputPaste: function(e) {
    var exceptNumber = /\D/g;
    //После того как оставили только числа +7 -> 7
    var phone = /^(7|8)?(\d{10})/;
    this.$input.val('');
    setTimeout(function() {
      //Оставляем только цифры
      var value = this.$input.val().replace(exceptNumber, '');
      var result;
      if (value.length && phone.test(value)) {
        //Количество символов в номере
        value = value.replace(phone, '$2');
        //Если есть предыдущий инпут делаем вставку в него
        if (this.$prev.length) {
          this.$prev.trigger('custompaste', value);
        } else {
          this.$input.trigger('custompaste', value);
        }
      } else {
        //Если цифр в буфере нет востанавливаем значение инпута
        this.render();
      }
    }.bind(this));
  },
  render: function() {
    var value = this.model.get('value');
    this.validate(value);
    this.$input.val(value);
  }
});