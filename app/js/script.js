angular.module('waitApp', ['ngRoute', 'ngAnimate'])
    .run(function($rootScope, $location) {
        $rootScope.$on('$routeChengeError', function() {
            $location.path('/');
        });
        $rootScope.counter = 0;
        $rootScope.tips = 0;
        $rootScope.values = function(meal) {
          var base = Number($scope.base || 0);
          var tax = Number($scope.tax || 0);
          var tip = Number($scope.tip || 0);
          $scope.subtotal = (base * (tax / 100)) + base;
          $scope.gratuity = $scope.subtotal * (tip / 100);
          $scope.total = $scope.subtotal + $scope.gratuity;
          if ($scope.waitForm.$valid && !($scope.waitForm.$pristine)) {
            $scope.counter += meal;
            $scope.tips += $scope.gratuity;
          }
          $scope.waitForm.$setPristine();

          $scope.tiptotal = $scope.tips;
          $scope.average = $scope.tips / $scope.counter;
        };
    })
    .config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'app/home.html',
            controller : 'homeCtrl'
        })
        .when('/meal', {
            templateUrl : 'app/meal.html',
            controller : 'mealCtrl'
        })
        .when('/tips', {
            templateUrl : 'app/tips.html',
            controller : 'tipsCtrl'
        })
        .otherwise({
            redirectTo : '/'
        });
    })
    .controller('waitCtrl', function($scope, $location) {
        $scope.date = new Date();
        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
    })
    .controller('homeCtrl', function($scope) {})
    .controller('mealCtrl', function($scope) {
        $scope.data = function() {
            $scope.counter = 0;
            $scope.tips = 0;
            $scope.values(1);
        };

        $scope.reset = function() {
            $scope.waitForm.$setPristine();
        };
        return this;
    })
    .controller('tipsCtrl', function($scope, $rootScope) {
        $scope.resetAll = function() {
            $scope.reset();
            $scope.counter = 0;
            $scope.subtotal = null;
            $scope.gratuity = null;
            $scope.total = null;
            $scope.tiptotal = null;
            $scope.average = null;
          };
          return this;
    });
