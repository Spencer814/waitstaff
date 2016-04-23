'use strict';
angular.module('waitApp', ['ngRoute', 'ngAnimate'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'homeCtrl'
        }).when('/meal', {
            templateUrl : 'meal.html',
            controller : 'mealCtrl'
        }).when('/tips', {
            templateUrl : 'tips.html',
            controller : 'tipsCtrl'
        }).otherwise({
            redirectTo : '/'
        });
    }])
    .controller('waitCtrl', function($scope, $location) {
        $scope.date = new Date();
        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
    })
    .controller('homeCtrl', function() {})

    .controller('tipsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.staff = $rootScope.staff || {};
		$scope.reset = function() {
            $scope.staff.meals = 0;
			$scope.staff.tips = 0;
			$scope.staff.avgTips = 0;
			$rootScope.staff = {
                meals : 0,
                tips : 0,
                avgTips : 0
            };
            // $scope.reset();
            // $scope.counter = 0;
            // $scope.subtotal = null;
            // $scope.gratuity = null;
            // $scope.total = null;
            // $scope.tiptotal = null;
            // $scope.average = null;
          };
    }])

    .controller('mealCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.customer = $scope.customer || {};
        $rootScope.staff = $rootScope.staff || {
            meals : 0,
            tips : 0,
            avgTips : 0
        };

        $scope.compute = function() {
            if($scope.waitForm.$submitted && $scope.waitForm.$valid && !($scope.waitForm.$pristine)) {
                $scope.customer.subtotal = $scope.meal.base_price * (($scope.meal.tax_rate/100)+1);
                $scope.customer.tip = $scope.customer.subtotal * (($scope.meal.tip_percentage/100));
                $scope.customer.total = $scope.customer.tip + $scope.customer.subtotal;
                $rootScope.staff.tips += $scope.customer.tip;
                $rootScope.staff.meals++;
                $rootScope.staff.avgTips = $rootScope.staff.tips/$rootScope.staff.meals;
            }
        };

        $scope.submit = function() {
            if($scope.waitForm.$submitted && $scope.waitForm.$valid && !($scope.waitForm.$pristine)) {
                $scope.compute();
            }
        };

        $scope.cancel = function() {
            $scope.waitForm.$setPristine();
            $rootScope.meal = {};
        };
    }]);
