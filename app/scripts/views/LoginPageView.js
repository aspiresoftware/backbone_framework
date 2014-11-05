/*
View defined for the Login page i.e main login page
*/
'use strict';
define([
    "scripts/app",
    "text!scripts/template/login-page.html",
    "scripts/utils",
    "bootstrap",
    "backbone",
    "parsley"
], function(app, LoginPageTpl){
    var LoginPageView = Backbone.View.extend({
        template : _.template(LoginPageTpl),
        initialize: function () {
            _.bindAll(this,'render');
        },
        events: {
             'click #login-btn'                      : 'onLoginAttempt',
            //bind the events to the respective functions with the click events
        },
        onLoginAttempt: function(evt){
            if(evt) evt.preventDefault();
            if(this.$("#loginForm").parsley('validate')){
                //ajax call using the login method of the session model to perform the login using the /authentication url on the rest api 
                app.session.login({
                    username: this.$("#login-username").val(),
                    password: this.$("#login-password").val()
                }, {
                    success: function(result){
                        console.log("SUCCESS", result);
                        //make a localstore in the browser to store the session realted things into the localstore of the browser
                        app.Session().create(result.user.token, result.user.details.username, result.user.details.roles[0]);
                        Backbone.history.navigate("#home", {trigger:true});
                    },
                    error: function(err){
                        console.log("ERROR", err.error);
                    }
                });
                //Ajax call to the web service with some headers included to make the authentication as the client side validation has been done using the parsley.js
                console.log("username: "+this.$("#login-username").val()+" Password: " +this.$("#login-password").val());
            } else {
                //Client side validation failed as parsley.js cought up some validations errors
            }
        },
        //renders the login page template to the main container inside the index page of the application
        render:function () {
            this.$el.append(this.template());
            return this;
        },
    });
    return LoginPageView;
});
