var libs = require('../libs.js');
var Backbone = libs.Backbone;
var $ = libs.$;
var _ = libs._;
var textTemplate = require('raw!../templates/moneyTextTemplate.html')
module.exports = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(textTemplate);

    //TODO
    this.render(this.model);
    this.listenTo(this.model, 'change:pay', this.render);
  },
  render: function(model) {
    this.$el.html(this.template({
      label_suffix: model.get('suffix')
    }));
  }
});