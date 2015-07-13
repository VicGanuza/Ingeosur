define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/personalListTemplate.html'
], function($, _, Backbone, listTemplate){

    var ListView = Backbone.View.extend({
        el: $("#page"),

        render: function(id){
            var title="";

            if (id=='investigadores-conicet') {
                title = 'Investigadores CONICET';
            } 
            else {
                if (id=='investigadores-cic') {
                    title = 'Investigadores CIC';
                }
                else {
                    if (id=='investigadores-uns') {
                        title = 'Investigadores UNS';
                    }
                    else {
                        if (id=='becarios-conicet') {
                            title = 'Becarios CONICET';
                        }
                        else {
                            title='Profesionales de Apoyo';
                        }
                    }       
                }
            }
          

            var data = {
                    personal: this.collection.models,
                    title: title,
                    _: _ 
                };

            var compiledTemplate = _.template(listTemplate, data);
            this.$el.html(compiledTemplate);
        }
    });

    return ListView;
  
});
