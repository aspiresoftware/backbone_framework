/**
 * @desc		Todo model to store the todo details(i.e Actions and Name)
 */
define([
    'scripts/app',
    'scripts/constants',
    'scripts/utils',
    'backbone'
], function(app, constants){
    var TodoModel = Backbone.Model.extend({
        initialize: function(){
            _.bindAll(this,'url');
        },
        defaults: {
            id: 0,
            task: '',
        },
        url: function(){
            return constants.API + constants.TODO;
        }
    });
    return TodoModel;
});
