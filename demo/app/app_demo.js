(function() {
    'use strict';

    angular.module('zoomDemo', [
        'ngMaterial',
        'angular-zoom-directive'
    ])
    .config(['$mdThemingProvider', function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
        .primaryPalette('green')
        .warnPalette('red');

    }])
    .controller('demoController', ['$scope', '$mdMedia', '$mdSidenav', '$anchorScroll', '$location', function($scope, $mdMedia, $mdSidenav, $anchorScroll, $location) {
        var vm = this;
        vm.openClose = openClose;
        vm.goTo = goTo;

        function openClose() {
            $mdSidenav('left').toggle();
        }

        function goTo(target) {
            $location.hash(target);
            $anchorScroll();
        }
    }])
})();
