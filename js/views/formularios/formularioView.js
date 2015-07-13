define([
  'jquery',
  'underscore',
  'backbone',
  'views/footer/FooterView',
  'text!templates/formulariosTemplate.html',
  'text!templates/InsertSuccessTemplate.html'
], function($, _, Backbone, FooterView, formTemplate, successTemplate){

    var FormularioView = Backbone.View.extend({
        el: $("#page"),
        that: this,
        events : {
          "click .subir_personal": "subirPersonal",
          "click .close": "cerrarMensaje",
          "change #archivo_img": "cambiar_nombreImg",
          "change #archivo_pdf": "cambiar_nombrePdf"
        },

        render: function(){
            var compiledTemplate = _.template(formTemplate);
            this.$el.html(compiledTemplate);

            var footerView = new FooterView();
            footerView.render();
        },

        subirPersonal: function(){
            var name = $('input[name=nombre_personal]');
            var apellido = $('input[name=apellido_personal]');
            var titulo = $('input[name=titulo_personal]');
            var cargo = $('input[name=cargo_personal]');
            var especialidad = $('textarea[name=especialidad_personal]');
            var specialty = $('textarea[name=specialty_personal]');
            var email = $('input[name=email_personal]');
            var foto = $("#archivo_img")[0].files[0];
            var cv = $("#archivo_pdf")[0].files[0];
            var filtro = $('select[name=tipo_personal]');
            var adicionales = $('input[name=adicional_personal]');
            var returnError = false;
            var hay_img = false;
            var hay_pdf = false;
            var temp = this.$el;

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
                    $('#uploadImg').addClass('error');
                    message = $("<span class='error_mng'>El archivo debe ser jpg, jpeg, png o gif.</span>");
                    this.showMessageImg(message);
                    returnError = true;
                }
                else {
                    $(".messageImg").hide();
                    $('#uploadImg').removeClass('error');
                }
            }

            if (hay_pdf) {
                extension = cv_value.substring(cv_value.lastIndexOf('.') + 1);
                if (this.isPdf(extension)!=true) {
                    $('#uploadPdf').addClass('error');
                    message = $("<span class='error_mng'>El archivo debe ser Pdf.</span>");
                    this.showMessagePdf(message);
                    returnError = true;
                }
                else {
                    $(".messagePdf").hide();
                    $('#uploadPdf').removeClass('error');
                }
            }

            if(returnError == true){
                return false;   
            }

            parametros = {
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
                url: 'php/insertar_personal.php',
                type:  'POST',
                success: function (response) {
                    if (hay_img || hay_pdf) {
                        var archivos = new FormData($(".datos")[0]);

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
                            }
                        });
                    }
                    else {
                       $('.done').fadeIn('slow');         
                    }
                }
            });
        },

        cambiar_nombreImg: function(){
            $('#uploadImg').val($("#archivo_img")[0].files[0].name);
        },

        cambiar_nombrePdf: function(){
            $('#uploadPdf').val($("#archivo_pdf")[0].files[0].name);
        },

        showMessageImg: function(message){
            $(".messageImg").html("").show();
            $(".messageImg").html(message);
        },

        showMessagePdf: function(message){
            $(".messagePdf").html("").show();
            $(".messagePdf").html(message);
        },

        isImage: function(extension)
        {
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

        isPdf: function(extension)
        {
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
        }
    });

    return FormularioView;
});
