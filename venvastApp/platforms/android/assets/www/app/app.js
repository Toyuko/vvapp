// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

        
        if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, ionicDatePickerProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider

                  // .state('catagory', {
                  //     url: '/catagory',
                  //             templateUrl: 'app/home/catagory.html',
                  //             controller: "eventCtrl"
                  // })

    
        .state('home', {
            abstract:true,
            url: '/home',
            templateUrl: "app/home/home.html",
            //controller: 'homeCtrl'
        })
        .state('home.main', {
            url: "/main",
            views: {
                "tab-events": {
                    templateUrl: "app/home/main.html",
                    controller: 'MainCtrl'

                }
            }
        })
        .state('home.deals', {
            url: "/deals",
            views: {
                "tab-deals": {
                    templateUrl: "app/home/deals.html",
                    controller: 'DealsCtrl'

                }
            }
        })
        // .state('home.catagory', {
        //     url: "/catagory",
        //     views: {
        //         "tab-events": {
        //             templateUrl: "app/home/catagory.html",
        //             controller: 'eventCtrl'
        //         }
        //     }
        // })

        .state('calender', {
          url: '/calender',
                  templateUrl: 'app/home/calender.html',
                  controller: "CalenderCtrl"
      })

        .state('home.venues', {
            url: "/venues",
            views: {
                "tab-venues": {
                    templateUrl: "app/home/venues.html",
                  controller: "VenueCtrl"

                }
            }
        })

        .state('subCategory', {
            url: "/subCategory",
            // views: {
            //     "tab-events": {
                    templateUrl: "app/home/subCategory.html",
                  controller: "subCategoryCtrl"
                    
            //     }
            // }
        })

        .state('home.eventDetail', {
            url: "/eventDetail/:eventId",
            views: {
                "tab-events": {
                    templateUrl: "app/home/eventDetail.html",
                    controller: "EventDetailCtrl"

                }
            }
        })


    .state('app', {
        abstract:true,
        url: '/app',
        templateUrl: 'app/layout/menu-layout.html'
    });

    $urlRouterProvider.otherwise('/home/main')


    // var datePickerObj = {
    //   inputDate: new Date(),
    //   setLabel: 'Set',
    //   todayLabel: 'Today',
    //   closeLabel: 'Close',
    //   mondayFirst: false,
    //   weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    //   monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    //   templateType: 'popup',
    //   from: new Date(2012, 8, 1),
    //   to: new Date(2018, 8, 1),
    //   showTodayButton: true,
    //   dateFormat: 'dd MMMM yyyy',
    //   closeOnSelect: false,
    //   disableWeekdays: [6],
    // };
    // ionicDatePickerProvider.configDatePicker(datePickerObj);


})



