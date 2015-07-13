
define([
  'jquery',
  'underscore',
  'backbone',
/*  'models/contacto/ContactoModel',
  'collections/contacto/ContactoCollection',*/
  'text!templates/loggin/logginTemplate.html'
], function($, _, Backbone/*, ContactoModel, ContactoCollection*/, logginTemplate){

  var LogginView = Backbone.View.extend({
    el: $("#page"),
    render: function(){
      
      this.$el.html(logginTemplate);

      }
     });

  return LogginView;
});
