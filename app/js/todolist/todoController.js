(function() {
  'use strict';

  angular
    .module('todomvc')
    .controller('TodoController', TodoController);

      TodoController.$inject = ['$scope', '$location', '$filter', 'TodoStorage'];

      function TodoController($scope, $location, $filter, TodoStorage) {
      
        var vm = this;
        var todos = vm.todos = TodoStorage.get();
        var newTodo = vm.newTodo = '';
        var remainingCount = vm.remainingCount = $filter('filter')(vm.todos, {completed: false}).length;
        var editedTodo = vm.editedTodo = null;

        vm.addTodo = addTodo;
        vm.editTodo = editTodo;
        vm.doneEditing = doneEditing;
        vm.revertEditing = revertEditing;
        vm.removeTodo = removeTodo;
        vm.todoCompleted = todoCompleted;
        vm.clearCompletedTodos = clearCompletedTodos;
        vm.markAll = markAll;

        init();

        function init() {
          $scope.$watch('location.path()', function(path) {
            vm.statusFilter = {'/active': {completed: false}, '/completed': {completed: true}}[path];
          });

          $scope.$watch('remainingCount === 0', function(val){
            vm.allChecked = val;
          });  

          if($location.path() === '') {
            $location.path('/');
          }

          vm.location = $location;
        } 

        function addTodo() {
          var newTodo = vm.newTodo.trim();

          if(newTodo.length === 0) {
            return;
          }

          todos.push({
            title: newTodo,
            completed: false
          });

          TodoStorage.put(todos);

          vm.newTodo = '';
          vm.remainingCount++;
        }

        function editTodo(todo) {
          vm.editedTodo = todo;
          vm.originalTodo = angular.extend({}, todo);
        }

        function doneEditing(todo) {
          vm.editedTodo = null;
          todo.title = todo.title.trim();

          if(!todo.title) {
            vm.removeTodo(todo);
          }
          TodoStorage.put(todos);
        }

        function revertEditing(todo) {
          todos[todos.indexOf(todo)] = vm.originalTodo;
          vm.doneEditing(vm.originalTodo);
        }

        function removeTodo(todo) {
          vm.remainingCount -= todo.completed ? 0 : 1;
          todos.splice(todos.indexOf(todo), 1);
          TodoStorage.put(todos);
        }

        function todoCompleted(todo){
          vm.remainingCount +=todo.completed ? -1 : 1;
          TodoStorage.put(todos);
        }

        function clearCompletedTodos(){
          vm.todos = todos = todos.filter(function (val) {
            return !val.completed;
          });
          TodoStorage.put(todos);
        }

        function markAll(completed) {
          todos.forEach(function(todo) {
            todo.completed = !completed;
          });
          vm.remainingCount = completed ? todos.length : 0;
          TodoStorage.put(todos);
        }
      }
})();