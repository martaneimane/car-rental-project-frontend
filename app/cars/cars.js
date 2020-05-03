'use strict';

angular.module('cars', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cars', {
            templateUrl: 'cars/cars.html',
            controller: 'CarsCtrl',
            cache: false
        });
    }])

    .controller('CarsCtrl', ['$rootScope','$scope', '$http', function ($rootScope, $scope, $httpClient) {
        $scope.arrRec = [];
            $httpClient.get("http://localhost:8080/api/v1/rest/Car/cars")
                .then(function (response) {
                    $scope.arrRec = response.data;
                console.log($scope.arrRec);
            }).catch(function (error) {
                console.log(error);
            });
        }])

