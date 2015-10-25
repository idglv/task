var libs = require('../libs.js');
var Backbone = libs.Backbone;

module.exports = Backbone.Model.extend({
  defaults: {
    value: '',
    valid: false
  }
});