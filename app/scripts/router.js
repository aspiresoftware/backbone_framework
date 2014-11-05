/**
 * backbone router for pushState page routing
 */
'use strict';
define([
    "scripts/app",
    "scripts/views/HeaderView",
    "scripts/views/LoginPageView",
    "scripts/views/HomeView",
    "scripts/utils"
], function(app, HeaderView ,LoginPageView ,HomeView){
    var WebRouter = Backbone.Router.extend({
        initialize: function(){
            _.bindAll(this,'index');
        },
        //define all the routes for the application here
        routes: {
            ""                : "index",
            "home"            : "home", 
        },
        //functions to render the header for all the pages i.e. for all the this objects in the application    
        show: function(view){
            // Every page view in the router should need a header.
            // Instead of creating a base parent view, just assign the view to this
            // so we can create it if it doesn't yet exist
            this.headerView = new HeaderView({});
            this.headerView.setElement( $(".header") ).render();
            
            // Establish the requested view into scope
            this.currentView = view;
            $('#content').html( this.currentView.render().$el);
        },
        //function for the index page
        index: function() {
                $(".header").empty();
                $('#content').empty();
                $('#content').append(new LoginPageView({}).render().$el);
        },
        //function for the home page after login into the application
        home: function(){
            if(app.Session().getValue('token') != null){
                console.log("inside home");
                var homeView=new HomeView({});
                this.show(homeView);
            }else{
                Backbone.history.navigate("#/", {trigger:true});
            }
        }
    });
    return WebRouter;
});
