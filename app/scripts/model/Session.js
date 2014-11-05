/**
 * @desc		Function containing all the methods related the ajax call
 */
define([
    "scripts/app",
    "scripts/router",
    "scripts/model/User",
    "scripts/model/Todo",
    "underscore",
    "scripts/constants",
    "scripts/delegator",
    "backbone"
], function(app, router, User, Todo, _, constants, delegator){
    var SessionModel = Backbone.Model.extend({
        initialize: function(){
            _.bindAll(this,'url');
            // Singleton user object
            // Access or listen on this throughout any module with app.session.user
            this.user = new User({ });
            // Access or listen on this throughout any module with app.session.todo
            this.todo = new Todo({ });
        },
        //the related url for the javascript
        url: function(){
            return constants.API + constants.LOGINANDLOGOUT;
        },

        /*
         * Abstracted fxn to make a POST request 
         * This takes care of the CSRF header for security, as well as
         * updating the user and session after receiving an API response
         */
        postAuth: function(opts, callback, args){
            delegator.post(this.url(), callback, opts, true);
        },
        login: function(opts, callback, args){
            this.postAuth(opts, callback);
        },
        logout:function(callback, args){
            delegator.delete(this.url(), callback);
        },
        getTodo:function(callback, args){
            var url=constants.API + constants.TODO;
            delegator.get(url, callback);
        },
    });
    return SessionModel;
});