angular.module('waitstaffCalc', [])
.controller('calculationCtrl', function($scope, $attrs) {
  $scope.numberLimit = $attrs.initialNumberLimit || 10;

  $scope.numbers = function() {
    var numbers = [];
    for(var i=0; i<$scope.numberLimit; i++) {
      numbers[i] = i + 1;
    }
    return numbers;
  };

  $scope.compute = function(a,b) {
    return a * b;
  };

  $scope.generate = function() {
      if ($scope.myForm.$submitted && $scope.myForm.$valid && !($scope.myForm.$pristine)) {
          $scope.hide = true;
          return true;
      }
  };

  $scope.hide = false;

  $scope.reset = function() {
      $scope.hide = false;
      $scope.submitted = false;
      $scope.info = {};
      $scope.myForm.$setPristine();
  };
});
