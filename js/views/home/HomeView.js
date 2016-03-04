define([
    'jquery',
    'underscore',
    'backbone',
    'models/personal/PersonalModel',
    'views/footer/FooterView',
    'text!templates/homeTemplate.html',
], function($, _, Backbone, PersonalModel, FooterView, homeTemplate){

    var HomeView = Backbone.View.extend({
        el: $("#page"),

        render: function(){

            var total=[];
            var imgs=[];
            var temp = this.$el;

            $.ajax({
                url: 'php/inicio.php',
                success: function(response) {
                    var dataJson = eval(response);

                    for (var i in dataJson) {
                        quienes = dataJson[i].quienes;
                    }

                    $.ajax({
                        url: 'php/imagen_ini.php',
                        success: function(imagenes) {
                            var dataJson = eval(imagenes);

                            for (var i in dataJson) {
                                var dato = new PersonalModel({
                                    nombre: dataJson[i].nombre,
                                    url: dataJson[i].url
                                });
                                imgs.push(dato);
                            }

                            $.ajax({
                                url:   'php/noticias.php',
                                success:  function (response) {

                                    var dataJson = eval(response);

                                    for(var i in dataJson){
                                        cuerpo = dataJson[i].cuerpo;
                                        maxLength = 300;
                                        ret = cuerpo;

                                        if (ret.length > maxLength) {
                                            ret = ret.substr(0,maxLength-3) + "...";
                                        }

                                        var dato = new PersonalModel({
                                            id: dataJson[i].id,
                                            titulo: dataJson[i].titulo,
                                            cuerpo: cuerpo,
                                            desc: ret,
                                            fecha: dataJson[i].fecha,
                                            imagen: dataJson[i].imagen
                                        });

                                        total.push(dato);
                                    }

                                    var data = {
                                        quienes: quienes,
                                        imagenes: imgs, 
                                        noticias: total,
                                        _: _ 
                                    };

                                    var compiledTemplate = _.template(homeTemplate, data);
                                    temp.html(compiledTemplate);
                                }
                            });
                        }
                    });
                }
            });

            var footerView = new FooterView();
            footerView.render();
        }
    });

    return HomeView;
});