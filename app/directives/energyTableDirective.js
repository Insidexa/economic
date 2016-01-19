/**
 * @ngdoc directive
 * @name app:energyTableDirective
 *
 * @description
 *
 *
 * @restrict A
 * */
angular.module('app')
    .directive('energyTableDirective', function () {
        return {
            restrict: 'EA',
            scope: {
                data: '='
            },
            templateUrl: 'app/directives/templates/energyTable.html'
        };
});
