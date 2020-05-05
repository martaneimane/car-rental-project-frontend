'use strict';

angular.module('bookings', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/bookings', {
            templateUrl: 'bookings/bookings.html',
            controller: 'BookingCtrl',
            cache: false
        });
    }])

    .controller('BookingCtrl', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $httpClient) {
        $scope.arrRec = [];
        $httpClient.get("http://localhost:8080/api/v1/rest/Booking/bookings")
            .then(function (response) {
                $scope.arrRec = response.data;
                console.log($scope.arrRec);
            }).catch(function (error) {
            console.log(error);
        });
    }])

