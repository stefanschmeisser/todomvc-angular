(function() {
  'use strict';

  angular
    .module('todomvc')
    .factory('todoStorage', todoStorage);

    function todoStorage() {
      var vm = this;
      var STORAGE_ID = 'todos-angularjs-perf';


      function getTodos(){
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      }

      function putTodos(todos) {
          localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
      }

      return {
        getTodos : getTodos,
        putTodos : putTodos
      };
      /*
      return {
        get: function () {
          return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        },

        put: function (todos) {
          localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
        }
      }
      */
    }
})();
