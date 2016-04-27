app.controller('DealsCtrl', function($scope, $ionicLoading, $ionicModal) {

    $ionicModal.fromTemplateUrl('app/home/calendarScreen.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.calendarScreenModal = modal;
    })

    $scope.openCalenderScreen = function() {
        $scope.calendarScreenModal.show();
    }




});
