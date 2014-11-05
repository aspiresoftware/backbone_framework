/*
    File for all the constants related to the application
*/

'use strict';
define([
    'underscore',
    'jquery',
    'backbone',
    'scripts/utils'
],
function( _, $, Backbone) {
    var constants = {
        root : '/',                     // The root path to run the application through.
        //all the constants which needs to be used for the localstorage for managing the session onto the client side
        XAUTHTOKEN: 'X-AUTH-TOKEN',
        Authorization: 'Authorization',
        sessionName: 'ang_session',
        authToken: 'token',
        username : 'username',
        role : 'role',    
        API : 'http://localhost:9000/',                   // Base API URL where the server is located (used by models & collections)
        //all the urls for routing
        TODO: 'todos',          //URL for getting all the todos for the user
        LOGINANDLOGOUT: 'authentication',           //URL for making the user login and logout of the application      
    };
    return constants;
});
