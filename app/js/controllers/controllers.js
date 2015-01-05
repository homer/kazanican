app.controller('DashboardController',function($rootScope, $scope, $firebaseAuth, FIRE_URL, currentAuth, $location){

  $scope.signout = function(){
    var ref = new Firebase(FIRE_URL);
    $scope.authObj = $firebaseAuth(ref);

    $scope.authObj.$unauth();
    $rootScope.currentUser = null;
    $location.path('/giris');
  }
})

.controller('RegisterController',function($rootScope, $scope, $firebase, $firebaseAuth, FIRE_URL, $location){
  $scope.register = function(user){
    var ref = new Firebase(FIRE_URL);
    $scope.authObj = $firebaseAuth(ref);

    $scope.authObj.$createUser(user.email, user.password).then(function() {

      return $scope.authObj.$authWithPassword({
        email: user.email,
        password: user.password
      });

    }).then(function(authData) {

      var ref = new Firebase(FIRE_URL + "users");
      var firebaseUsers = $firebase(ref);

      var userInfo = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        date: Firebase.ServerValue.TIMESTAMP
      };

      firebaseUsers.$set(authData.uid, userInfo);
      $rootScope.currentUser = authData;
      $location.path('/genel');

    }).catch(function(error) {
      console.error("Error: ", error);
    });

  };
})

.controller('LoginController',function($rootScope, $scope, $firebase, $firebaseAuth, FIRE_URL, $location){
  var ref = new Firebase(FIRE_URL);
  $scope.authObj = $firebaseAuth(ref);

  $scope.loginUser = function(userObj){
    $scope.authObj.$authWithPassword({
      email: userObj.email,
      password: userObj.password
    }).then(function(authData) {
      $rootScope.currentUser = authData;
      $location.path('/genel');
    }).catch(function(error) {
      console.error("Giris hatasi:", error);
    });
  };
})

.controller('CalculateController',function($rootScope, $scope, $firebase, FIRE_URL, $location){

  var daysItTakesToFinish, birthday, today, ageOfMaturity;

  $scope.calculateFinishDate = function(user){
    birthday = user.birthday;
    today = new Date();

    var daysDifference = Math.ceil( (today - birthday) / (1000*60*60*24) );
    // console.log("Years from birth in days", daysDifference);

    ageOfMaturity = user.ageOfMaturity;
    var notCountingYears = (user.prayingYears + ageOfMaturity) * 365;
    // console.log("Not counting years in days", notCountingYears);

    daysDifference = (daysDifference - notCountingYears);
    // console.log("Years of responsibility in days", daysDifference);

    var numPrayersMissing = daysDifference * 5;

    var numPrayersCommitPerDay = user.commitPerDay;

    daysItTakesToFinish = numPrayersMissing / numPrayersCommitPerDay;

    var dayOfFinish = today.getTime() + (daysItTakesToFinish * 1000 * 60 * 60 * 24);
    $scope.dayOfFinish = new Date(dayOfFinish);

    $scope.yearsOfResponsibility = Math.floor( daysDifference/365 );
  };

  $scope.makeCommit = function(){
    if($rootScope.currentUser) {
      var userRef = new Firebase(FIRE_URL + "users/" + $rootScope.currentUser.uid);
      userSync = $firebase(userRef);

      userSync.$update({
        birthday: birthday,
        age_of_maturity: ageOfMaturity,
        days_of_commit: daysItTakesToFinish,
        commit_start_date: today,
        commit_1: 0,
        commit_2: 0,
        commit_3: 0,
        commit_4: 0,
        commit_5: 0,
        commit_6: 0 
      });
      $location.path('/genel');
    } else {
      $location.path('/genel');
    }


    
  }
})
