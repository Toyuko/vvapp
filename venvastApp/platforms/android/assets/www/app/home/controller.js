app.controller('eventCtrl', function ($scope, $ionicScrollDelegate, $state, ionicDatePicker, $ionicModal) {
    $scope.pieces = ['RESTRAUNTS', 'LIFESTYLE', 'CLUBS', 'NETWORKING', 'OTHER', 'VENVAST', 'SUPERFAST'];
    $scope.eventnumber = ['X Events'];
    $scope.title = 'LIVE';

$scope.SubTab = false;

   
})
.controller('NavCtrl', function ($scope, $state,$ionicSideMenuDelegate) {
  $scope.SubTab = false;
    $scope.showMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.showRightMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
$scope.navShow = true;

    var curentState = $state.current.name

if (curentState == 'catagory') {

$scope.navShow = false;
};
})
app.controller('CalenderCtrl', function ($scope,  ionicDatePicker) {

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },
      disabledDates: [            //Optional
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
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

  
      ionicDatePicker.openDatePicker(ipObj1);



})


.controller('homeCtrl', function ($scope) {
    $scope.SubTab = false;
})

.controller('subCategoryCtrl', function ($scope, $http, $ionicLoading) {
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

})

// .controller('VenuesCtrl', function ($scope, $compile) {


// })


    .controller('MainCtrl', function($scope, $ionicLoading, $compile, VenVast, ActiveEvent,$cordovaGeolocation ,$http,$ionicModal, ionicDatePicker, $filter, $state, $timeout) {
$scope.selectedDate = $filter('date')(new Date(), 'MMM dd yyyy');



  $ionicModal.fromTemplateUrl('app/home/catagory.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {



$scope.openCalender = function () {
  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.selectedDate = $filter('date')(new Date(val), 'MMM dd yyyy');
      },
      disabledDates: [            //Optional
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
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

  
      ionicDatePicker.openDatePicker(ipObj1);

}

$scope.groups = [];
  
  $scope.groups = [
    { name: 'RESTRAUNTS', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'LIFESTYLE', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'CLUBS', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'NETWORKING', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'OTHER', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'VENVAST', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'SUPERFAST', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
  ];

  $scope.gotoSubCategory = function(){
$scope.modalCatagory.hide();
    $state.go('subCategory');

  }
  

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
        $scope.categoryList = response.data;
    });




    $scope.modalCatagory= modal;







  });

$scope.gotoCategoryModal = function () {
$scope.modalCatagory.show();
}


      $scope.SubTab = false;


              $scope.initialize = function () {
        //MAP WORK GOES HERE
        var lat;
        var lon;
        var posOptions = { timeout: 10000, enableHighAccuracy: false };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
// console.log(""+position.coords.latitude);
// console.log(position.coords.longitude);
$scope.latit = position.coords.latitude;
$scope.longit = position.coords.longitude;
        var mapOptions = {
          center: myLatlng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
    // styles:[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

        };
                var map = new google.maps.Map(document.getElementById("map"),
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
                    title: 'Current Location'
                });

                google.maps.event.addListener(marker, 'click', function () {
                    //infowindow.open(map, marker);
                    //footer trigger here
                });

                $scope.mapsf = map;
            }, function (err) {
                console.log(err);
            });
$scope.distanceLoc = [];
var tempCount = 9999999999999999999999999;
        var eventPromise = VenVast.GetAllEvents()
        eventPromise.then(function (result) {
            result.forEach(function (element, index, array) {



                var lat = element.latitude;
                var lon = element.longitude;
                var name = element.title;
                var id = element.id;
                var contentString = "<div ng-click='clickInfoWindow("+id+")'>" + name + "</div>";
                var compiled = $compile(contentString)($scope);


//distance of points
// console.log($scope.latit);
var lat1 = $scope.latit;
var lon1 = $scope.longit;
var lat2 = lat;
var lon2 = lon;

       var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
         dist = dist * 1.609344 ;

         $scope.distanceLoc.push(dist); 



      // console.log($scope.distanceLoc[i]);
      if (tempCount > $scope.distanceLoc[index]) {
tempCount = $scope.distanceLoc[index]
           $scope.nearestEventId = element.id ; 
         };


    



                var infowindow = new google.maps.InfoWindow({
                    content: compiled[0]
                });

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lon),
                    map: $scope.mapsf,
                    title: name
                });
                   $scope.eventId = -1;

                google.maps.event.addListener(marker, 'click', function () {
                   // alert(id);
                   $scope.eventId = id;
                    infowindow.open($scope.mapsf, marker);
                    ActiveEvent.lookup(id); //sets active event
                });
if ($scope.eventId == -1) {
       $scope.eventIdforSearch = $scope.nearestEventId;
}
else{
  $scope.eventIdforSearch = $scope.eventId;
}
// 
// console.log($scope.eventIdforSearch);

               $scope.clickInfoWindow = function(num)
                 {
                  console.log(num);

                  $scope.eventIdforSearch = num;
                        // alert($scope.eventId);
                        var specificEvent = VenVast.GetSpecificEvent($scope.eventIdforSearch)
                        specificEvent.then(function(result){



$scope.eventTitle = result.title;
// alert($scope.eventTitle)
// console.log(result);


    $ionicModal.fromTemplateUrl('app/home/event-InfoModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
$scope.eventDescription = result.details;
$scope.eventStartDate = result.start_date;
$scope.eventStartTime = result.start_time;
$scope.eventTitle= result.title;
        $ionicLoading.hide();

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

    $scope.modalMainEvent = modal;
  });

    $scope.showEventMainModal = function() {
   $scope.modalMainEvent.show();
  };
$scope.closeModal = function(num) {
   $scope.modalMainEvent.hide();
  };


                        })


               };



            })

         // console.log($scope.nearestEventId);

