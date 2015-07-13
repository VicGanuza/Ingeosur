define([
  'jquery',
  'underscore',
  'backbone',
  'views/footer/FooterView',
  'text!templates/contactoTemplate.html'
], function($, _, Backbone, FooterView, contactoTemplate){

    var ContactoView = Backbone.View.extend({
        el: $("#page"),
        events : {
          "click .enviar-mail": "sendMail",
        },

        render: function(){
         
            this.$el.html(contactoTemplate);

            var footerView = new FooterView();
            footerView.render();

        },
        
        sendMail: function(){
            var name = $('input[name=name]');
            var email = $('input[name=email]');
            var regx = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/i;
            var comment = $('textarea[name=comment]');
            var returnError = false;

            if (name.val()=='') {
                name.addClass('error');
                returnError = true;
            } else name.removeClass('error');
            
            if (email.val()=='') {
                email.addClass('error');
                returnError = true;
            } else email.removeClass('error');      
            
            if(!regx.test(email.val())){
              email.addClass('error');
              returnError = true;
            } else email.removeClass('error');
            
            
            if (comment.val()=='') {
                comment.addClass('error');
                returnError = true;
            } else comment.removeClass('error');
            
            // Highlight all error fields, then quit.
            if(returnError == true){
                return false;   
            }
        
            parametros = {
                name: name.val(),
                email: email.val(),
                coment: encodeURIComponent(comment.val())
            }

            $.ajax({
                data: parametros,
                url: 'php/contacto.php', 
                type: 'POST',
                success: function (response) {              
                    //if contact.php returned 1/true (send mail success)
                    if (response==1) {
                    
                        //show the success message
                        $('.done').fadeIn('slow');
                        
                        $(".form").find('input[type=text], textarea').val("");

                    //if contact.php returned 0/false (send mail failed)
                    } else alert('Sorry, unexpected error. Please try again later.');               
                }       
            });
        }
    });

    return ContactoView;
});