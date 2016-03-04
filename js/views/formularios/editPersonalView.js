define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/formularios/editarPersonalTemplate.html',
    'text!templates/formularios/personalEdit.html',
    'text!templates/formularios/formulariosTemplate.html'


], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, editarPersonalTemplate, personalEditTemplate){

    var EditarView = Backbone.View.extend({
        el: $("#personal_list"),
        that: this,
        events : {
            "click .subir_personal_editado": "subirPersonal"
        },

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

                    id= dataJson[0].Id;
                    nombre= dataJson[0].Nombre;
                    apellido=dataJson[0].Apellido;
                    titulo= dataJson[0].Titulo;
                    cargo= dataJson[0].Cargo;
                    adicional= dataJson[0].Adicional;
                    especialidad= dataJson[0].Especialidad;
                    specialty= dataJson[0].Specialty;
                    cv= dataJson[0].Cv;
                    imagen= dataJson[0].Imagen;
                    email= dataJson[0].Email;
                        
                    data = {
                        _:_
                    }
                    
                    var compiledTemplate = _.template(editarPersonalTemplate,data);
                    $("#personal_list").html(compiledTemplate);

                    $('#id_hidden').val(id);
                    $('input[name=nombre_personal_edit]').val(nombre);
                    $('input[name=apellido_personal_edit]').val(apellido);
                    $('input[name=titulo_personal_edit]').val(titulo);
                    $('input[name=cargo_personal_edit]').val(cargo);
                    $('textarea[name=especialidad_personal_edit]').val(especialidad);
                    $('textarea[name=specialty_personal_edit]').val(specialty);
                    $('input[name=email_personal_edit]').val(email);
                    $("#uploadImg_edit").val(imagen);
                    $("#uploadPdf_edit").val(cv);
                    $('input[name=adicional_personal_edit]').val(adicional);

                    var footerView = new FooterView();
                    footerView.render();
                }
            }); 
        },

        subirPersonal: function(){
            alert("subirPersonal");
        }
    });

    return EditarView;
});