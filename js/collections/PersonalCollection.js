define([
  'jquery',
  'underscore',
  'backbone',
  'models/personal/PersonalModel'
], function($, _, Backbone, PersonalModel){
  var PersonalCollection = Backbone.Collection.extend({
    model: PersonalModel,
    
    initialize: function(){
    
  }

});
 
  return PersonalCollection;
});
