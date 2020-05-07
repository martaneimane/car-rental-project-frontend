'use strict';

angular.module('login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginCtrl',
            //Down line wasnt on DMitry!
            cache: false
        });
    }])

    .controller('loginCtrl', ['$scope', '$http',
        function ($scope, $httpClient) {
            $scope.submit = function () {

                console.log('email: ' + $scope.email);
                console.log('password: ' + $scope.password);

                $httpClient.get("http://localhost:8080/api/v1/rest/Auth/auth(" + $scope.email + ")")
                    .then(function (response) {

                        console.log("FIRST RESPONSE === ");
                        console.log(response.data.type);

                        if (response.data.type === "Response") {
                            var cryptedPassResponse = response.date.token + "__" + $scope.password;

                            var authRequestDTO = {
                                email: $scope.email,
                                crypted_token: cryptedPassResponse
                            };

                            var postData = JSON.stringify(authRequestDTO);
                            console.log(postData);

                            $httpClient.post("http://localhost:8080/api/v1/rest/Auth/auth/login", postData)
                                .then(function (response) {
                                    if (response.data.type === "ERROR") {
                                        alert('AUTH FAILED: ' + response.data.message);
                                    }
                                    document.getElementById("auth_content").textContent = response.data.secretContent;
                                    console.log("Auth response: ");
                                    console.log(response);
                                });
                        }
                        console.log(response);
                    }).catch(function (error) {
                    console.log(error);
                });
            }

        }]);
