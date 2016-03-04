define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/investigacionTemplate.html',
    'text!templates/invesSinMenuTemplate.html',
    'text!templates/invesGeneralTemplate.html'

    ], function($, _, Backbone, invesTemplate, invesSinMenuTemplate, invesGeneralTemplate){

        var InvesView = Backbone.View.extend({
            el: $("#page"),

            render: function(id){
                var title="";
                if (id=='Proyectos'){
                    title = "Proyectos de Investigación";
                    texto = "<p>Los proyectos son llevados a cabo por un investigador o grupo de investigación, financiados por el CONICET, MINCyT, Universidades y organismos públicos o privados tanto nacionales comodel exterior. Algunos de estos proyectos se desarrollan en el marco de convenios de cooperación internacional con financiamiento bilateral.</p><p>Desde la creación del <strong>Instituto Geológico del Sur,</strong> sus miembros han participado en más de 300 proyectos de investigación.</p>";
                }
                else {
                    if (id=='Articulos'){
                        title ="Producción Científico Tecnológica";
                        texto = "Producción Científica de los Investigadores del Instituto Geológico del Sur";
                    }
                    else{
                        title ="Líneas de invetigación"
                    }
                }

                

                if (id!='') {
                    var compiledTemplate = _.template(invesGeneralTemplate);
                    //$('#page').html(compiledTemplate);

                    var data = {
                        title: title,
                        texto: texto,
                        tipo: id,
                        anio: this.collection.models,
                        _: _ 
                    };

                    var compiledTemplate = _.template(invesTemplate, data);
                    this.$el.html(compiledTemplate);
                }
                else {

                    var data = {
                        title: title,
                        _: _ 
                    };

                    var compiledTemplate = _.template(invesSinMenuTemplate, data);
                    $('#page').html(compiledTemplate);
                }
                
            }
        });

    return InvesView;

});
