app.controller('EventDetailCtrl', function($scope, $ionicLoading, $compile, $ionicModal, $stateParams, $http, $filter) {

    $scope.EventId = $stateParams.eventId;

    $ionicModal.fromTemplateUrl('app/home/catagory.html', {
        scope: $scope,
        animation: 'slide-in-down'
    }).then(function(modal) {



        $scope.openCalender = function() {
            var ipObj1 = {
                callback: function(val) { //Mandatory
                    console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                    $scope.selectedDate = $filter('date')(new Date(val), 'MMM dd yyyy');
                },
                disabledDates: [ //Optional
                    new Date(2016, 2, 16),
                    new Date(2015, 3, 16),
                    new Date(2015, 4, 16),
                    new Date(2015, 5, 16),
                    new Date('Wednesday, August 12, 2015'),
                    new Date("08-16-2016"),
                    new Date(1439676000000)
                ],
                from: new Date(2012, 1, 1), //Optional
                to: new Date(2016, 10, 30), //Optional
                inputDate: new Date(), //Optional
                mondayFirst: true, //Optional
                disableWeekdays: [0], //Optional
                closeOnSelect: false, //Optional
                templateType: 'popup' //Optional
            };


            ionicDatePicker.openDatePicker(ipObj1);

        }

        $scope.groups = [];

        // $scope.groups = [
        //     { name: 'RESTRAUNTS', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }] },
        //     { name: 'LIFESTYLE', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }] },
        //     { name: 'CLUBS', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }] },
        //     { name: 'NETWORKING', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }] },
        //     { name: 'OTHER', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }] },
        //     { name: 'VENVAST', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }] },
        //     { name: 'SUPERFAST', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }] },
        // ];

        $scope.gotoSubCategory = function() {
            $scope.modalCatagory.hide();
            $state.go('home.subcategory');
        };


        //Accordion Event Detail

        $scope.toggleGroup = function(group) {
            // alert(group);
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };




        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner><p>Loading nearest events</p>'
        });
        $http.get("http://venvast.com/category")
            .then(function(response) {
                $scope.groups = response.data;
            });




        $scope.modalCatagory = modal;







    });

    $scope.gotoCategoryModal = function() {
        $scope.modalCatagory.show();
    }



    $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
    });
    $http.get("http://venvast.com/event/" + $scope.EventId + "")
        .then(function(response) {
            $scope.eventSingleData = response.data;
            var longi = JSON.stringify($scope.eventSingleData.longitude);
            var lati = JSON.stringify($scope.eventSingleData.latitude);

            $scope.eventTitle = $scope.eventSingleData.title;
            $scope.eventVenueId = $scope.eventSingleData.venue_id;
// alert($scope.eventVenueId);

    $http.get("http://venvast.com/venue/"+$scope.eventVenueId+"")
        .then(function(response) {
// alert(JSON.stringify(response.data.name) );

$scope.venueName = response.data.name;

        })

            var myLatlng = new google.maps.LatLng(lati, longi);

            var mapOptions = {
                center: myLatlng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,

                // styles:[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

            };
            var map = new google.maps.Map(document.getElementById("mapEvent"),
                mapOptions);

            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Uluru (Ayers Rock)'
            });

            google.maps.event.addListener(marker, 'click', function() {
                console.log(marker);
                infowindow.open(map, marker);
            });

            $scope.map = map;
            $ionicLoading.hide();

            //Information Modal Work Goes here
            $ionicModal.fromTemplateUrl('app/home/level-InfoModal.html', {
                id: '1',
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {

                // $scope.levelDescription = $scope.eventSingleData.details;
                // $scope.levelDescription = 
                // $scope.levelDescription = 

                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner>'
                });
                $http.get("http://venvast.com/venue")
                    .then(function(response) {
                        $scope.VenueData = response.data;
                        $scope.VenueTitle = $scope.VenueData.name;
                        $scope.VenueDescription = $scope.VenueData.description;
                        $scope.VenueLocation = $scope.VenueData.street;
                        // alert(JSON.stringify($scope.categoryList))
                        $ionicLoading.hide();

                        $scope.modalLevel = modal;
                    })
            })


            $ionicModal.fromTemplateUrl('app/home/event-InfoModal.html', {
                id: '2',
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.eventDescription = $scope.eventSingleData.details;
                $scope.eventStartDate = $scope.eventSingleData.start_date;
                $scope.eventStartTime = $scope.eventSingleData.start_time;
                $scope.eventTitle = $scope.eventSingleData.title;

                // $scope.eventStartTime = $filter('date')(new Date($scope.eventSingleData.start_time), 'hh:mm');

                // var hoursLeft = Math.floor( $('.totalMin').html() / 60);

                // $scope.eventStartTime = $scope.eventSingleData.start_time;

                $scope.toggleEvent = function(group) {
                    if ($scope.isGroupShown(group)) {
                        $scope.shownGroup = null;
                    } else {
                        $scope.shownGroup = group;
                    }
                };
                $scope.isGroupShown = function(group) {
                    return $scope.shownGroup === group;
                };

                $scope.modalEvent = modal;
            });



            $scope.openModal = function(index) {
                if (index == 1) $scope.modalLevel.show();
                else $scope.modalEvent.show();
            };

            $scope.closeModal = function(index) {
                if (index == 1) $scope.modalLevel.hide();
                else $scope.modalEvent.hide();
            };


        }); //Get request is closing here


});