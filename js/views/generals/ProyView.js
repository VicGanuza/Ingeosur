define([
    'jquery',
    'underscore',
    'backbone',
    'models/personal/PersonalModel',
    'text!templates/proyectosTemplate.html'
    ], function($, _, Backbone, PersonalModel, proyectosTemplate){

        var ProyView = Backbone.View.extend({
            el: $("#page"),

            render: function(year,id){

                var total=[];
                var anios=[];
                var proyectos = this.collection.models;
                var temp = this.$el;

                parametros = {
                    id: id
                }

                $.ajax({
                    data: parametros, 
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


                        var data1 = {
                                title: 'Proyectos',
                                year: year,
                                anios: anios,
                                proyectos: proyectos,
                                _: _ 
                            };

                        var compiledTemplate = _.template(proyectosTemplate, data1);
                        temp.html(compiledTemplate);

                    }
                }); 
            }
        });

    return ProyView;

});