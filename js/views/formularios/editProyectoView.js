define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/formularios/editarProyectoTemplate.html'

], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, editarProyectoTemplate){

    var EditarView = Backbone.View.extend({
        el: $("#proyectos_list"),
        that: this,

        render: function(id){
            parametros = {
                id: id
            }

            var total=[];

            $.ajax({
                data: parametros, 
                url:   'php/proyecto_byid.php',
                type:  'post',
                success:  function (response) {

                    var dataJson = eval(response);

                    id= dataJson[0].id,
                    titulo= dataJson[0].titulo,
                    participantes= dataJson[0].participantes,
                    tipo= dataJson[0].tipo,
                    desde= dataJson[0].desde,
                    hasta= dataJson[0].hasta,
                    especialidad= dataJson[0].especialidad,
                    claves= dataJson[0].claves

                    data = {
                        _:_
                    }
                    
                    var compiledTemplate = _.template(editarProyectoTemplate,data);
                    $("#proyectos_list").html(compiledTemplate);

                    $('#id_hidden_proy').val(id);
                    $('input[name=titulo_proyecto_edit]').val(titulo);
                    $('input[name=participantes_proyecto_edit]').val(participantes);
                    $('input[name=tipo_proyecto_edit]').val(tipo);
                    $('input[name=desde_proyecto_edit]').val(desde);
                    $('input[name=hasta_proyecto_edit]').val(hasta);
                    $('input[name=especialidad_proyecto_edit]').val(especialidad);
                    $('input[name=claves_proyecto_edit]').val(claves);

                    var footerView = new FooterView();
                    footerView.render();
                }
            }); 
        }
    });

    return EditarView;
});