angular.module('waitApp', ['ngRoute', 'ngAnimate'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'views/home.html',
            controller : 'homeCtrl'
        }).when('/meal', {
            templateUrl : 'views/meal.html',
            controller : 'mealCtrl'
        }).when('/tips', {
            templateUrl : 'views/tips.html',
            controller : 'tipsCtrl'
        }).otherwise({
            redirectTo : '/'
        });
    }])
    .run(function($rootScope, $location, $timeout) {
        // $rootScope.$on('$routeChangeError', function() {
        //     $location.path("/error");
        // });
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
          $timeout(function() {
            $rootScope.isLoading = false;
          }, 1000);
        });
    })

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
                $scope.cancel();
            }
        };

        $scope.cancel = function() {
            $scope.meal.base_price = null;
            $scope.meal.tax_rate = null;
            $scope.meal.tip_percentage = null;
        };
    }]);
