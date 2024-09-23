  // *** MATRIX TRANSFORMATIONS CALCULATOR ANGULAR CONTROLLER
  var controller = app.controller('matrixCtrl', function($scope) {
    
    $scope.trx = 0.0
    $scope.try = 0.0
    $scope.trz = 0.0
    $scope.tra = function() {
      return translation($scope.trx, $scope.try, $scope.trz).d
    }
    
    $scope.scx = 1.0
    $scope.scy = 1.0
    $scope.scz = 1.0
    $scope.sca = function() {
      return scaling($scope.scx, $scope.scy, $scope.scz).d
    }
    
    $scope.rotx = 0.0
    $scope.rotxc = function() {
      return rotation_x($scope.rotx).d
    }
    
    $scope.roty = 0.0
    $scope.rotyc = function() {
      return rotation_y($scope.roty).d
    }

    $scope.rotz = 0.0
    $scope.rotzc = function() {
      return rotation_z($scope.rotz).d
    }
    
    $scope.xy = 0.0
    $scope.xz = 0.0
    $scope.yx = 0.0
    $scope.yz = 0.0
    $scope.zx = 0.0
    $scope.zy = 0.0
    $scope.shec = function() {
      return shearing($scope.xy, $scope.xz, $scope.yx, $scope.yz, $scope.zx, $scope.zy).d
    }
    
    $scope.res = function() {
            
      return translation($scope.trx, $scope.try, $scope.trz).times_matrix(
             scaling($scope.scx, $scope.scy, $scope.scz).times_matrix(
             rotation_x($scope.rotx).times_matrix(
             rotation_y($scope.roty).times_matrix(
             rotation_z($scope.rotz).times_matrix(
             shearing($scope.xy, $scope.xz, $scope.yx, $scope.yz, $scope.zx, $scope.zy)
             ))))).d
    }
    
  })
