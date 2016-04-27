app.controller('NavCtrl', function($scope, $state, $ionicSideMenuDelegate) {
    $scope.SubTab = false;
    $scope.showMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.showRightMenu = function() {
        $ionicSideMenuDelegate.toggleRight();
    };
    $scope.navShow = true;

    var curentState = $state.current.name;

    if (curentState == 'catagory') {

        $scope.navShow = false;
    };
});