import angular from 'angular';
//서비스는 오직 데이터만 건드릴때 사용하는 부분이다. 
angular.module('TodoApp').factory('todoStorage', function () {

    var TODO_DATA = 'TODO_DATA';

    var storage = {

        //todo logic..
        todos: [
            //빈배열
            // {
            //   title:'angular study', 
            //   createdAt: Date.now(),
            //   completed: false,
            //   like : 2
            // },
            // {
            //   title:'react study', 
            //   createdAt: Date.now(),
            //   completed: true, 
            //   like : 3
            // },
            // {
            //   title:'sprintboot study', 
            //   createdAt: Date.now(),
            //   completed: true, 
            //   like : 6
            // },
        ],
        //_로 시작하는 함수들은 감추는 함수이다. 외부사용 X, 파일 내에서만 사용한다.
        //_가 붙어있지 않은 함수는 외부에서 사용할수있는 함수라는 뜻
        _saveToLocalStorage: function (data) {
            //localStorage는 모든 데이터를 String으로 받는다.
            //하지만 우리의 데이터는 객체로 이루어진 배열이다. 그렇기때문에 Json.stringiFy()메서드로 문자열화 해야한다. 
            localStorage.setItem(TODO_DATA, JSON.stringify(data))
        },
        _getFromLocalStorage: function () {

            return JSON.parse(localStorage.getItem(TODO_DATA)) || [];

            //localStorage에 저장된 데이터가 문자열형식으로return 반환되기때문에 JSON 형태로 바꿔준다.
        },

        get: function () {
            // storage.todos=storage._getFromLoalStorage();
            //^이것보다는 앵귤러의 copy()라는 함수를 써서 로컬스토리지에서 가져온 데이터를 todos변수에 카피하는 로직을 사용하는 것이 좋다.
            //왜냐하면 앵귤러에서는 뷰와 연결된 데이터를 자동으로 refresh 해주는 기능이있는데, 그것을 [다이제스트 사이클]이라한다. 
            //이싸이클에 맞게 작성을 하려면 앵귤러에서 제공하는 함수를 쓰는게 좋다. 
            //데이터를 객체나 배열을 복사할때에는 단순히 할당문을 사용하는 것이아니라. 
            //angular의 copy기능을 쓰는게 좋다. 
            angular.copy(storage._getFromLocalStorage(), storage.todos)
            return storage.todos;
        },
        remove: function (todo) {
            var idx = storage.todos.findIndex(function (item) {
                return item.title === todo.title;
            })
            //remove from todos
            if (idx > -1) {
                storage.todos.splice(idx, 1)
                storage._saveToLocalStorage(storage.todos);
            }
        },
        addLike: function (todo) {
            var idx = storage.todos.findIndex(function (item) {
                return item.title === todo.title;
            })
            if (idx > -1) {
                storage.todos[idx].like = storage.todos[idx].like + 1;
            }
        },
        addTodo: function (newTodoTitle) {
            var newTodo = {
                title: newTodoTitle,
                completed: false,
                createdAt: Date.now(),
                like: 0
            };


            // var getitem=localStorage.getItem(TODO_DATA);
            // alert(getitem);
            //push into todos
            storage.todos.push(newTodo);
            //save in localstorage
            storage._saveToLocalStorage(storage.todos);
        },
        update: function () {
            storage._saveToLocalStorage(storage.todos);
        }

    }
    return storage;
});


//* service 종류 
//1. service
//2. factory
//3. provider