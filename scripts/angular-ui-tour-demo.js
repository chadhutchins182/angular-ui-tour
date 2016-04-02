angular.module('uiTourDemo', ['bm.uiTour', 'ngRoute'])

    .config(['TourConfigProvider', '$routeProvider', function (TourConfigProvider, $routeProvider) {

        TourConfigProvider.set('scrollOffset', 50);

        TourConfigProvider.set('onStart', function () {
            console.log('Started Tour');
        });
        TourConfigProvider.set('onNext', function () {
            console.log('Moving on...');
        });


        $routeProvider
            .when('/docs', {
                templateUrl: 'partials/docs.html'
            })
            .when('/other', {
                templateUrl: 'partials/other.html'
            })
            .otherwise({
                redirectTo: '/docs'
            });

    }])

    .run(['uiTourService', function (TourService) {

        TourService.createDetachedTour('detachedDemoTour');

    }])

    .controller('TourDemoController', ['$scope', '$q', '$timeout', 'uiTourService', function ($scope, $q, $timeout, TourService) {
        $scope.isEnabled = true;

        $scope.toggleEnabled = function () {
            $scope.isEnabled = !$scope.isEnabled;
        };

        $scope.onPrev = function (tour) {
            console.log('Moving back...', tour);
        };

        $scope.confirmShow = function () {
            return $q(function (resolve) {
                if (confirm('Click OK if you don\'t see the popup, and 1 second later you will!')) {
                    $timeout(resolve, 1000);
                } else {
                    resolve();
                }
            });
        };

        $scope.startDetached = function () {
            TourService.getTourByName('detachedDemoTour').start();
        }

    }]);
