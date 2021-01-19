## events() & $on()

http://blog.iotinfra.net/?p=2080

---

* 이벤트 발생
  * 이벤트를 발생시키는 api는 $scope객체의 $broadcast와 $emit메소드가 있다. 
  * $**broadcast** : 자식 $scope에게 특정 이벤트ㄹ의 이름으로 주어진 데이터와 함께 이벤트 발생시킴
  * $**emit** : 부모 $scope에서 특정 이벤트의 이름으로 주어진 데이터와 함게 이벤트 발생

```js
// $broadcast(이벤트이름, 인자들....)
$scope.$broadcast("childClick", {name:"broadcast test", age:"33"})
// $emit(이벤트이름, 인자들....)
$scope.$emit("parentClick", {name:"emit test", age:"13"})
```



* 이벤트 등록
  * $broadcast, $emit을 통해서 발생된 이벤트는 모두 **$on** 메소드를 통해서 이벤트 이름에 해당하는 이벤트 리스너 함수를 등록 할 수있다. 

```js
//$on(이벤트이름, 리스터 함수)
$scope.$on("parentClick", function(event, message){
    console.log("parentClick name: "+ message.name);
    console.log("parentClick age: "+ message.age);
})

$scope.$on("childClick", function(event, message){
	console.log("childClick name: "+ message.name);
    console.log("childClick age: "+ message.age);          
})

```



## run()

## constant()