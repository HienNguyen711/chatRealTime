(function() {
  'use strict';

  angular
    .module('app')
    .factory('socket', socket);

  socket.$inject = ['$rootScope'];

  function socket($rootScope) {
    var socket = io.connect();//open socket connection in browser and server

    return {
      on: on,
      emit: emit
    }
    //on
    function on(eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    };
    //emit
    function emit(eventName, data, callback) {//send event
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    };

  };
})();
