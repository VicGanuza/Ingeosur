define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/formularios/noticiaEliminar.html',

], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, eliminarArticuloTemplate){

    var EliminarArticuloView = Backbone.View.extend({
        el: $("#noticias_list_remove"),
        that: this,

        render: function(idPer,tipo){
            message = $("<div class='before'>Esta seguro que quiere eliminar el registro?</div><input type='button' class='btn btn-primary eliminar_noticia' value='Si'><input type='button' class='btn btn-primary cancelar_noticia' value='No'>");
            $(".modal").show();
            $(".modal .mensaje").html(message);   

            $(".eliminar_noticia").click(function(){
                $(".modal").hide();

                parametros = {
                    id: idPer
                }

                $.ajax({
                    data: parametros, 
                    url:   'php/eliminar_noticia.php',
                    type:  'post',
                    success:  function (response) {
                        parametros = {
                            id: tipo
                        }

                        var total=[];

                        $.ajax({
                            url:   'php/noticias.php',
                            success:  function (response2) {

                                var dataJson = eval(response2);

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
                                        desc: ret,
                                        fecha: dataJson[i].fecha,
                                        imagen: dataJson[i].imagen
                                    });

                                    total.push(dato);
                                }
                                var data = {
                                        noticia: total,
                                        _: _ 
                                    };

                                var compiledTemplate = _.template(eliminarArticuloTemplate, data);
                                $("#noticias_list_remove").html(compiledTemplate);
                            }
                        }); 
                    }
                }); 
            });
            
            var footerView = new FooterView();
                footerView.render();

            $(".cancelar_noticia").click(function(id){
                $(".modal").hide();
            });
        }

    });

    return EliminarArticuloView;
});