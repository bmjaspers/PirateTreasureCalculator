angular.module('pirates')
    .factory('$localStorage', LocalStorageService);
    
LocalStorageService.$inject = ['$window'];

// This is shamelessly taken from http://learn.ionicframework.com/formulas/localstorage/
// Just reformatted to fit my style
function LocalStorageService($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}