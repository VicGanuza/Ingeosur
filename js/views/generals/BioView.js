define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/personalBioTemplate.html'
], function($, _, Backbone, bioTemplate){

    var BioView = Backbone.View.extend({
        el: $("#page"),

        render: function(){

            var data = {
                    biografia: this.collection.models,
                    _: _ 
                };

            var compiledTemplate = _.template(bioTemplate, data);
            this.$el.html(compiledTemplate);
        }
    });

    return BioView;
  
});
