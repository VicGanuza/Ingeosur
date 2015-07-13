define([
    'jquery',
    'underscore',
    'backbone',
    'models/personal/PersonalModel',
    'text!templates/articulosTemplate.html'
    ], function($, _, Backbone, PersonalModel, articulosTemplate){

        var ArticView = Backbone.View.extend({
            el: $("#page"),

            render: function(year,id){

                var total=[];
                var anios=[];
                var articulos = this.collection.models;
                var temp = this.$el;

                parametros1 = {
                    id: id
                }

                parametros2 = {
                    year: year
                }

                $.ajax({
                    data: parametros1, 
                    url:   'php/lateral-menu.php',
                    type:  'post',
                    success:  function (response) {

                        var dataJson = eval(response);

                        for(var i in dataJson){
                            var dato = new PersonalModel({
                                anio: dataJson[i].anio
                            });

                            anios.push(dato);
                        }

                        var tipo = [];

                        $.ajax({
                            data: parametros2, 
                            url: 'php/tiposArticulos.php',
                            type:  'post',
                            success: function (response) {
                                var dataJson = eval(response);

                                for(var i in dataJson){
                                    var dato = new PersonalModel({
                                        tipo: dataJson[i].tipo
                                    });

                                    tipo.push(dato);
                                }

                                var data = {
                                    title: 'Articulos',
                                    year: year,
                                    anios: anios,
                                    tipo: tipo,
                                    articulos: articulos,
                                    _: _ 
                                };

                                var compiledTemplate = _.template(articulosTemplate, data);
                                temp.html(compiledTemplate);
                            }
                        });
                    }
                }); 
                
            }
        });

    return ArticView;

});
