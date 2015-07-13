define([
    'jquery',
    'underscore',
    'backbone',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/palinologiaTemplate.html'

    ], function($, _, Backbone, PersonalModel, PersonalCollection, paliTemplate){

        var PaliView = Backbone.View.extend({
            el: $("#page"),

            render: function(id){

                var title="Laboratorio de Palinología";

                 parametros = {
                    id: id
                }

                var fotos = [];
                var pali = this.collection.models;
                var temp = this.$el;

                $.ajax({
                    data: parametros, 
                    url:   'php/fotos_lab.php',
                    type:  'post',
                    success:  function (response) {
                        
                        var dataJson = eval(response);

                        for(var i in dataJson){
                            var dato = new PersonalModel({
                                nombre: dataJson[i].nombre,
                                url: dataJson[i].url
                            });

                            fotos.push(dato);
                        }

                        var data = {
                            fotos: fotos,
                            pali: pali,
                            title: title,
                            _: _ 
                        };

                        var compiledTemplate = _.template(paliTemplate, data);
                        temp.html(compiledTemplate);
                    }
                });
            }
        });

    return PaliView;

});
