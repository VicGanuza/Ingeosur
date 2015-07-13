define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/formulariosTemplate.html'
], function($, _, Backbone, formTemplate){

    var InsertarView = Backbone.View.extend({
        el: $("#page"),

        render: function(){
            var compiledTemplate = _.template(formTemplate);
            this.$el.html(compiledTemplate);
        }
    });
    return InsertarView;
});
