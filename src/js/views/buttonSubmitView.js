var libs = require('../libs.js');
var Backbone = libs.Backbone;
var $ = libs.$;
var _ = libs._;
var buttonTemplate = require('raw!../templates/submitButtonTemplate.html');
//var buttonTemplate = '<button type="submit" <%= valid ? \'\' : \'disabled\' %> class="button-submit">Продолжить</button>'

module.exports = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(buttonTemplate);
    this.render({
      valid: false
    });
    this.listenTo(this.collection, 'form-is-valid', this.handleValidChange);
  },
  handleValidChange: function(data) {
    this.render(data);
  },
  render: function(data) {
    this.$el.html(this.template(data));
  }
});