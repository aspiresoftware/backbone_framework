/*
    File for all the ajax methods related to the application
*/

'use strict';
define([
    'underscore',
    'jquery',
    'backbone',
    'scripts/app',
    'scripts/constants',
    'scripts/utils'
],
function( _, $, Backbone, app, constants) {
    var delegator = {
            get:function(url, callback){
                $.ajax({
                        url: url,
                        dataType: 'json',
                        type: 'GET',
                        beforeSend: function(xhr) {
                            //setting the common headers for all the request to the server
                            app.setHeader(xhr);
                        },
                        success: function(res){
                                callback.success(res);
                                //display the home page after the login is successfull
                                console.log("successfull Todo get call made");
                        },
                        error: function(model , res){
                            console.log("Error in getting the todos list" + res);
                            callback.error(res);
                        }
                });
        },
        delete:function(url, callback){
                $.ajax({
                        url: url,
                        dataType: 'json',
                        type: 'DELETE',
                        beforeSend: function(xhr) {
                            //setting the common headers for all the request to the server
                            app.setHeader(xhr);
                        },
                        success: function(res){
                                callback.success(res);
                                //display the home page after the login is successfull
                                console.log("successfull Todo get call made");
                        },
                        error: function(model , res){
                            console.log("Error in getting the todos list" + res);
                            callback.error(res);
                        }
                });
        },
        //need to refactor with the jason data to be sent to the server
        put:function(url, callback, data){
                $.ajax({
                        url: url,
                        dataType: 'json',
                        type: 'PUT',
                        beforeSend: function(xhr) {
                            //setting the common headers for all the request to the server
                            app.setHeader(xhr);
                        },
                        data:  JSON.stringify(data),
                        success: function(res){
                                callback.success(res);
                                //display the home page after the login is successfull
                                console.log("successfull Todo get call made");
                        },
                        error: function(model , res){
                            console.log("Error in getting the todos list" + res);
                            callback.error(res);
                        }
                });
        },
        //need to refactor with the jason data to be sent to the server and for adding an extra header when using the login
        post:function(url, callback, data, login){
                $.ajax({
                        url: url,
                        dataType: 'json',
                        type: 'POST',
                        beforeSend: function(xhr) {
                            //setting the header if only the login request is made to the server
                            if(login){
                                console.log('for present login');
                                xhr.setRequestHeader(constants.Authorization, app.setCredentials(xhr, data.username, data.password));
                            }
                            //setting the common headers for all the request to the server
                            app.setHeader(xhr);    
                        },
                        data:  JSON.stringify(data),
                        success: function(res){
                                callback.success(res);
                                //display the home page after the login is successfull
                                console.log("successfull Post call made");
                        },
                        error: function(model , res){
                            console.log("Error in Post call" + res);
                            callback.error(res);
                        }
                });
        },
    };
    return delegator;
});
