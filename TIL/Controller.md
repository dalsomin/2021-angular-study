### Controller

* controller에서 scope.변수로 설정을 해놓으면 ng-model값으로 설정할 수 있다.

  * ```javascript
    app.controller("ctrl", function($scope){
        $scope.data1 = 100;
        $scope.data2 = 200;
        $scope.changeValue = function(){
            $scope.data1 = 1000;
            $scope.data2 = 2000;
        }
    })
    
    <input type="text" ng-model="data1"/>
    <input type="text" ng-model="data2"/>
    ```

### 