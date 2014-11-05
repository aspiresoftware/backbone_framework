/*
View defined for the header file
*/
'use strict';
define([
    "scripts/app",
    "text!scripts/template/common/header.html",
    "scripts/utils",
    "bootstrap",
    "backbone"
], function(app, HeaderTpl){
    var HeaderView = Backbone.View.extend({
        template: _.template(HeaderTpl),
        initialize: function () {
            _.bindAll(this,'render');
        },
        events: {
            //add new events and the related methods for that events below the events block
            'click #logout-btn'                      : 'onLogout',
        },
        //function for logginout from the application
        onLogout:function(){
            console.log("inside Logout function");
            app.session.logout({
                    success: function(result){
                        console.log("SUCCESS", result);
                        //removing the localstore from the browser after successfully logging out of the application
                        app.Session().remove();
                        Backbone.history.navigate("#/",{ trigger:true} );
                    },
                    error: function(err){
                        console.log("ERROR", err.error);
                    }
            });
        },
        //renders the view for the header for each page
        render: function () {
            this.$el.append(this.template());
            return this;
        },
    });
    return HeaderView;
});