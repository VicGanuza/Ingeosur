define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'views/generals/PaliView',
    'views/generals/PetroView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',

], function($, _, Backbone, FooterView, PaliView, PetroView, PersonalModel, PersonalCollection){

    var LaboratoriosView = Backbone.View.extend({
        render: function(id){
            
            parametros = {
                id: id
            }

            if (id=='palinologia') {
                $.ajax({
                    data: parametros, 
                    url:   'php/laboratorios.php',
                    type:  'post',
                    success:  function (response) {

                        var dataJson = eval(response);

                        for(var i in dataJson){
                            var dato = new PersonalModel({
                                texto: dataJson[i].texto,
                                texto_obj: dataJson[i].texto_obj,
                                obj: dataJson[i].obj
                            });
                        }
                    
                        var collection = new PersonalCollection(dato);
                        var palinologia_view = new PaliView({collection: collection});
                        palinologia_view.render(id);
                    }
                }); 
            }
            else {
                var fotos = [];

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
                    
                        var collection = new PersonalCollection(dato);
                        var petrotomia_view = new PetroView({collection: collection});
                        petrotomia_view.render(id);
                    }
                }); 
            }

            
            var footerView = new FooterView();
            footerView.render();
        }
    });

    return LaboratoriosView;
});