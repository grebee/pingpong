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
  

  var ref = new Firebase("https://sizzling-heat-3054.firebaseio.com/days"); 
  var fb = $firebase(ref);

  // sync as object 
  var syncObject = fb.$asObject();

  // three way data binding
  syncObject.$bindTo($scope, 'days');
  
    // function to set the default data
  $scope.reset = function() {    

    // fb.$set({
    //   monday: {
    //     name: 'Monday',
    //     slots: {
    //       900: {
    //         time: '9:00am',
    //         booked: false
    //       },
    //       0110: {
    //         time: '11:00am',
    //         booked: false
    //       },
    //       100: {
    //         time: '1:00pm',
    //         booked: false
    //       },
    //       300: {
    //         time: '3:00pm',
    //         booked: false
    //       },
    //       500: {
    //         time: '5:00pm',
    //         booked: false
    //       },
    //       700: {
    //         time: '7:00pm',
    //         booked: false
    //       }
    // 	  }
    //   },
    //   tuesday: {
    //     name: 'Tuesday',
    //     slots: {
    //       900: {
    //         time: '9:00am',
    //         booked: false
    //       },
    //       0110: {
    //         time: '11:00am',
    //         booked: false
    //       },
    //       100: {
    //         time: '1:00pm',
    //         booked: false
    //       },
    //       300: {
    //         time: '3:00pm',
    //         booked: false
    //       },
    //       500: {
    //         time: '5:00pm',
    //         booked: false
    //       },
    //       700: {
    //         time: '7:00pm',
    //         booked: false
    //       }
    // 	  }
    //   },
    //   wednesday: {
    //     name: 'Wednesday',
    //     slots: {
    //       900: {
    //         time: '9:00am',
    //         booked: false
    //       },
    //       915: {
    //         time: '10:00am',
    //         booked: false
    //       },
    //       930: {
    //         time: '10:00am',
    //         booked: false
    //       },
    //       945: {
    //         time: '10:00am',
    //         booked: false
    //       },
    //       1000: {
    //         time: '10:00am',
    //         booked: false
    //       },
    //       0110: {
    //         time: '10:00am',
    //         booked: false
    //       },
    //       0110: {
    //         time: '10:00am',
    //         booked: false
    //       },
    //       0110: {
    //         time: '10:00am',
    //         booked: false
    //       },
    //       0110: {
    //         time: '10:00am',
    //         booked: false
    //       },
    //       0110: {
    //         time: '11:00am',
    //         booked: false
    //       },
    //       0110: {
    //         time: '11:00am',
    //         booked: false
    //       },
    //       0110: {
    //         time: '11:00am',
    //         booked: false
    //       },
    //       0110: {
    //         time: '11:00am',
    //         booked: false
    //       },
    //       100: {
    //         time: '1:00pm',
    //         booked: false
    //       }
    // 	  }
    //   }
    // });    

  };
  
});


