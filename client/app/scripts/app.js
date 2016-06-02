//Logged in
function checkRestricted (UserService, $q, $location) {
  var deferred = $q.defer();
  if (UserService.getToken()) {
      deferred.resolve();
  } else {
      deferred.reject();
      $location.url('/');
  }
  return deferred.promise;
}

function checkedLoggedIn (UserService, $q, $location) {
  var deferred = $q.defer();
  if (!UserService.getToken()) {
      deferred.resolve();
  } else {
      deferred.reject();
      $location.url('/tasks');
  }
  return deferred.promise;
}

//Bootstrapping the app
angular.module('TasksApp', ['ngMaterial','LocalStorageModule','ngRoute', 'ngMessages'])
//Startup
.run(['$interval', 'ToastDisplay', 'NumberService', function ($interval, ToastDisplay, NumberService) {
  $interval(function () {
    console.log('Getting number??');
    NumberService.get()
      .then(function (data) {
        console.log('Got %s', data);
        ToastDisplay.showToast(data.number);
      });
  }, 1000);
}])
//Routes
.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/',
      {
        templateUrl:'views/login.html',
        resolve: {
          'loggedIn': ['UserService', '$q', '$location', checkedLoggedIn]
        }
      }
    )
    .when('/signup',
      {
        templateUrl:'views/signup.html',
        resolve: {
          'loggedIn': ['UserService', '$q', '$location', checkedLoggedIn]
        }
      }
    )
    .when('/tasks',
      {
        templateUrl:'views/tasks.html',
        controller: 'TasksCtrl as tc',
        resolve: {
          'loggedIn': ['UserService', '$q', '$location', checkRestricted]
        }
      }
    )
    .otherwise({redirectTo:'/'});

}])

//Themes
.config(['$mdThemingProvider',function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue-grey')
  .accentPalette('light-green')
  .backgroundPalette('blue-grey');
  // .dark();
}]);