.provider('ionicDatePicker', function () {

    var config = {
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),
      mondayFirst: true,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      showTodayButton: false,
      closeOnSelect: false,
      disableWeekdays: []
    };

    this.configDatePicker = function (inputObj) {
      angular.extend(config, inputObj);
    };

    this.$get = ['$rootScope', '$ionicPopup', '$ionicModal', 'IonicDatepickerService', function ($rootScope, $ionicPopup, $ionicModal, IonicDatepickerService) {

      var provider = {};

      var $scope = $rootScope.$new();
      $scope.today = resetHMSM(new Date()).getTime();
      $scope.disabledDates = [];

      //Reset the hours, minutes, seconds and milli seconds
      function resetHMSM(currentDate) {
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate;
      }

      //Previous month
      $scope.prevMonth = function () {
        if ($scope.currentDate.getMonth() === 1) {
          $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
        }
        $scope.currentDate.setMonth($scope.currentDate.getMonth() - 1);
        $scope.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.currentYear = $scope.currentDate.getFullYear();
        refreshDateList($scope.currentDate);
      };

      //Next month
      $scope.nextMonth = function () {
        if ($scope.currentDate.getMonth() === 11) {
          $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
        }
        $scope.currentDate.setDate(1);
        $scope.currentDate.setMonth($scope.currentDate.getMonth() + 1);
        $scope.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.currentYear = $scope.currentDate.getFullYear();
        refreshDateList($scope.currentDate);
      };

      //Date selected
      $scope.dateSelected = function (selectedDate) {
        if (!selectedDate || Object.keys(selectedDate).length === 0) return;
        $scope.selctedDateEpoch = selectedDate.epoch;

        if ($scope.mainObj.closeOnSelect) {
          $scope.mainObj.callback($scope.selctedDateEpoch);
          if ($scope.mainObj.templateType.toLowerCase() == 'popup') {
            $scope.popup.close();
          } else {
            closeModal();
          }
        }
      };

      //Set today as date for the modal
      $scope.setIonicDatePickerTodayDate = function () {
        var today = new Date();
        refreshDateList(new Date());
        $scope.selctedDateEpoch = resetHMSM(today).getTime();
        if ($scope.mainObj.closeOnSelect) {
          $scope.mainObj.callback($scope.selctedDateEpoch);
          closeModal();
        }
      };

      //Set date for the modal
      $scope.setIonicDatePickerDate = function () {
        $scope.mainObj.callback($scope.selctedDateEpoch);
        closeModal();
      };

      //Setting the disabled dates list.
      function setDisabledDates(mainObj) {
        if (!mainObj.disabledDates || mainObj.disabledDates.length === 0) {
          $scope.disabledDates = [];
        } else {
          $scope.disabledDates = [];
          angular.forEach(mainObj.disabledDates, function (val, key) {
            val = resetHMSM(new Date(val));
            $scope.disabledDates.push(val.getTime());
          });
        }
      }

      //Refresh the list of the dates of a month
      function refreshDateList(currentDate) {
        currentDate = resetHMSM(currentDate);
        $scope.currentDate = angular.copy(currentDate);

        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        $scope.monthsList = [];
        if ($scope.mainObj.monthsList && $scope.mainObj.monthsList.length === 12) {
          $scope.monthsList = $scope.mainObj.monthsList;
        } else {
          $scope.monthsList = IonicDatepickerService.monthsList;
        }

        $scope.yearsList = IonicDatepickerService.getYearsList($scope.mainObj.from, $scope.mainObj.to);

        $scope.dayList = [];

        var tempDate, disabled;
        $scope.firstDayEpoch = resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), firstDay)).getTime();
        $scope.lastDayEpoch = resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDay)).getTime();

        for (var i = firstDay; i <= lastDay; i++) {
          tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
          disabled = (tempDate.getTime() < $scope.fromDate) || (tempDate.getTime() > $scope.toDate) || $scope.mainObj.disableWeekdays.indexOf(tempDate.getDay()) >= 0;

          $scope.dayList.push({
            date: tempDate.getDate(),
            month: tempDate.getMonth(),
            year: tempDate.getFullYear(),
            day: tempDate.getDay(),
            epoch: tempDate.getTime(),
            disabled: disabled
          });
        }

        //To set Monday as the first day of the week.
        var firstDayMonday = $scope.dayList[0].day - $scope.mainObj.mondayFirst;
        firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;

        for (var j = 0; j < firstDayMonday; j++) {
          $scope.dayList.unshift({});
        }

        $scope.rows = [0, 7, 14, 21, 28, 35];
        $scope.cols = [0, 1, 2, 3, 4, 5, 6];

        $scope.currentMonth = $scope.mainObj.monthsList[currentDate.getMonth()];
        $scope.currentYear = currentDate.getFullYear();
        $scope.currentMonthSelected = angular.copy($scope.currentMonth);
        $scope.currentYearSelected = angular.copy($scope.currentYear);
        $scope.numColumns = 7;
      }

      //Month changed
      $scope.monthChanged = function (month) {
        var monthNumber = $scope.monthsList.indexOf(month);
        $scope.currentDate.setMonth(monthNumber);
        refreshDateList($scope.currentDate);
      };

      //Year changed
      $scope.yearChanged = function (year) {
        $scope.currentDate.setFullYear(year);
        refreshDateList($scope.currentDate);
      };

      //Setting up the initial object
      function setInitialObj(ipObj) {
        $scope.mainObj = angular.copy(ipObj);
        $scope.selctedDateEpoch = resetHMSM($scope.mainObj.inputDate).getTime();

        if ($scope.mainObj.weeksList && $scope.mainObj.weeksList.length === 7) {
          $scope.weeksList = $scope.mainObj.weeksList;
        } else {
          $scope.weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        }
        if ($scope.mainObj.mondayFirst) {
          $scope.weeksList.push($scope.mainObj.weeksList.shift());
        }
        $scope.disableWeekdays = $scope.mainObj.disableWeekdays;

        refreshDateList($scope.mainObj.inputDate);
        setDisabledDates($scope.mainObj);
      }

      $ionicModal.fromTemplateUrl('app/home/ionic-datepicker-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });

      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });

      function openModal() {
        $scope.modal.show();
      }

      function closeModal() {
        $scope.modal.hide();
      }

      $scope.closeIonicDatePickerModal = function () {
        closeModal();
      };

      //Open datepicker popup
      provider.openDatePicker = function (ipObj) {
        var buttons = [];
        $scope.mainObj = angular.extend({}, config, ipObj);
        if ($scope.mainObj.from) {
          $scope.fromDate = resetHMSM(new Date($scope.mainObj.from)).getTime();
        }
        if ($scope.mainObj.to) {
          $scope.toDate = resetHMSM(new Date($scope.mainObj.to)).getTime();
        }

        if (ipObj.disableWeekdays && config.disableWeekdays) {
          $scope.mainObj.disableWeekdays = ipObj.disableWeekdays.concat(config.disableWeekdays);
        }
        setInitialObj($scope.mainObj);

        if (!$scope.mainObj.closeOnSelect) {
          buttons = [{
            text: $scope.mainObj.setLabel,
            type: 'button_set',
            onTap: function (e) {
              $scope.mainObj.callback($scope.selctedDateEpoch);
            }
          }];
        }

        if ($scope.mainObj.showTodayButton) {
          buttons.push({
            text: $scope.mainObj.todayLabel,
            type: 'button_today',
            onTap: function (e) {
              var today = new Date();
              refreshDateList(new Date());
              $scope.selctedDateEpoch = resetHMSM(today).getTime();
              if (!$scope.mainObj.closeOnSelect) {
                e.preventDefault();
              }
            }
          });
        }

        buttons.push({
          text: $scope.mainObj.closeLabel,
          type: 'button_close',
          onTap: function (e) {
            console.log('ionic-datepicker popup closed.');
          }
        });

        if ($scope.mainObj.templateType.toLowerCase() == 'popup') {
          $scope.popup = $ionicPopup.show({
            templateUrl: 'app/home/ionic-datepicker-popup.html',
            scope: $scope,
            cssClass: 'ionic_datepicker_popup',
            buttons: buttons
          });
        } else {
          openModal();
        }
      };

      return provider;

    }];

  })


  .service('IonicDatepickerService', function () {

    this.monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    this.getYearsList = function (from, to) {
      var yearsList = [];
      var minYear = 1900;
      var maxYear = 2100;

      minYear = from ? new Date(from).getFullYear() : minYear;
      maxYear = to ? new Date(to).getFullYear() : maxYear;

      for (var i = minYear; i <= maxYear; i++) {
        yearsList.push(i);
      }

      return yearsList;
    };
  });