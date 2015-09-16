(function(){
    "use strict";

    var app = angular.module('HelloWorldApp',['ngMaterial','ngMdIcons']);

    app.config(function($mdThemingProvider)
    {
        var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor':'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });
        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('customBlue', {
                'default':'500',
                'hue-1': '50'
            })
            .accentPalette('pink');
        $mdThemingProvider.theme('input','default')
            .primaryPalette('grey');
    });

    app.controller('MainCtrl', function($scope, $mdSidenav)
    {
        $scope.toggleSidenav = function(menuId)
        {
            $mdSidenav(menuId).toggle();
        };
    });
})();