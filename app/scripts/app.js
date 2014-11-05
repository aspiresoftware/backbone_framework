'use strict';
define([
    'underscore',
    'jquery',
    'backbone',
    'scripts/constants',
    'scripts/utils'
],
function( _, $, Backbone, constants) {
    var app = {
        //function for setting the common headers for the ajax request
        setHeader:function(xhr){
            xhr.setRequestHeader(constants.XAUTHTOKEN, app.Session().getValue(constants.authToken));
        },
        //algorithm for base 64 encoding and decoding.
        Base64:function() {
                        var keyStr = 'ABCDEFGHIJKLMNOP' +
                            'QRSTUVWXYZabcdef' +
                            'ghijklmnopqrstuv' +
                            'wxyz0123456789+/' +
                            '=';
                        return {
                            encode: function (input) {
                                var output = "";
                                var chr1, chr2, chr3 = "";
                                var enc1, enc2, enc3, enc4 = "";
                                var i = 0;
                     
                                do {
                                    chr1 = input.charCodeAt(i++);
                                    chr2 = input.charCodeAt(i++);
                                    chr3 = input.charCodeAt(i++);
                     
                                    enc1 = chr1 >> 2;
                                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                                    enc4 = chr3 & 63;
                     
                                    if (isNaN(chr2)) {
                                        enc3 = enc4 = 64;
                                    } else if (isNaN(chr3)) {
                                        enc4 = 64;
                                    }
                     
                                    output = output +
                                        keyStr.charAt(enc1) +
                                        keyStr.charAt(enc2) +
                                        keyStr.charAt(enc3) +
                                        keyStr.charAt(enc4);
                                    chr1 = chr2 = chr3 = "";
                                    enc1 = enc2 = enc3 = enc4 = "";
                                } while (i < input.length);
                     
                                return output;
                            },
                     
                            decode: function (input) {
                                var output = "";
                                var chr1, chr2, chr3 = "";
                                var enc1, enc2, enc3, enc4 = "";
                                var i = 0;
                     
                                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                                if (base64test.exec(input)) {
                                    alert("There were invalid base64 characters in the input text.\n" +
                                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                                        "Expect errors in decoding.");
                                }
                                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                     
                                do {
                                    enc1 = keyStr.indexOf(input.charAt(i++));
                                    enc2 = keyStr.indexOf(input.charAt(i++));
                                    enc3 = keyStr.indexOf(input.charAt(i++));
                                    enc4 = keyStr.indexOf(input.charAt(i++));
                     
                                    chr1 = (enc1 << 2) | (enc2 >> 4);
                                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                                    chr3 = ((enc3 & 3) << 6) | enc4;
                     
                                    output = output + String.fromCharCode(chr1);
                     
                                    if (enc3 != 64) {
                                        output = output + String.fromCharCode(chr2);
                                    }
                                    if (enc4 != 64) {
                                        output = output + String.fromCharCode(chr3);
                                    }
                     
                                    chr1 = chr2 = chr3 = "";
                                    enc1 = enc2 = enc3 = enc4 = "";
                     
                                } while (i < input.length);
                     
                                return output;
                            }
                        };
                    },
        //session function to manage the localstore onto the browser side            
        Session:function() {
                  var session = {
                    create: function(sessionId, userName, userRole){
                      var data = {};
                      //TODO all the constants in the session method must be defined inside some other files where all the constants are been declared
                      data[constants.authToken] = sessionId;
                      data[constants.username] = userName;
                      data[constants.role] = userRole;
                      window.localStorage.setItem(constants.sessionName, JSON.stringify(data));
                    },
                    setValue: function(key, value) { 
                      var data = {};
                      try {
                        data =  JSON.parse(window.localStorage.getItem(constants.sessionName));
                      } catch (e) {
                        console.log('Error to get session data from local storage');
                        return null;
                      }
                      data[key] = value;
                      window.localStorage.setItem(constants.sessionName, JSON.stringify(data)); 
                    },
                    getValue: function(key) { 
                      var data = {};
                      try {
                        data =  JSON.parse(window.localStorage.getItem(constants.sessionName));
                        return data[key];
                      } catch (e) {
                        console.log('Error to get session data from local storage');
                        return null;
                      }
                      
                    },
                    remove: function(){
                        console.log('localstore remove called');
                      var data = {};
                      window.localStorage.setItem(constants.sessionName, JSON.stringify(data));
                    }
                  };
                  
                  return session; 
                },
        //setting the auth header when the user loggs in for the first time        
        setCredentials:function(xhr, username, password){
            var encode=app.Base64().encode(username+":"+password);
            console.log("inside setCredentials "+username+":"+password);
            console.log("encoded values "+ encode);
            return 'Basic '+encode;
            //xhr.setRequestHeader(constants.Authorization, 'Basic '+encode);
        },
    };
    $.ajaxSetup({
         headers: {
            //setting the common headers for all the request onto the server 
            'Accept':'application/json',
        },
     }); 
    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
                options.crossDomain ={
                  crossDomain: true
                };
                options.xhrFields = {
                  withCredentials: true
                };
    }); 
    return app;
});
