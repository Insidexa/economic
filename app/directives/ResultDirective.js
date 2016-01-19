/**
 * @ngdoc directive
 * @name app:result
 *
 * @description
 *
 *
 * @restrict A
 *
 * */
app
    .directive('result', function () {
        return {
            restrict: 'A',
            templateUrl: 'app/directives/templates/result.html',
            controller: 'MainCtrl'
        };
});
