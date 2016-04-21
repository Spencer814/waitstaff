var waitAppModule = angular.module('waitAppModule', [
  'ngMessages'
]);

var app = angular.module('waitApp', []);
app.controller('waitCtrl', function($scope) {

  $scope.counter = 0;
  $scope.tips = 0;
  $scope.values = function(meal) {
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

  // $scope.hide = false;

  $scope.reset = function() {
      // $scope.hide = false;
      // $scope.submitted = false;
      // $scope.info = {};
      $scope.waitForm.$setPristine();
  };

  $scope.resetAll = function() {
    $scope.reset();
    $scope.counter = 0;
    $scope.subtotal = null;
    $scope.gratuity = null;
    $scope.total = null;
    $scope.tiptotal = null;
    $scope.average = null;
  };
});
