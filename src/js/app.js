var style = require('../style/index.styl');
var libs = require('./libs');
var Backbone = libs.Backbone;
var $ = libs.$;
var _ = libs._;
var MoneyModel = require('./models/moneyModel.js');
var PhoneModel = require('./models/inputModel.js');

var ValidateCollection = require('./collections/validateCollection.js');
var MoneyTextView = require('./views/moneyTextView.js');
var MoneyInputView = require('./views/moneyInputView.js');
var ButtonSubmitView = require('./views/buttonSubmitView.js');
var InputMaskView = require('./views/InputMaskView.js');

var moneyModel = new MoneyModel();
var phoneCodeModel = new PhoneModel();
var phoneNumberModel = new PhoneModel();
var validateCollection = new ValidateCollection([moneyModel, phoneCodeModel, phoneNumberModel]);


//Телефон
var phoneCode = new InputMaskView({
  el: $('.phone__item[data-rel="phone__code"]'),
  model: phoneCodeModel
})
var phoneNumber = new InputMaskView({
  el: $('.phone__item[data-rel="phone__number"]'),
  model: phoneNumberModel
})

//Блок сумма
var moneyInputView = new MoneyInputView({
  el: $('.phone__item[data-rel="money-input"]'),
  model: moneyModel
});
var moneyTextView = new MoneyTextView({
  el: $('.phone__item[data-rel="money-text"]'),
  model: moneyModel
});

//Кнопка "Продолжить"
var buttonSubminView = new ButtonSubmitView({
  el: $('.button-submit-container'),
  collection: validateCollection
});
