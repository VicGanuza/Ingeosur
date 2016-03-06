define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/formularios/editarArticuloTemplate.html'

], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, editarArticuloTemplate){

    var EditarView = Backbone.View.extend({
        el: $("#articulo_list"),
        that: this,

        render: function(id){
            parametros = {
                id: id
            }

            var total=[];

            $.ajax({
                data: parametros, 
                url:   'php/articulo_byid.php',
                type:  'post',
                success:  function (response) {

                    var dataJson = eval(response);

                    id= dataJson[0].id;
                    autores= dataJson[0].autores;
                    titulo=dataJson[0].titulo;
                    lugar= dataJson[0].lugar;
                    anio= dataJson[0].anio;
                        
                    data = {
                        _:_
                    }
                    
                    var compiledTemplate = _.template(editarArticuloTemplate,data);
                    $("#articulo_list").html(compiledTemplate);

                    $('#id_hidden_art').val(id);
                    $('input[name=autores_articulo_edit]').val(autores);
                    $('input[name=titulo_articulo_edit]').val(titulo);
                    $('input[name=lugar_articulo_edit]').val(lugar);
                    $('input[name=anio_articulo_edit]').val(anio);

                    var footerView = new FooterView();
                    footerView.render();
                }
            }); 
        }
    });

    return EditarView;
});