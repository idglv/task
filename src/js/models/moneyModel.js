var libs = require('../libs.js');
var Backbone = libs.Backbone;

var rubls = ['рубль', 'рубля', 'рублей']
var suffix = require('../utils/suffixCheck.js')(rubls);

module.exports = Backbone.Model.extend({
  defaults: {
    pay: 0,
    suffix: rubls[2],
    valid: false
  },
  initialize: function() {
    this.on('change:pay', this.handlePayChange, this);
  },
  handlePayChange: function(e) {
    this.set('suffix', suffix(this.get('pay')));
  }
 });