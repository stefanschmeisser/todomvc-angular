(function() {
  'use strict';

  angular
    .module('todomvc')
    .controller('TodoController', TodoController);

      TodoController.$inject = ['$location', '$filter', 'todoStorage'];

      function TodoController($location, $filter, todoStorage) {
      
        var vm = this;
        var todos = vm.todos = todoStorage.getTodos();

        if($location.path() === '') {
          $location.path('/');
        }

        vm.location = $location;

        $scope.$watch('location.path()', function(path) {
          vm.statusFilter = {'/active': {completed: false}, '/completed': {completed: true}}[path];
        });

        $scope.$watch('remainingCount === 0', function(val){
          vm.allChecked = val;
        });


        function addTodo() {
          var newTodo = vm.newTodo.trim();
          
          if(newTodo.length === 0) {
            return;
          }

          todos.push({
            title: newTodo,
            completed: false
          });

          todoStorage.putTodos(todos);

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
          todoStorage.putTodos(todos);
        }

        function revertEditing(todo) {
          todos[todos.indexOf(todo)] = vm.originalTodo;
          vm.doneEditing(vm.originalTodo);
        }

        function removeTodo(todo) {
          vm.remainingCount -= todo.completed ? 0 : 1;
          todos.splice(todos.indexOf(todo), 1);
          todoStorage.putTodos(todos);
        }

        function todoCompleted(todo){
          vm.remainingCount +=todo.completed ? -1 : 1;
          todoStorage.putTodos(todos);
        }

        function clearCompletedTodos(){
          vm.todos = todos = todos.filter(function (val) {
            return !val.completed;
          });
          todoStorage.putTodos(todos);
        }

        function markAll(completed) {
          todos.forEach(function(todo) {
            todo.completed = !completed;
          });
          vm.remainingCount = completed ? todos.length : 0;
          todoStorage.putTodos(todos);
        }
      }
})();