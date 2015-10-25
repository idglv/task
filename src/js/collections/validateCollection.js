var libs = require('../libs.js');
var Backbone = libs.Backbone;
var _ = libs._;

module.exports = Backbone.Collection.extend({
  initialize: function() {
    this.on('change:valid', this.handleValidChange, this);
  },
  handleValidChange: function() {
    function check(models) {
      return _.every(models, function(model) {
        return model.get('valid');
      });
    }

    //Если все модели валидны разблокируем кнопку
    this.trigger('form-is-valid', {valid: check(this.models)})
  }
});