app.controller('subCategoryCtrl', function($scope, $http, $ionicLoading) {
    // alert("subCategoryCtrl");
    $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
    });
    $http.get("http://venvast.com/event")
        .then(function(response) {
            $scope.EventsData = response.data;
            $ionicLoading.hide();
            // alert(JSON.stringify($scope.EventsData))
        });

});