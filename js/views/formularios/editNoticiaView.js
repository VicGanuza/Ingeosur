define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/formularios/editarNoticiaTemplate.html'

], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, editarNoticiaTemplate){

    var EditarView = Backbone.View.extend({
        el: $("#noticias_list"),
        that: this,

        render: function(id){
            parametros = {
                id: id
            }

            var total=[];

            $.ajax({
                data: parametros, 
                url:   'php/noticia.php',
                type:  'post',
                success:  function (response) {

                    var dataJson = eval(response);

                    id= dataJson[0].id,
                    titulo= dataJson[0].titulo,
                    cuerpo= dataJson[0].cuerpo,
                    fecha= dataJson[0].fecha,
                    imagen= dataJson[0].imagen

                    data = {
                        _:_
                    }
                    
                    var compiledTemplate = _.template(editarNoticiaTemplate,data);
                    $("#noticias_list").html(compiledTemplate);

                    $('#id_hidden_not').val(id);
                    $('input[name=titulo_noticia_edit]').val(titulo);
                    $('textarea[name=cuerpo_noticia_edit]').val(cuerpo);
                    $('input[name=fecha_noticia_edit]').val(fecha);
                    $("#uploadImg_noticia_edit").val(imagen);

                    var footerView = new FooterView();
                    footerView.render();
                }
            }); 
        }
    });

    return EditarView;
});