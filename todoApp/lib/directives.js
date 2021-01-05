import angular from 'angular';

angular.module('TodoApp').directive('todoTitle', function () {
    return {
        template: "<h2>❤ somin's Todo list ❤</h2>"
    }
});

angular.module('TodoApp').directive('todoItem', function () {
    return {
        templateUrl: 'todoItem.tpl.html'
    }
});
angular.module('TodoApp').directive('todoFilters', function () {
    return {
        templateUrl: 'todoFilters.tpl.html'
    }
});
angular.module('TodoApp').directive('todoForm', function () {
    return {
        templateUrl: 'todoForm.tpl.html'
    }
});