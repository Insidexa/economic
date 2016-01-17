var app = angular.module('app', []);

app.filter('fNAN', function () {
    return function (input) {
        if (isNaN(input)) {
            return '0.00';
        } else return input;
    };
});