var app = angular.module('kazanican',['ngRoute','firebase'])

.constant("FIRE_URL","https://kazanican.firebaseio.com/")

.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/hesapla");
    }
  });
}])

.config(function($routeProvider){
  $routeProvider
    .when('/giris',{
      controller:'LoginController',
      templateUrl:'app/templates/login.html'
    })
    .when('/kayit',{
      controller:'RegisterController',
      templateUrl:'app/templates/register.html'
    })
    .when('/hesapla',{
      controller:'CalculateController',
      templateUrl:'app/templates/calculate.html'
    })
    .when('/genel',{
      controller:'DashboardController',
      templateUrl:'app/templates/dashboard.html',
      resolve: {
        "currentAuth": ["$firebaseAuth", "FIRE_URL", function($firebaseAuth, FIRE_URL) {
          var ref = new Firebase(FIRE_URL);
          var authObj = $firebaseAuth(ref);
          return authObj.$requireAuth();
        }]
      }
    })
    .otherwise({ redirectTo: '/hesapla' });
})