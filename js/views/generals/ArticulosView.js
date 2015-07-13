define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'views/generals/ArticView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection'

], function($, _, Backbone, FooterView, ArticView, PersonalModel, PersonalCollection){

    var ArtiulosView = Backbone.View.extend({

        render: function(year,id){

            parametros = {
                year: year
            }

            var total=[];

            $.ajax({
                data: parametros, 
                url:   'php/articulos.php',
                type:  'post',
                success:  function (response) {

                    var dataJson = eval(response);

                    for(var i in dataJson){
                        var dato = new PersonalModel({
                            autores: dataJson[i].autores,
                            titulo: dataJson[i].titulo,
                            lugar: dataJson[i].lugar,
                            anio: dataJson[i].anio,
                            tipo: dataJson[i].tipo
                        });

                        total.push(dato);
                    }

                    var collection = new PersonalCollection(total);
                    var articulos_view = new ArticView({collection: collection});
                    articulos_view.render(year,id);
                }
            }); 

            var footerView = new FooterView();
            footerView.render();
        }
    });

    return ArtiulosView;
});