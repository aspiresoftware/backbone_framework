/**
 * @desc		User model to store the login details(i.e username and password)
 */
define([
    'scripts/app',
    'scripts/constants',
    'scripts/utils',
    'backbone'
], function(app, constants){
    var UserModel = Backbone.Model.extend({
        initialize: function(){
            _.bindAll(this,'url');
        },
        defaults: {
            id: 0,
            username: '',
        },
        url: function(){
            //still not in use so not given the general name for it.
            return constants.API + 'user';
        }
    });
    return UserModel;
});
