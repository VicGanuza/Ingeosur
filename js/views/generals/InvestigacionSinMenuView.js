define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'views/generals/InvesView',
    'views/lateral/LateralView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',

], function($, _, Backbone, FooterView, InvesView, LateralView, PersonalModel, PersonalCollection){

    var InvestigacionView = Backbone.View.extend({
        render: function(id){
            
            parametros = {
                id: id
            }

            var total=[];

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

                        total.push(dato);
                    }

                    var collection = new PersonalCollection(total);
                    var investigacion_view = new InvesView({collection: collection});
                    investigacion_view.render(id);
                }
            }); 

           /* var lateral_view = new LateralView({collection: collection});
            lateral_view.render(id);
*/
            var footerView = new FooterView();
            footerView.render();
        }
    });

    return InvestigacionView;
});