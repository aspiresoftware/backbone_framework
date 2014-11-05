/**
 * configure aliases and dependencies for the application using the require js configurations
 */

if (typeof DEBUG === 'undefined') DEBUG = true;

require.config({
    //base url from which all the files will be loaded into the application(for now it is backbone/app folder as our main index file is there so all the paths of the js file will be refered from that path)
    baseUrl: '/',
    //saves the loading time for each js as all the js are loaded parallel
    paths: {
        'jquery'                : 'bower_components/jquery/dist/jquery',
        'underscore'            : 'bower_components/underscore/underscore',
        'backbone'              : 'bower_components/backbone/backbone',
        'bootstrap'             : 'bower_components/bootstrap/dist/js/bootstrap',
        'text'                  : 'bower_components/text',
        'parsley'               : 'bower_components/parsley',
	    'handlebars'     		: 'bower_components/handlebars-v2.0.0'	
    },
    //something like giving an allias to the js files to refer it to the different parts...i.e. use the exports name to refer them
    // non-AMD lib
    shim: {
        'jquery'                : { exports  : '$' },
        'underscore'            : { exports  : '_' },
        'backbone'              : { deps : ['underscore', 'jquery', 'handlebars'], exports : 'Backbone' },
        'bootstrap'             : { deps : ['jquery'], exports : 'Bootstrap' },
        'parsley'               : { deps: ['jquery'] },
	    'handlebars'    		: { exports  : 'handlebars' },
    }
});
//the dependency js file which is loaded along with this file into the browser
require(['scripts/main']);           // Initialize the application with the main application file.
