(function() {
  'use strict';

  angular
    .module('app')
    .controller('JoinCtrl', JoinCtrl);

  JoinCtrl.$inject = ['$location', '$scope', '$localStorage', 'socket'];//add socket as dependency

  function JoinCtrl($location, $scope, $localStorage, socket) {
    $scope.name = '';
    var nickname;

    $scope.join = function() {//join function
      nickname = $scope.name;
      $localStorage.nickname = nickname;//store the name of the user

      socket.emit('join', {
        nickname: nickname
      });

      $location.path('/main');//after click the button send to the main page
    }

  }
})();
