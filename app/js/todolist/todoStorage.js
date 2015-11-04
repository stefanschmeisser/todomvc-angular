(function() {
  'use strict';

  angular
    .module('todomvc')
    .factory('TodoStorage', TodoStorage);

    function TodoStorage() {
      var vm = this;
      var STORAGE_ID = 'todos-angularjs-perf';
      
      var get = function(){
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      };

      var put = function(todos) {
        console.log("in TodoStorage::put");
        localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
      };
      
      
      return {
        get: get,
        put: put
      };
      
    }
})();
