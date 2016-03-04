define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'views/generals/BioView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection'

], function($, _, Backbone, FooterView, BioView, PersonalModel, PersonalCollection){

    var BiografiaView = Backbone.View.extend({
        el: $("#page"),
        render: function(id){

            parametros = {
                id: id
            }

            var total=[];

            $.ajax({
                data: parametros, 
                url:   'php/biografia.php',
                type:  'post',
                success:  function (response) {

                    var dataJson = eval(response);

                    for(var i in dataJson){
                        var dato = new PersonalModel({
                            nombre: dataJson[i].Nombre,
                            apellido: dataJson[i].Apellido,
                            titulo: dataJson[i].Titulo,
                            cargo: dataJson[i].Cargo,
                            adicional: dataJson[i].Adicional,
                            especialidad: dataJson[i].Especialidad,
                            specialty: dataJson[i].Specialty,
                            cv: dataJson[i].Cv,
                            imagen: dataJson[i].Imagen,
                            email: dataJson[i].Email
                        });

                        total.push(dato);
                    }

                    var collection = new PersonalCollection(total);
                    var personal_bio = new BioView({collection: collection});
                    personal_bio.render();
                }
            }); 

            var footerView = new FooterView();
            footerView.render();
        }
    });

    return BiografiaView;
});