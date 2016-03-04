define([
    'jquery',
    'underscore',
    'backbone',
    'views/footer/FooterView',
    'models/personal/PersonalModel',
    'collections/PersonalCollection',
    'text!templates/noticiaTemplate.html'

], function($, _, Backbone, FooterView, PersonalModel, PersonalCollection, noticiaTemplate){

    var NoticiaView = Backbone.View.extend({
        el: $("#page"),

        render: function(id){
            
            var total=[];
            var temp = this.$el;

            parametros = {
                id: id
            }

            $.ajax({
                data: parametros, 
                url:   'php/noticia.php',
                type:  'post',
                success:  function (response) {

                    var dataJson = eval(response);

                    for(var i in dataJson){
                       
                        var dato = new PersonalModel({
                            titulo: dataJson[i].titulo,
                            cuerpo: dataJson[i].cuerpo,
                            fecha: dataJson[i].fecha,
                            imagen: dataJson[i].imagen
                        });

                        total.push(dato);
                    }
                    var data = {
                            noticia: total,
                            _: _ 
                        };

                    var compiledTemplate = _.template(noticiaTemplate, data);
                    temp.html(compiledTemplate);
                }
            }); 

            var footerView = new FooterView();
            footerView.render();
        }
    });

    return NoticiaView;
});