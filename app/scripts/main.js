/**
 * Main app initialization and initial auth check
 */
'use strict';
require([
    "scripts/app",
    "scripts/router",
    "scripts/model/Session",
],
function(app, WebRouter , Session) {
    Backbone.emulateHTTP = true;
    
    //creates the routes for the application
    app.router = new WebRouter();
    // Create a new session model and scope it to the app global
    // This will be a singleton, which other modules can access
    app.session = new Session({ });

    //starting the application with the cros support to enable the check on the browser history
    Backbone.history.start({ root: '/' } );

    //checking for the already logged in user into the application
    if(app.Session().getValue('token') != null){
        console.log(app.Session().getValue('token'));
        Backbone.history.navigate("#home", {trigger:true});
    }
});
