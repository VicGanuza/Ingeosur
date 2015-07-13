define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/petrotomiaTemplate.html'

    ], function($, _, Backbone, petroTemplate){

        var PetroView = Backbone.View.extend({
            el: $("#page"),

            render: function(id){

                var title="Laboratorio de Petrotomía INGEOSUR - Depto de Geología";

                var data = {
                    fotos: this.collection.models,
                    title: title,
                    _: _ 
                };

                var compiledTemplate = _.template(petroTemplate, data);
                this.$el.html(compiledTemplate);
            }
        });

    return PetroView;

});
