define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/formularios/formulariosTemplate.html',
    'text!templates/formularios/personalEdit.html',
    'text!templates/formularios/articulosEdit.html',

], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, formTemplate, personalEditTemplate,
            articulosEdit){

    var EditarView = Backbone.View.extend({
        el: $("#page"),
        personal: $("#personal_list"),
        that: this,
        events : {
            "change #opcionesEditar": "cambiar_form",
            "change #tipo_personal_edit": "mostrarListaPersonal",
            "change #tipo_articulo_edit": "mostrarListaArticulo",
            "change #archivo_img_edit": "cambiar_nombreImg",
            "change #archivo_pdf_edit": "cambiar_nombrePdf",
            "click .subir_personal_editado": "subirPersonal"
        },

        render: function(){
            
            var compiledTemplate = _.template(formTemplate);
            this.$el.html(compiledTemplate);

           /* var footerView = new FooterView();
            footerView.render();*/

            $("#insertTab").css("display","none");
            $("#insertTab").removeClass("active");
            $("#insertar").removeClass("active");
            $('#editTab').css('display' , 'block');
            $("#editTab").addClass("active");
            $("#editar").addClass("active");
        },

        cambiar_form: function(){
            var valor = $('select[name=opcionesEditar]');
            $(".inner-form").css("display","none");

            if (valor.val() == 1) {
                $("#edit-personal").css("display","block");
            }
            if (valor.val() == 2) {
                $("#edit-articulo").css("display","block");
            }
            if (valor.val() == 3) {
                $("#edit-proyectos").css("display","block");
            }
            if (valor.val() == 4) {
                $("#edit-noticias").css("display","block");
            }
            if (valor.val() == 5) {
                $("#edit-imagenes").css("display","block");
            }
        }, 

        mostrarListaPersonal: function(){
            var temp = this.$("#personal_list");
            var tipo=$('select[name=tipo_personal_edit]').val();

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
                            imagen: dataJson[i].Imagen
                        });

                        total.push(dato);
                    }
                    var data = {
                            personal: total,
                            _: _ 
                        };

                    var compiledTemplate = _.template(personalEditTemplate, data);
                    temp.html(compiledTemplate);
                }
            }); 
        },
        
        cambiar_nombreImg: function(){
            $('#uploadImg_edit').val($("#archivo_img_edit")[0].files[0].name);
        },

        cambiar_nombreImg_noti: function(){
            $('#uploadImg_noti').val($("#archivo_img_noti")[0].files[0].name);
        },

        cambiar_nombreImg_gral: function(){
            $('#uploadImg_gral').val($("#archivo_img_gral")[0].files[0].name);
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

        cerrarMensaje: function(){
            $('.done').fadeOut('slow'); 
        },

        cleanForm: function(frm){
            var inputs = document.frm.getElementsByTagName("input");
            var select = document.frm.getElementsByTagName("select");
            for(var i=0;i<inputs.length;i++){
                inputs[i].value = "";
            }
            for(var i=0;i<inputs.length;i++){
                select[i].value = "0";
            }
        },
        
        subirPersonal: function(){
            var id= $('#id_hidden').val();
            var name = $('input[name=nombre_personal_edit]');
            var apellido = $('input[name=apellido_personal_edit]');
            var titulo = $('input[name=titulo_personal_edit]');
            var cargo = $('input[name=cargo_personal_edit]');
            var especialidad = $('textarea[name=especialidad_personal_edit]');
            var specialty = $('textarea[name=specialty_personal_edit]');
            var email = $('input[name=email_personal]');
            var foto = $("#archivo_img_edit")[0].files[0];
            var cv = $("#archivo_pdf_edit")[0].files[0];
            var filtro = $('select[name=tipo_personal_edit]');
            var adicionales = $('input[name=adicional_personal_edit]');
            var returnError = false;
            var hay_img = false;
            var hay_pdf = false;
            var that = this.$that;

            if (name.val()=='') {
                name.addClass('error');
                returnError = true;
            } else name.removeClass('error');
            
            if (apellido.val()=='') {
                apellido.addClass('error');
                returnError = true;
            } else apellido.removeClass('error');  

            if (titulo.val()=='') {
                titulo.addClass('error');
                returnError = true;
            } else titulo.removeClass('error');  

            if (cargo.val()=='') {
                cargo.addClass('error');
                returnError = true;
            } else cargo.removeClass('error');  

            if (especialidad.val()=='') {
                especialidad.addClass('error');
                returnError = true;
            } else especialidad.removeClass('error');  

            if (email.val()=='') {
                email = null;
                //returnError = true;
            } else email = email.val();  

            if (cv == undefined) {
                cv_value = null;
                //returnError = true;
            } else {
                cv_value = cv.name;
                hay_pdf = true;
            }
          
            if (foto == undefined) {
                foto_value = null;
                //returnError = true;
            } else {
                foto_value = foto.name;
                hay_img = true;
            }

            if (adicionales.val()=='') {
                adicionales = null;
                //returnError = true;
            } else adicionales = adicionales.val();

            if (specialty.val()=='') {
                specialty = null;
            } else specialty = specialty.val(); 

            if (hay_img) {
                extension = foto_value.substring(foto_value.lastIndexOf('.') + 1);
                if (this.isImage(extension)!=true) {
                    $('#uploadImg_edit').addClass('error');
                    message = $("<span class='error_mng'>El archivo debe ser jpg, jpeg, png o gif.</span>");
                    this.showMessageImg(message);
                    returnError = true;
                }
                else {
                    $(".messageImg").hide();
                    $('#uploadImg_edit').removeClass('error');
                }
            }
            else {
                if ($('#uploadImg_edit').val()!=''){
                    foto_value = $('#uploadImg_edit').val();
                }
            }

            if (hay_pdf) {
                extension = cv_value.substring(cv_value.lastIndexOf('.') + 1);
                if (this.isPdf(extension)!=true) {
                    $('#uploadPdf_edit').addClass('error');
                    message = $("<span class='error_mng'>El archivo debe ser Pdf.</span>");
                    this.showMessagePdf(message);
                    returnError = true;
                }
                else {
                    $(".messagePdf").hide();
                    $('#uploadPdf_edit').removeClass('error');
                }
            }
            else {
                if ($('#uploadPdf_edit').val()!=''){
                    cv_value = $('#uploadPdf_edit').val();
                }
            }

            if(returnError == true){
                return false;   
            }

            parametros = {
                id: id,
                name : name.val(),
                apellido : apellido.val(),
                titulo : titulo.val(),
                cargo : cargo.val(),
                especialidad : especialidad.val(), 
                specialty : specialty,
                email : email,
                foto_nombre : foto_value,
                cv_nombre : cv_value,
                filtro : filtro.val(),
                adicionales :adicionales
            }

            $.ajax({
                data: parametros, 
                url: 'php/formularios/actualizar_personal.php',
                type:  'POST',
                success: function (response) {
                    if (hay_img || hay_pdf) {
                        var archivos = new FormData($(".datos_edit")[0]);

                        $.ajax({
                            url: 'php/upload.php',  
                            type: 'POST',
                            // Form data
                            //datos del formulario
                            data: archivos,
                            //necesario para subir archivos via ajax
                            cache: false,
                            contentType: false,
                            processData: false,
                            beforeSend: function(){
                                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                                $(".modal").show();
                                $(".modal .mensaje").html(message);        
                            },
                            //una vez finalizado correctamente
                            success: function(datos){
                                $(".modal").hide();
                                $('.done').fadeIn('slow');
                                name.val('');
                                apellido.val('');
                                titulo.val('');
                                cargo.val('');
                                especialidad.val('');
                                $('textarea[name=specialty_personal_edit]').val('');
                                $('input[name=email_personal_edit]').val('');
                                $('#uploadImg_edit').val('');
                                $('#uploadPdf_edit').val('');
                                $('select[name=tipo_personal_edit]').val('0');
                                $('input[name=adicional_personal_edit]').val('');   
                                $('#edit-personal').css('display','none');
                            }                      
                        });
                    }
                    else {
                        $('.done').fadeIn('slow');    
                        name.val('');
                        apellido.val('');
                        titulo.val('');
                        cargo.val('');
                        especialidad.val('');
                        $('textarea[name=specialty_personal_edit]').val('');
                        $('input[name=email_personal_edit]').val('');
                        $('#uploadImg_edit').val('');
                        $('#uploadPdf_edit').val('');
                        $('select[name=tipo_personal_edit]').val('0');
                        $('input[name=adicional_personal_edit]').val('');    
                        $('#edit-personal').css('display','none'); 
                    }
                }
            });
        },

        mostrarListaArticulo: function(){
            var temp = this.$("#articulo_list");
            var tipo=$('select[name=tipo_articulo_edit]').val();

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
                            tipo: dataJson[i].tipo
                        });

                        total.push(dato);
                    }
                    var data = {
                            articulo: total,
                            _: _ 
                        };

                    var compiledTemplate = _.template(articulosEdit, data);
                    temp.html(compiledTemplate);
                }
            }); 
        },

        subirArticulo: function(){
            var autores = $('input[name=autores]');
            var titulo = $('input[name=titulo]');
            var lugar = $('input[name=lugar]');
            var anio = $('input[name=anio]');
            var tipo = $('select[name=tipo]');
            
            var returnError = false;
            var hay_img = false;
            var hay_pdf = false;
            var temp = this.$el;

            if (autores.val()=='') {
                autores.addClass('error');
                returnError = true;
            } else autores.removeClass('error');
            
            if (titulo.val()=='') {
                titulo.addClass('error');
                returnError = true;
            } else titulo.removeClass('error');  

            if (lugar.val()=='') {
                lugar.addClass('error');
                returnError = true;
            } else lugar.removeClass('error');  

            if (anio.val()=='') {
                anio.addClass('error');
                returnError = true;
            } else anio.removeClass('error');  

            if (tipo.val()=='0') {
                tipo.addClass('error');
                returnError = true;
            } else tipo.removeClass('error');  

            if(returnError == true){
                return false;   
            }

            parametros = {
                autores : autores.val(),
                titulo : titulo.val(),
                lugar : lugar.val(),
                anio : anio.val(),
                tipo : tipo.val(),
            }

            $.ajax({
                data: parametros, 
                url: 'php/formularios/insertar_articulos.php',
                type:  'POST',
                success: function (response) {
                    $('.done').fadeIn('slow'); 
                    autores.val('');
                    titulo.val('');
                    lugar.val('');
                    anio.val('');
                    $('select[name=tipo]').val('0');
                }
            });
        },

        subirProyecto: function(){
            var titulo = $('input[name=tituloProy]');
            var tipo = $('input[name=tipo]');
            var participantes = $('input[name=participantes]');
            var desde = $('input[name=desde]');
            var hasta = $('input[name=hasta]');
            var claves = $('input[name=claves]');
            var especialidad = $('input[name=especialidad]');
            
            var returnError = false;

            if (titulo.val()=='') {
                titulo.addClass('error');
                returnError = true;
            } else titulo.removeClass('error');  

            if (participantes.val()=='') {
                participantes.addClass('error');
                returnError = true;
            } else participantes.removeClass('error');

            if (desde.val()=='') {
                desde.addClass('error');
                returnError = true;
            } else desde.removeClass('error'); 

            if (hasta.val()=='') {
                hasta.addClass('error');
                returnError = true;
            } else hasta.removeClass('error');  

            if(returnError == true){
                return false;   
            }

            parametros = {
                titulo : titulo.val(),
                tipo : tipo.val(),
                participantes : participantes.val(),
                desde : desde.val(),
                hasta : hasta.val(),
                especialidad : especialidad.val(),
                claves: claves.val()
            }

            $.ajax({
                data: parametros, 
                url: 'php/formularios/insertar_proyectos.php',
                type:  'POST',
                success: function (response) {
                    $('.done').fadeIn('slow');    
                    tipo.val('');
                    titulo.val('');
                    participantes.val('');
                    desde.val('');
                    especialidad.val('');
                    hasta.val('');
                    claves.val('');     
                }
            });
        },

        subirNoticias: function(){
            var titulo = $('input[name=tituloNoti]');
            var cuerpo = $('textarea[name=cuerpo]');
            var fecha = $('input[name=fecha]');
            var img = $("#archivo_img_noti")[0].files[0];
            var hay_img = false;
            
            var returnError = false;

            if (titulo.val()=='') {
                titulo.addClass('error');
                returnError = true;
            } else titulo.removeClass('error');  

            if (cuerpo.val()=='') {
                cuerpo.addClass('error');
                returnError = true;
            } else cuerpo.removeClass('error');

            if (fecha.val()=='') {
                fecha.addClass('error');
                returnError = true;
            } else fecha.removeClass('error'); 

            if (img == undefined) {
                img_value = null;
                //returnError = true;
            } else {
                img_value = img.name;
                hay_img = true;
            }

            if (hay_img) {
                extension = img_value.substring(img_value.lastIndexOf('.') + 1);
                if (this.isImage(extension)!=true) {
                    $('#uploadImg_noti').addClass('error');
                    message = $("<span class='error_mng'>El archivo debe ser jpg, jpeg, png o gif.</span>");
                    this.showMessageImg(message);
                    returnError = true;
                }
                else {
                    $(".messageImg").hide();
                    $('#uploadImg_noti').removeClass('error');
                }
            }

            if(returnError == true){
                return false;   
            }

            parametros = {
                titulo : titulo.val(),
                cuerpo : cuerpo.val(),
                fecha : fecha.val(),
                img : img_value
            }

            $.ajax({
                data: parametros, 
                url: 'php/formularios/insertar_noticias.php',
                type:  'POST',
                success: function (response) {
                    if (hay_img) {
                        var archivos = new FormData($(".datos")[0]);

                        $.ajax({
                            url: 'php/upload_noticias.php',  
                            type: 'POST',
                            data: archivos,
                            cache: false,
                            contentType: false,
                            processData: false,
                            beforeSend: function(){
                                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                                $(".modal").show();
                                $(".modal .mensaje").html(message);        
                            },
                            success: function(datos){
                                $(".modal").hide();
                                $('.done').fadeIn('slow');
                                titulo.val('');
                                cuerpo.val('');
                                fecha.val('');
                                $("#uploadImg_noti").val('');     
                            }
                        });
                    }
                    else {
                       $('.done').fadeIn('slow');         
                        titulo.val('');
                        cuerpo.val('');
                        fecha.val('');
                        $("#uploadImg_noti").val('');  
                    }     
                }
            }); 
        },

        subirImagenes: function(){
            var lugar = $('select[name=lugarImg]');
            var img = $("#archivo_img_gral")[0].files[0];
            var hay_img = false;
            
            var returnError = false;

            if (lugar.val()=='') {
                lugar.addClass('error');
                returnError = true;
            } else lugar.removeClass('error');  

            if (img == undefined) {
                img_value = null;
                $("#uploadImg_gral").addClass('error');
                returnError = true;
            } else {
                img_value = img.name;
                hay_img = true;
            }

            if (hay_img) {
                extension = img_value.substring(img_value.lastIndexOf('.') + 1);
                if (this.isImage(extension)!=true) {
                    $('#uploadImg_gral').addClass('error');
                    message = $("<span class='error_mng'>El archivo debe ser jpg, jpeg, png o gif.</span>");
                    this.showMessageImg(message);
                    returnError = true;
                }
                else {
                    $(".messageImg").hide();
                    $('#uploadImg_gral').removeClass('error');
                }
            }

            if(returnError == true){
                return false;   
            }

            if (lugar.val()==1) {
                var url = "images/inicio";

                parametros = {
                    img : img_value,
                    url: url
                }

                $.ajax({
                    data: parametros, 
                    url: 'php/formularios/insertar_img_ini.php',
                    type:  'POST',
                    success: function (response) {
                        var archivos = new FormData($(".datos")[0]);

                        $.ajax({
                            url: 'php/upload_img_ini.php',  
                            type: 'POST',
                            data: archivos,
                            cache: false,
                            contentType: false,
                            processData: false,
                            beforeSend: function(){
                                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                                $(".modal").show();
                                $(".modal .mensaje").html(message);        
                            },
                            success: function(datos){
                                $(".modal").hide();
                                $('.done').fadeIn('slow');
                                $('select[name=lugarImg]').val('0');
                                $("#uploadImg_gral").val('');
                            }
                        });
                    }
                }); 
            }

            if (lugar.val()==2) {
                var url = "images/laboratorios/palinologia";

                parametros = {
                    lugar : lugar.val(),
                    img : img_value,
                    url: url
                }

                $.ajax({
                    data: parametros, 
                    url: 'php/formularios/insertar_img_lab.php',
                    type:  'POST',
                    success: function (response) {
                        var archivos = new FormData($(".datos")[0]);

                        $.ajax({
                            url: 'php/upload_img_lab1.php',  
                            type: 'POST',
                            data: archivos,
                            cache: false,
                            contentType: false,
                            processData: false,
                            beforeSend: function(){
                                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                                $(".modal").show();
                                $(".modal .mensaje").html(message);        
                            },
                            success: function(datos){
                                $(".modal").hide();
                                $('.done').fadeIn('slow');
                                $('select[name=lugarImg]').val('0');
                                $("#uploadImg_gral").val('');  
                            }
                        });
                    }
                }); 
            }

            if (lugar.val()==3) {
                var url = "images/laboratorios/petrotomia";

                parametros = {
                    lugar : lugar.val(),
                    img : img_value,
                    url: url
                }

                $.ajax({
                    data: parametros, 
                    url: 'php/formularios/insertar_img_lab.php',
                    type:  'POST',
                    success: function (response) {
                        var archivos = new FormData($(".datos")[0]);

                        $.ajax({
                            url: 'php/upload_img_lab2.php',  
                            type: 'POST',
                            data: archivos,
                            cache: false,
                            contentType: false,
                            processData: false,
                            beforeSend: function(){
                                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                                $(".modal").show();
                                $(".modal .mensaje").html(message);        
                            },
                            success: function(datos){
                                $(".modal").hide();
                                $('.done').fadeIn('slow');
                                $('select[name=lugarImg]').val('0');
                                $("#uploadImg_gral").val('');
                            }
                        });
                    }
                }); 
            }
        }
    });

    return EditarView;
});