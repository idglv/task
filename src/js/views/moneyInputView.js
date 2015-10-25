var libs = require('../libs.js');
var Backbone = libs.Backbone;
var $ = libs.$;
var _ = libs._;
var isNumber = require('../utils/isNumber.js');

module.exports = Backbone.View.extend({
  initialize: function() {
    this.$input = this.$('.money-input');
    this.min = this.$input.attr('data-min');
    this.max = this.$input.attr('data-max');

    this.listenTo(this.model, 'change:pay', this.shouldRender);
  },
  validate: function(pay) {
    this.model.set('valid', pay >= this.min && pay <= this.max);
  },
  shouldRender: function() {
    if (this.model.get('pay') !== this.$input.val()) {
      this.render();
    }
  },
  render: function() {
    this.$input.val(this.model.get('pay'));
  },
  events: {
    'keypress .money-input': 'handleInputPress',
    'keyup .money-input': 'handleInputKeyUp'
  },
  handleInputKeyUp: function(e) {
    this.validate(this.$input.val());
  },
  handleInputPress: function(e) {
    if (isNumber(e.which)) {
      setTimeout(function() {
        this.model.set('pay', this.$input.val());
      }.bind(this));
    } else {
      e.preventDefault();
    }
  }
});