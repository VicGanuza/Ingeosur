define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/formularios/personalEliminar.html',

], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, eliminarPersonalTemplate){

    var EliminarPersonalView = Backbone.View.extend({
        el: $("#personal_list_remove"),
        that: this,

        render: function(idPer,tipo){
            message = $("<div class='before'>Esta seguro que quiere eliminar el registro?</div><input type='button' class='btn btn-primary eliminar_personal' value='Si'><input type='button' class='btn btn-primary cancelar_personal' value='No'>");
            $(".modal").show();
            $(".modal .mensaje").html(message);   

            $(".eliminar_personal").click(function(){
                $(".modal").hide();

                parametros = {
                    id: idPer
                }

                $.ajax({
                    data: parametros, 
                    url:   'php/eliminar_personal.php',
                    type:  'post',
                    success:  function (response) {
                        parametros = {
                            id: tipo
                        }

                        var total=[];

                        $.ajax({
                            data: parametros, 
                            url:   'php/personal.php',
                            type:  'post',
                            success:  function (response2) {

                                var dataJson = eval(response2);

                                for(var i in dataJson){
                                    var dato = new PersonalModel({
                                        id: dataJson[i].Id,
                                        nombre: dataJson[i].Nombre,
                                        titulo: dataJson[i].Titulo,
                                        cargo: dataJson[i].Cargo,
                                        adicional: dataJson[i].Adicional,
                                        imagen: dataJson[i].Imagen,
                                        tipo: tipo
                                    });

                                    total.push(dato);
                                }
                                var data = {
                                        personal: total,
                                        _: _ 
                                    };

                                var compiledTemplate = _.template(eliminarPersonalTemplate, data);
                                $("#personal_list_remove").html(compiledTemplate);
                            }
                        }); 

                        var footerView = new FooterView();
                        footerView.render();
                    }
                }); 
            });
    
            $(".cancelar_personal").click(function(id){
                $(".modal").hide();
            });
        }

    });

    return EliminarPersonalView;
});