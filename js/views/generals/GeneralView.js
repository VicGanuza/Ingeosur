define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'views/generals/ListView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/historiaTemplate.html',
    'text!templates/objetivosTemplate.html',
    'text!templates/autoridadesTemplate.html',
    'text!templates/estructuraTemplate.html',
    'text!templates/extensionTemplate.html',
    'text!templates/serviciosTemplate.html'
], function($, _, Backbone, FooterView, ListView, PersonalModel, PersonalCollection, 
    historiaTemplate, objetivosTemplate, autoridadesTemplate, estructuraTemplate,
    extensionTemplate, serviciosTemplate){

    var GeneralView = Backbone.View.extend({
        el: $("#page"),
        render: function(id){

        if (id=='historia') {
            this.$el.html(historiaTemplate);
        }
        else {
            if (id=='objetivos') {
                this.$el.html(objetivosTemplate);
            }
            else {
                if (id=='autoridades') {
                    this.$el.html(autoridadesTemplate);
                }
                else{
                    if (id=='estructura') {
                        this.$el.html(estructuraTemplate);
                    }
                    else {
                        if (id=='extension') {
                            this.$el.html(extensionTemplate);
                        }
                        else{
                            if (id=='servicios'){
                                this.$el.html(serviciosTemplate);
                            }
                            else {
                                parametros = {
                                    id: id
                                }

                                var total=[];

                                $.ajax({
                                    data: parametros, 
                                    url:   'php/personal.php',
                                    type:  'post',
                                    success:  function (response) {

                                        var dataJson = eval(response);

                                        for(var i in dataJson){
                                            var dato = new PersonalModel({
                                                id: dataJson[i].Id,
                                                nombre: dataJson[i].Nombre,
                                                titulo: dataJson[i].Titulo,
                                                cargo: dataJson[i].Cargo,
                                                adicional: dataJson[i].Adicional,
                                                imagen: dataJson[i].Imagen
                                            });

                                            total.push(dato);
                                        }

                                        var collection = new PersonalCollection(total);
                                        var personal_list = new ListView({collection: collection});
                                        personal_list.render(id);
                                    }
                                }); 
                            }
                        }
                    }
                }
            }
        }

        var footerView = new FooterView();
        footerView.render();

        }
    });

    return GeneralView;
});