(function(){
    "use strict";

    var app = angular.module('HelloWorldApp',['ngMaterial']);

    app.controller('MainCtrl', function($scope, $mdSidenav)
    {
        $scope.toggleSidenav = function(menuId)
        {
            $mdSidenav(menuId).toggle();
        };
    });
})();