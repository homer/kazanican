var app = angular.module('kazanican',[])

.controller('CalculateController',function($scope){
  $scope.heading = "Kazanican";

  $scope.calculateFinishDate = function(user){
    console.log("Hello world!");
    var birthday = user.birthday;
    var today = new Date();

    var daysDifference = Math.ceil( (today - birthday) / (1000*60*60*24) );
    console.log("Years from birth in days", daysDifference);

    var notCountingYears = (user.prayingYears + user.ageOfMaturity) * 365;
    console.log("Not counting years in days", notCountingYears);

    daysDifference = (daysDifference - notCountingYears);
    console.log("Years of responsibility in days", daysDifference);

    var numPrayersMissing = daysDifference * 5;

    var numPrayersCommitPerDay = user.commitPerDay;

    var daysItTakesToFinish = numPrayersMissing / numPrayersCommitPerDay;

    var dayOfFinish = today.getTime() + (daysItTakesToFinish * 1000 * 60 * 60 * 24);
    $scope.dayOfFinish = new Date(dayOfFinish);

    $scope.yearsOfResponsibility = Math.floor( daysDifference/365 );
  }
/*

var birthDay = new Date(1983,8,27);
// Tue Sep 27 1983 00:00:00 GMT+0300 (TRST)
var today = new Date();

var daysDifference = today - birthDay
// 987003363538
var daysDifference = Math.ceil(daysDifference/(1000*60*60*24))
// 11424

var numPrayersMissing = daysDifference * 5
// 57120

var numPrayersCommitPerDay = 10

var daysItTakesToFinish = numPrayersMissing / numPrayersCommitPerDay
// 5712

var dayOfFinish = today.getTime() + daysItTakesToFinish * 1000 * 60 * 60 * 24
var dayOfFinish = new Date(dayOfFinish)
// Mon Aug 26 2030 15:36:03 GMT+0300 (EEST)

*/

})
