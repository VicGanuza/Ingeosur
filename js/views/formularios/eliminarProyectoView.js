define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/formularios/proyectoEliminar.html',

], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, eliminarProyectoTemplate){

    var EliminarProyectoView = Backbone.View.extend({
        el: $("#proyectos_list_remove"),
        that: this,

        render: function(idPer,tipo){
            message = $("<div class='before'>Esta seguro que quiere eliminar el registro?</div><input type='button' class='btn btn-primary eliminar_proyecto' value='Si'><input type='button' class='btn btn-primary cancelar_proyecto' value='No'>");
            $(".modal").show();
            $(".modal .mensaje").html(message);   

            $(".eliminar_proyecto").click(function(){
                $(".modal").hide();

                parametros = {
                    id: idPer
                }

                $.ajax({
                    data: parametros, 
                    url:   'php/eliminar_proyecto.php',
                    type:  'post',
                    success:  function (response) {
                        parametros = {
                            year: 0
                        }

                        var total=[];

                        $.ajax({
                            data: parametros, 
                            url:   'php/proyectos.php',
                            type:  'post',
                            success:  function (response2) {

                                var dataJson = eval(response2);

                                for(var i in dataJson){
                                    var dato = new PersonalModel({
                                        id: dataJson[i].id,
                                        titulo: dataJson[i].titulo,
                                        participantes: dataJson[i].participantes,
                                        tipo: dataJson[i].tipo,
                                        desde: dataJson[i].desde,
                                        hasta: dataJson[i].hasta,
                                        especialidad: dataJson[i].especialidad
                                    });


                                    total.push(dato);
                                }
                                var data = {
                                        proyecto: total,
                                        _: _ 
                                    };

                                var compiledTemplate = _.template(eliminarProyectoTemplate, data);
                                $("#proyectos_list_remove").html(compiledTemplate);
                            }
                        }); 
                    }
                }); 
            });
            
            var footerView = new FooterView();
                footerView.render();

            $(".cancelar_proyecto").click(function(id){
                $(".modal").hide();
            });
        }

    });

    return EliminarProyectoView;
});