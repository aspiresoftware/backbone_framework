BackBone JS + Require Js


Prerequisites:
You need a server side code https://github.com/aspiresoftware/REST_API_PLAY  to make this application run on your localhost.Please setup the database as per the readme.md of server code into your local machine.


Note:
To make your own implementation for the server code i suggest you to make the relative changes to the server https://github.com/aspiresoftware/REST_API_PLAY


SETUP THE PROJECT


Step 1:Setup the project using the bower+grunt+yeoman for backbone js(you will need Node js and npm installed in your local machine)
* install npm and nodejs:
   * http://blog.nodeknockout.com/post/65463770933/how-to-install-node-js-and-npm
   * https://github.com/joyent/node/wiki/installing-node.js-via-package-manager
* install Yeoman:
   * http://yeoman.io/
* Create project structure with yeoman:
   * http://jonkemp.com/backbone/setting-up-a-backbone-js-webapp-with-yeoman-grunt-and-bower.html


Step 2:Clone the project in your localmachine
* go to the directory where you want to clone the project and use
   * git clone {{repo link goes here}}


Step 3:Use the ~/Backbone/app/scripts/constants.js for defining all the constants
* API:Server name where you want to fire all the urls to get the data
* You can also define all the route for the application below.


Step 4:Run Project
* Open terminal 
* Redirect yourself to the ~/Backbone directory
* Use sudo grunt serve to make the server run and display the default home page of the application with the login page.(by default the browser will open the page,if not follow the below step)
* use http://localhost:8000/ to run the application.






Step 5:Miscellaneous Development changes(Optional)
* You can change the port of the grunt server from ~/Backbone/Gruntfile.js
   * FileName: Gruntfile.js
      * connect: {
      options: {
        port: 8000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      }


Note:
* When using the above server code then 
   * username:        user1@demo.com
   * password:        password