import angular from 'angular';

angular.module('TodoApp').controller('TodoCtrl', function ($scope) {

    $scope.name = 'Somin';

    $scope.todos = [
        {
            title: 'angular study',
            createdAt: Date.now(),
            completed: false,
            like: 2
        },
        {
            title: 'react study',
            createdAt: Date.now(),
            completed: true,
            like: 3
        },
        {
            title: 'sprintboot study',
            createdAt: Date.now(),
            completed: true,
            like: 6
        },
    ];

    $scope.remove = function (todo) {
        //find todo index in todos
        var idx = $scope.todos.findIndex(function (item) {
            return item.title === todo.title;
        })

        //remove from todos
        if (idx > -1) {
            $scope.todos.splice(idx, 1)
        }
    }

    $scope.addLike = function (todo) {

        var idx = $scope.todos.findIndex(function (item) {
            return item.title === todo.title;
        })

        if (idx > -1) {
            $scope.todos[idx].like = $scope.todos[idx].like + 1;
        }
    }


    $scope.addTodo = function (newTodoTitle) {
        //create new todo
        var newTodo = {
            title: newTodoTitle,
            completed: false,
            createdAt: Date.now(),
            like: 0
        };
        //push into todos
        $scope.todos.push(newTodo);
        //empty form //맨처음엔 return todo='';이런식으로 햇다;;;;;
        $scope.newTodoTitle = ''

    }



});