// console.log($scope.distanceLoc);
$scope.clickInfoWindow($scope.eventIdforSearch);

        })
    }

    $timeout(function() {
        $scope.initialize();
    }, 100);
      // google.maps.event.addDomListener(window, 'load', initialize);
      
      // $scope.centerOnMe = function() {
      //   if(!$scope.map) {
      //     return;
      //   }

      //   $scope.loading = $ionicLoading.show({
      //     content: 'Getting current location...',
      //     showBackdrop: false
      //   });

      //   navigator.geolocation.getCurrentPosition(function(pos) {
      //     $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      //     $scope.loading.hide();
      //   }, function(error) {
      //     alert('Unable to get location: ' + error.message);
      //   });
      // };
      
      // $scope.clickTest = function() {
      //   alert('Example of infowindow with ng-click')
      // };
      
    })



 .controller('EventDetailCtrl', function($scope, $ionicLoading, $compile, $ionicModal, $stateParams, $http, $filter) {

$scope.EventId = $stateParams.eventId;





  $ionicModal.fromTemplateUrl('app/home/catagory.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {



$scope.openCalender = function () {
  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
         $scope.selectedDate = $filter('date')(new Date(val), 'MMM dd yyyy');
      },
      disabledDates: [            //Optional
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
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

  
      ionicDatePicker.openDatePicker(ipObj1);

}

$scope.groups = [];
  
  $scope.groups = [
    { name: 'RESTRAUNTS', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'LIFESTYLE', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'CLUBS', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'NETWORKING', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'OTHER', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'VENVAST', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
    { name: 'SUPERFAST', id: 1, items: [{ subName: 'SubGrup1', subId: '1-1' }, { subName: 'SubGrup1', subId: '1-2' }]},
  ];

  $scope.gotoSubCategory = function(){
$scope.modalCatagory.hide();
    $state.go('subCategory');

  }
  

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
        $scope.categoryList = response.data;
    });




    $scope.modalCatagory= modal;







  });

$scope.gotoCategoryModal = function () {
$scope.modalCatagory.show();
}



    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
    $http.get("http://venvast.com/event/"+$scope.EventId+"")
    .then(function(response) {
        $scope.eventSingleData = response.data;
        // alert(JSON.stringify($scope.eventSingleData.longitude))
       var longi = JSON.stringify($scope.eventSingleData.longitude);
var lati =  JSON.stringify($scope.eventSingleData.latitude);
    
        $scope.eventTitle= $scope.eventSingleData.title;

      // function initialize() {
        // alert(longi);
        // alert();
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
          infowindow.open(map,marker);
        });

        $scope.map = map;
        $ionicLoading.hide();



      //Information Modal Work Goes here
        $ionicModal.fromTemplateUrl('app/home/level-InfoModal.html', {
    id:'1',
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
    id:'2',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
$scope.eventDescription = $scope.eventSingleData.details;
$scope.eventStartDate = $scope.eventSingleData.start_date;
$scope.eventStartTime = $scope.eventSingleData.start_time;
$scope.eventTitle= $scope.eventSingleData.title;

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


    })


 .controller('DealsCtrl', function($scope, $ionicLoading, $ionicModal) {
 
  $ionicModal.fromTemplateUrl('app/home/calendarScreen.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
$scope.calendarScreenModal = modal;
  })

$scope.openCalenderScreen = function(){
$scope.calendarScreenModal.show();
}




 })


