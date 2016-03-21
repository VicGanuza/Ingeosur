define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/formularios/articuloEliminar.html',

], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, eliminarArticuloTemplate){

    var EliminarArticuloView = Backbone.View.extend({
        el: $("#articulo_list_remove"),
        that: this,

        render: function(idPer,tipo){
            message = $("<div class='before'>Esta seguro que quiere eliminar el registro?</div><input type='button' class='btn btn-primary eliminar_articulo' value='Si'><input type='button' class='btn btn-primary cancelar_articulo' value='No'>");
            $(".modal").show();
            $(".modal .mensaje").html(message);   

            $(".eliminar_articulo").click(function(){
                $(".modal").hide();

                parametros = {
                    id: idPer
                }

                $.ajax({
                    data: parametros, 
                    url:   'php/eliminar_articulo.php',
                    type:  'post',
                    success:  function (response) {
                        parametros = {
                            id: tipo
                        }

                        var total=[];

                        $.ajax({
                            data: parametros, 
                            url:   'php/articulo_bytype.php',
                            type:  'post',
                            success:  function (response2) {

                                var dataJson = eval(response2);

                                for(var i in dataJson){
                                    var dato = new PersonalModel({
                                        id: dataJson[i].id,
                                        autores: dataJson[i].autores,
                                        titulo: dataJson[i].titulo,
                                        lugar: dataJson[i].lugar,
                                        anio: dataJson[i].anio,
                                        tipo: tipo
                                    });


                                    total.push(dato);
                                }
                                var data = {
                                        articulo: total,
                                        _: _ 
                                    };

                                var compiledTemplate = _.template(eliminarArticuloTemplate, data);
                                $("#articulo_list_remove").html(compiledTemplate);
                            }
                        }); 
                    }
                }); 
            });
            
            var footerView = new FooterView();
                footerView.render();

            $(".cancelar_articulo").click(function(id){
                $(".modal").hide();
            });
        }

    });

    return EliminarArticuloView;
});