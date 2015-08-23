define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'views/generals/ProyView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection'

], function($, _, Backbone, FooterView, ProyView, PersonalModel, PersonalCollection){

    var ProyectosView = Backbone.View.extend({

        render: function(year,id){

            parametros = {
                year: year
            }

            var total=[];

            $.ajax({
                data: parametros, 
                url:   'php/proyectos.php',
                type:  'post',
                success:  function (response) {

                    var dataJson = eval(response);

                    for(var i in dataJson){
                        var dato = new PersonalModel({
                            titulo: dataJson[i].titulo,
                            participantes: dataJson[i].participantes,
                            desde: dataJson[i].desde,
                            hasta: dataJson[i].hasta,
                            tipo: dataJson[i].tipo,
                            especialidad: dataJson[i].especialidad
                        });

                        total.push(dato);
                    }

                    var collection = new PersonalCollection(total);
                    var proyectos_view = new ProyView({collection: collection});
                    proyectos_view.render(year,id);
                }
            }); 

            var footerView = new FooterView();
            footerView.render();
        }
    });

    return ProyectosView;
});