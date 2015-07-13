define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/footerTemplate.html'
], function($, _, Backbone, footerTemplate){

  var FooterView = Backbone.View.extend({
    el: $("#footer"),

    render: function(){
    
      this.$el.html(footerTemplate);
    }

  });

  return FooterView;
  
});
