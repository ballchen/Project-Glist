/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

  // as soon as this file is loaded, connect automatically, 
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    // Listen for Comet messages from Sails
    socket.on('message', function messageReceived(message) {

      ///////////////////////////////////////////////////////////
      // Replace the following with your own custom logic
      // to run when a new message arrives from the Sails.js
      // server.
      ///////////////////////////////////////////////////////////
      log('New comet message received :: ', message);
      //////////////////////////////////////////////////////

    });


    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to 
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' + 
        'e.g. to send a GET request to Sails, try \n' + 
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }

  var app = angular.module("myapp",[]);
  app.controller("mainCtrl",function($scope){
    
    socket.on('message', function messageReceived(message) {

    console.log("message: "+message);

    if(message.verb == "create"){
      $scope.lists.push(message.data);
      $scope.$apply();
    };

    if(message.verb == "destroy"){
      $scope.lists.forEach(function(list, idx){
        if(list.id == message.id){
          $scope.lists.splice(idx, 1);
          $scope.$apply();

        }
      });
    }
     

    });

    console.log("lol: mainCtrl executed");
    
    socket.get("/list",function(lists){
      console.log(JSON.stringify(lists));

      $scope.lists = lists;
      $scope.$apply();
    });

    $scope.create = function(){
      socket.post("/list",{},function(data){
        console.log(data);
        $scope.lists.push(data);
        $scope.$apply();
      })
    }

    $scope.delete = function($index){
      socket.delete("/list/"+ $scope.lists[$index].id ,function(data){
        console.log("delete list");
        console.log(data);
        $scope.lists.splice($index, 1);
        $scope.$apply();
      })
    }

  });
  

})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);
