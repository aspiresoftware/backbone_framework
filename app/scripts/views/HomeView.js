/*
View defined for the Home
*/
'use strict';
define([
    "scripts/app",
    "text!scripts/template/home.html",
    "jquery",
    "scripts/utils",
    "bootstrap",
    "backbone"
], function(app, HomeTpl, $){
    var HomeView = Backbone.View.extend({
        //home page template
        template: _.template(HomeTpl),
        initialize: function () {
           var todoArray=null;
           //for getting the todos related to the user
           app.session.getTodo({
                    success: function(result){
                        console.log("SUCCESS", result);
                        todoArray = result.todos;
                        var template=_.template(HomeTpl);
                        $('#content').html(template({todoArray: todoArray}));
                    },
                    error: function(err){
                        console.log("ERROR", err.error);
                    }
                });
        },
        events: {
            //add new events and the related methods for that events below the events block
        },
        render: function () {
            //append all the templates here to be displayed onto the home page
            return this;
        },
    });
    return HomeView;
});