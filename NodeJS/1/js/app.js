// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "jquery": "//code.jquery.com/jquery-2.0.0"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
