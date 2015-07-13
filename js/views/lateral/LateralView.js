define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/lateralTemplate.html'
    ], function($, _, Backbone, lateralTemplate){

        var LateralView = Backbone.View.extend({
        el: $("#page #lateral"),
        render: function(id){

            var data = {
                    tipo: id,
                    anio: this.collection.models,
                    _: _ 
                };

            var compiledTemplate = _.template(lateralTemplate, data);
            this.$el.html(compiledTemplate);

            }
        });

    return LateralView;
});