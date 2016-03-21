define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/formularios/imagenesEliminar.html',

], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, eliminarImagenesTemplate){

    var EliminarImagenesView = Backbone.View.extend({
        el: $("#imagenes_list_remove"),
        that: this,

        render: function(idPer,tipo){
            message = $("<div class='before'>Esta seguro que quiere eliminar el registro?</div><input type='button' class='btn btn-primary eliminar_imagen' value='Si'><input type='button' class='btn btn-primary cancelar_imagen' value='No'>");
            $(".modal").show();
            $(".modal .mensaje").html(message);   

            $(".eliminar_imagen").click(function(){
                $(".modal").hide();

                parametros = {
                    id: idPer,
                    tipo: tipo
                }

                $.ajax({
                    data: parametros, 
                    url:   'php/eliminar_imagen.php',
                    type:  'post',
                    success:  function (response) {
                        var imgs=[];

                        if (tipo == "1") {
                            $.ajax({
                                url: 'php/imagen_ini.php',
                                success: function(imagenes) {
                                    var dataJson = eval(imagenes);

                                    for (var i in dataJson) {
                                        var dato = new PersonalModel({
                                            id: dataJson[i].id,
                                            nombre: dataJson[i].nombre,
                                            url: dataJson[i].url,
                                            tipo: tipo
                                        });
                                        imgs.push(dato);
                                    }
                                    var data = {
                                            imagenes: imgs, 
                                            _: _ 
                                        };

                                    var compiledTemplate = _.template(eliminarImagenesTemplate, data);
                                    $("#imagenes_list_remove").html(compiledTemplate);
                                }
                            });
                        } 
                        else {
                            if (tipo=="2"){
                                parametros = {
                                    id: 'palinologia'
                                }
                            }
                            else {
                                parametros = {
                                    id: 'petrotomia'
                                }
                            }

                            $.ajax({
                                data: parametros,
                                url: 'php/fotos_lab.php',
                                type:  'post',
                                success: function(imagenes) {
                                    var dataJson = eval(imagenes);

                                    for (var i in dataJson) {
                                        var dato = new PersonalModel({
                                            id: dataJson[i].id,
                                            nombre: dataJson[i].nombre,
                                            url: dataJson[i].url,
                                            tipo: tipo
                                        });
                                        imgs.push(dato);
                                    }
                                    var data = {
                                            imagenes: imgs, 
                                            _: _ 
                                        };

                                    var compiledTemplate = _.template(eliminarImagenesTemplate, data);
                                    $("#imagenes_list_remove").html(compiledTemplate);
                                }
                            });
                        }
                    }
                }); 
            });
                        
            var footerView = new FooterView();
                footerView.render();

            $(".cancelar_imagen").click(function(id){
                $(".modal").hide();
            });
        }

    });

    return EliminarImagenesView;
});