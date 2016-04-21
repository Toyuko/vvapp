app.factory('VenVast', function ($http) {
    var baseAdress = "http://venvast.com/";

    var _getAllEvents = function () {
        var url = baseAdress + "event";
        return $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            return null;
        });
    }

    var _getSpecificEvent = function (eventId) {
        var url = baseAdress + "event/" + eventId;

        return $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback() {
            return null;
        });
    }


    var _getAllVenues = function () {
        var url = baseAdress + "venue";
        return $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            return null;
        });
    }

    var _getSpecificVenue = function (venueId) {
        var url = baseAdress + "event/" + venueId;

        return $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback() {
            return null;
        });
    }

    var _getAllCategories = function () {
        var url = baseAdress + "category";
        return $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            return response.status;
        });
    }

    var _getSpecificCategory = function (categoryId) {
        var url = baseAdress + "category/" + venueId;

        return $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback() {
            return null;
        });
    }

    var _getAllLocations = function () {
        var url = baseAdress + "location";
        return $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            return null;
        });
    }

    var _getSpecificLocation = function (locationId) {
        var url = baseAdress + "location/" + venueId;

        return $http({
            method: "GET",
            url: url
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            return response.status;
        });
    }

    return {
        GetAllEvents: _getAllEvents,
        GetSpecificEvent: _getSpecificEvent,
        GetAllVenues: _getAllVenues,
        GetSpecificVenue: _getSpecificVenue,
        GetAllCategories: _getAllCategories,
        GetSpecificCategory: _getSpecificCategory,
        GetAllLocations: _getAllLocations,
        GetSpecificLoaction: _getSpecificLocation
    }
})

.factory('ActiveEvent', function(VenVast){
    var activeEvent = null;

    var _getActiveEvent = function () {
        return activeEvent;
    }

    var _setActiveEvent = function (_activeEvent) {
        activeEvent = _activeEvent;
    }

    var _lookup = function (id) {
        var dataPromise = VenVast.GetSpecificEvent(id);
        dataPromise.then(function (response) {
            activeEvent = response;
        });
    }

    return {
        get: _getActiveEvent,
        set: _setActiveEvent,
        lookup:_lookup
    };

})