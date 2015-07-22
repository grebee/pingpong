angular.module('scheduleApp', ['firebase'])

.controller('mainController', function($scope, $firebase) {

    // get # of real time users
    var listRef = new Firebase("https://sizzling-heat-3054.firebaseio.com/presence/");
    var userRef = listRef.push();

    // Add ourselves to presence list when online.
    var presenceRef = new Firebase("https://sizzling-heat-3054.firebaseio.com/.info/connected");
    presenceRef.on("value", function(snap) {
        if (snap.val()) {
            userRef.set(true);
            // Remove ourselves when we disconnect.
            userRef.onDisconnect().remove();
        }
    });

    listRef.on("value", function(snap) {
        $scope.online = snap.numChildren();
    });
    var syncObject;
    $scope.setBinding = function(str) {
        syncObject.$bindTo.unbind();
        
        switch(str) {
            case "pingpong":
                setPingPong();
                break;
            case "pingpongcafeteria":
                setPingPongCafeteria();
                break;
            case "fusbol":
                setFusbol();
                break;
            default:
        }
    }

    function setFusbol () {
        var refFusbol = new Firebase("https://sizzling-heat-3054.firebaseio.com/fusbol");
        var slotsFusbol = $firebase(refFusbol);
        syncObject = slotsFusbol.$asObject();
        syncObject.$bindTo($scope, 'fusbol');
    }    

    function setPingPong () {
        var refPP = new Firebase("https://sizzling-heat-3054.firebaseio.com/pingpong");
        var slotsPingPong = $firebase(refPP);
        syncObject = slotsPingPong.$asObject();
        syncObject.$bindTo($scope, 'pingpong');
    }

    function setPingPongCafeteria () {
        var refPPC = new Firebase("https://sizzling-heat-3054.firebaseio.com/pingpongcafeteria");
        var slotsPingPongCafeteria = $firebase(refPPC);
        syncObject = slotsPingPongCafeteria.$asObject();
        syncObject.$bindTo($scope, 'pingpongcafeteria');
    }

    //set the Today variable 
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    $scope.today = weekday[d.getDay()];

    setFusbol();

    // function to set the default data
    // $scope.reset = function() {
    //     slots.$set({
    //         "day": {
    //             "slots": {
    //                 "900": {
    //                     "time": "9:00am",
    //                     "booked": false
    //                 },
    //                 "915": {
    //                     "time": "9:15am",
    //                     "booked": false
    //                 },
    //                 "930": {
    //                     "time": "9:30am",
    //                     "booked": false
    //                 },
    //                 "945": {
    //                     "time": "9:45am",
    //                     "booked": false
    //                 },
    //                 "1000": {
    //                     "time": "10:00am",
    //                     "booked": false
    //                 },
    //                 "1015": {
    //                     "time": "10:15am",
    //                     "booked": false
    //                 },
    //                 "1030": {
    //                     "time": "10:30am",
    //                     "booked": false
    //                 },
    //                 "1045": {
    //                     "time": "10:45am",
    //                     "booked": false
    //                 },
    //                 "1100": {
    //                     "time": "11:00am",
    //                     "booked": false
    //                 },
    //                 "1115": {
    //                     "time": "11:15am",
    //                     "booked": false
    //                 },
    //                 "1130": {
    //                     "time": "11:30am",
    //                     "booked": false
    //                 },
    //                 "1145": {
    //                     "time": "11:45am",
    //                     "booked": false
    //                 },
    //                 "1200": {
    //                     "time": "12:00pm",
    //                     "booked": false
    //                 },
    //                 "1215": {
    //                     "time": "12:15pm",
    //                     "booked": false
    //                 },
    //                 "1230": {
    //                     "time": "12:30pm",
    //                     "booked": false
    //                 },
    //                 "1245": {
    //                     "time": "12:45pm",
    //                     "booked": false
    //                 },
    //                 "1300": {
    //                     "time": "1:00pm",
    //                     "booked": false
    //                 },
    //                 "1315": {
    //                     "time": "1:15pm",
    //                     "booked": false
    //                 },
    //                 "1330": {
    //                     "time": "1:30pm",
    //                     "booked": false
    //                 },
    //                 "1345": {
    //                     "time": "1:45pm",
    //                     "booked": false
    //                 },
    //                 "1400": {
    //                     "time": "2:00pm",
    //                     "booked": false
    //                 },
    //                 "1415": {
    //                     "time": "2:15pm",
    //                     "booked": false
    //                 },
    //                 "1430": {
    //                     "time": "2:30pm",
    //                     "booked": false
    //                 },
    //                 "1445": {
    //                     "time": "2:45pm",
    //                     "booked": false
    //                 },
    //                 "1500": {
    //                     "time": "3:00pm",
    //                     "booked": false
    //                 },
    //                 "1515": {
    //                     "time": "3:15pm",
    //                     "booked": false
    //                 },
    //                 "1530": {
    //                     "time": "3:30pm",
    //                     "booked": false
    //                 },
    //                 "1545": {
    //                     "time": "3:45pm",
    //                     "booked": false
    //                 },
    //                 "1600": {
    //                     "time": "4:00pm",
    //                     "booked": false
    //                 },
    //                 "1615": {
    //                     "time": "4:15pm",
    //                     "booked": false
    //                 },
    //                 "1630": {
    //                     "time": "4:30pm",
    //                     "booked": false
    //                 },
    //                 "1645": {
    //                     "time": "4:45pm",
    //                     "booked": false
    //                 }
    //             }
    //         }
    //     });

    // };

});