.controller('VenueCtrl', function ($scope, $ionicLoading, $compile, $ionicModal, ionicDatePicker, $filter, $state, $timeout, VenVast, $cordovaGeolocation, ActiveEvent) {
    $scope.selectedDate = $filter('date')(new Date(), 'MMM dd yyyy');
    $ionicModal.fromTemplateUrl('app/home/catagory.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.openCalender = function () {
            var ipObj1 = {
                callback: function (val) {  //Mandatory
                    console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                    $scope.selectedDate = $filter('date')(new Date(val), 'MMM dd yyyy');
                },
                disabledDates: [            //Optional
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
                inputDate: new Date(),      //Optional
                mondayFirst: true,          //Optional
                disableWeekdays: [0],       //Optional
                closeOnSelect: false,       //Optional
                templateType: 'popup'       //Optional
            };
            ionicDatePicker.openDatePicker(ipObj1);
        }


        $scope.groups = [
            { name: 'Loading...' }
        ];

        var dataPromise = VenVast.GetAllCategories();
        dataPromise.then(function (result) {
            
        $scope.groups = result;
         
        });

        $scope.gotoSubCategory = function () {
            $scope.modalCatagory.hide();
            $state.go('subCategory');
        }

        //Accordion Event Detail


        /*
            * if given group is the selected group, deselect it
            * else, select the given group
            */
        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };



        $scope.modalCatagory = modal;
    });

    $scope.gotoCategoryModal = function () {
        $scope.modalCatagory.show();
    }


    $scope.SubTab = false;
    $scope.initialize = function () {
        //MAP WORK GOES HERE
        var lat;
        var lon;
        var posOptions = { timeout: 10000, enableHighAccuracy: false };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                // position.coords.latitude, position.coords.longitude
// 13.7207510, 100.5859120
$scope.latit = position.coords.latitude;
$scope.longit = position.coords.longitude;
        var mapOptions = {
          center: myLatlng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          
    // styles:[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

        };
                var map = new google.maps.Map(document.getElementById("map"),
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

                google.maps.event.addListener(marker, 'click', function () {
                    //infowindow.open(map, marker);
                    //footer trigger here
                });

                $scope.mapsf = map;
            }, function (err) {
                console.log('failed');
            });
$scope.distanceLoc = [];
var tempCount = 99999999999999999999999999;
        var eventPromise = VenVast.GetAllVenues()
        eventPromise.then(function (result) {
            result.forEach(function (element, index, array) {
                var lat = element.latitude;
                var lon = element.longitude;
                var name = element.name;
                var id = element.id;
                var contentString = "<div ng-click='clickVenueInfoWindow("+id+")'>" + name + "</div>";;

                // "<div ng-click='clickInfoWindow("+id+")'>" + name + "</div>";

                var compiled = $compile(contentString)($scope);

                var infowindow = new google.maps.InfoWindow({
                    content: compiled[0]
                });

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lon),
                    map: $scope.mapsf,
                    title: name
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open($scope.mapsf, marker);
                    
                });

var lat1 = $scope.latit;
var lon1 = $scope.longit;
var lat2 = lat;
var lon2 = lon;

       var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
         dist = dist * 1.609344 ;

         $scope.distanceLoc.push(dist); 



      // console.log($scope.distanceLoc[i]);
      if (tempCount > $scope.distanceLoc[index]) {
tempCount = $scope.distanceLoc[index]
           $scope.nearestEventId = element.id ; 
         };
if ($scope.eventId == -1) {
       $scope.eventIdforSearch = $scope.nearestEventId;
}
else{
  $scope.eventIdforSearch = $scope.eventId;
}




               $scope.clickVenueInfoWindow = function(num)
                 {

                  $scope.eventIdforSearch = num;
                        // alert($scope.eventId);
                        var specificEvent = VenVast.GetSpecificVenue($scope.eventIdforSearch)
                        specificEvent.then(function(result){



$scope.eventTitle = result.title;
// alert($scope.eventTitle)
// console.log(result);


    $ionicModal.fromTemplateUrl('app/home/event-InfoModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
$scope.eventDescription = result.details;
$scope.eventStartDate = result.start_date;
$scope.eventStartTime = result.start_time;
$scope.eventTitle= result.title;
        $ionicLoading.hide();

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

    $scope.modalMainEvent = modal;
  });

    $scope.showEventMainModal = function() {
   $scope.modalMainEvent.show();
  };
$scope.closeModal = function(num) {
   $scope.modalMainEvent.hide();
  };


                        })


               };



            })

$scope.clickVenueInfoWindow($scope.eventIdforSearch);
        })
    }

    $timeout(function () {
        $scope.initialize();
    }, 100);



})