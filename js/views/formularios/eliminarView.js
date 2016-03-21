define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/formularios/formulariosTemplate.html',
    'text!templates/formularios/personalEliminar.html',
    'text!templates/formularios/articuloEliminar.html',
    'text!templates/formularios/proyectoEliminar.html',
    'text!templates/formularios/noticiaEliminar.html',
    'text!templates/formularios/imagenesEliminar.html'

], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, formTemplate, personalEliminarTemplate
    , articulosEliminarTemplate,proyectosEliminarTemplate, noticiaEliminarTemplate, imagenesEliminarTemplate
    ){

    var EliminarView = Backbone.View.extend({
        el: $("#page"),
        personal: $("#personal_list"),
        that: this,
        events : {
            "change #opcionesEliminar": "cambiar_form",
            "change #tipo_personal_remove": "mostrarListaPersonal",
            "change #tipo_articulo_remove": "mostrarListaArticulo",
            "change #tipo_imagen_remove": "mostrarListaImagenes"
            //"change #archivo_img_edit": "cambiar_nombreImg",
            //"change #archivo_pdf_edit": "cambiar_nombrePdf",
            //"click .subir_personal_editado": "subirPersonal",
            //"click .subir_articulo_editado": "subirArticulo",
            //"click .subir_proyecto_editado": "subirProyecto",
            //"click .subir_noticia_editada": "subirNoticia",
            //"change #archivo_noticia_edit": "cambiar_nombreImg_noti"
        },

        render: function(){
            
            var compiledTemplate = _.template(formTemplate);
            this.$el.html(compiledTemplate);

           /* var footerView = new FooterView();
            footerView.render();*/

            $("#insertTab").css("display","none");
            $("#insertTab").removeClass("active");
            $("#insertar").removeClass("active");
            $('#editTab').css('display' , 'none');
            $("#editTab").removeClass("active");
            $("#editar").removeClass("active");
            $('#eliminarTab').css('display' , 'block');
            $("#eliminarTab").addClass("active");
            $("#eliminar").addClass("active");
        },

        cambiar_form: function(){
            var valor = $('select[name=opcionesEliminar]');
            $(".inner-form").css("display","none");

            if (valor.val() == 1) {
                $("#remove-personal").css("display","block");
            }
            if (valor.val() == 2) {
                $("#remove-articulo").css("display","block");
            }
            if (valor.val() == 3) {
                var temp = this.$("#proyectos_list_remove");

                parametros = {
                    year: 0
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
                                proyectos: total,
                                _: _ 
                            };

                        var compiledTemplate = _.template(proyectosEliminarTemplate, data);
                        temp.html(compiledTemplate);
                        $("#remove-proyectos").css("display","block");
                    }
                }); 
            }
            if (valor.val() == 4) {
                var temp = this.$("#noticias_list_remove");
                var total = [];

                $.ajax({
                    url:   'php/noticias.php',
                    success:  function (response) {

                        var dataJson = eval(response);

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
                            noticias: total, 
                            _: _ 
                        };

                        var compiledTemplate = _.template(noticiaEliminarTemplate, data);
                        temp.html(compiledTemplate);
                        $("#remove-noticias").css("display","block");
                    }
                });
                    
            }
            if (valor.val() == 5) {
                $("#remove-imagenes").css("display","block");
            }
        }, 

        mostrarListaPersonal: function(){
            var temp = this.$("#personal_list_remove");
            var tipo=$('select[name=tipo_personal_remove]').val();

            parametros = {
                id: tipo
            }

            var total=[];

            $.ajax({
                data: parametros, 
                url:   'php/personal.php',
                type:  'post',
                success:  function (response) {

                    var dataJson = eval(response);

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

                    var compiledTemplate = _.template(personalEliminarTemplate, data);
                    temp.html(compiledTemplate);
                }
            }); 
        },
        
        cambiar_nombreImg: function(){
            $('#uploadImg_edit').val($("#archivo_img_edit")[0].files[0].name);
        },

        cambiar_nombreImg_noti: function(){
            $('#uploadImg_noticia_edit').val($("#archivo_noticia_edit")[0].files[0].name);
        },

        cambiar_nombrePdf: function(){
            $('#uploadPdf_edit').val($("#archivo_pdf_edit")[0].files[0].name);
        },

        showMessageImg: function(message){
            $(".messageImg").html("").show();
            $(".messageImg").html(message);
        },

        showMessagePdf: function(message){
            $(".messagePdf").html("").show();
            $(".messagePdf").html(message);
        },

        isImage: function(extension) {
            switch(extension.toLowerCase()) 
            {
                case 'jpg': case 'gif': case 'png': case 'jpeg':
                    return true;
                break;
                default:
                    return false;
                break;
            }
        },

        isPdf: function(extension) {
            switch(extension.toLowerCase()) 
            {
                case 'pdf': 
                    return true;
                break;
                default:
                    return false;
                break;
            }
        },

        mostrarListaArticulo: function(){
            var temp = this.$("#articulo_list_remove");
            var tipo=$('select[name=tipo_articulo_remove]').val();

            parametros = {
                id: tipo
            }

            var total=[];

            $.ajax({
                data: parametros, 
                url:   'php/articulo_bytype.php',
                type:  'post',
                success:  function (response) {

                    var dataJson = eval(response);

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

                    var compiledTemplate = _.template(articulosEliminarTemplate, data);
                    temp.html(compiledTemplate);
                }
            }); 
        },

        mostrarListaImagenes: function(){
            var temp = this.$("#imagenes_list_remove");
            var tipo=$('select[name=tipo_imagen_remove]').val();
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

                        var compiledTemplate = _.template(imagenesEliminarTemplate, data);
                        temp.html(compiledTemplate);
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

                        var compiledTemplate = _.template(imagenesEliminarTemplate, data);
                        $("#imagenes_list_remove").html(compiledTemplate);
                    }
                });
            }
        }
    });

    return EliminarView;
});