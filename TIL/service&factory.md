### AngularJS의 provider, factory, service의 차이점

* angularjs의 특징중 하나는, 공통적으로 활용할 수 있는 서비스를 만들 수 있고, 만들어둔 서비스를 inject받을 수 있다는 것이다. 

* 서비스라는 것은 javaScript의 객체로서, Object, function, Array등등 어떤 것이든 될 수 있다.
* 이 서비스를 만드는 방법이 3가지가 있는데 :star:**provider, factory, service**가 그것이다. (엄밀히 말하면 angularjs에서 서비스라고 하는 것은 위 3가지와 더불어 value, constant도 모두 포함하는 개념이지만 3가지만 다루기로한다. )

#### 1. provider

provider는 그 이름처럼 서비스 객체를 제공하는 역할을 하는 객체이다. 

결론부터 말하자만 서비스를 만드는 궁극적인 방법은 provider이며, factory나 service는 결국 이 provider를 등록하는 또다른 방법일 뿐이다. 

```javascript
angular.module("ng-app-name").provider("serviceName", function(){
    //1. provider등록과정 angulr.module("ng-app-name")
    .provider("servicename", function(){})
    					//----------------- provider생성자function
    
    //2. 이 생성자 함수내에서 $get메서드를 통해서 $get메서드안에서 서비스 객체를 만든다. 
    this.$get = function(){
    this.$get = function(){
        return serviceObject;
    };
})
```

**provider는 get메소드를 갖는 객체이고, 이 $get메소드는 서비스가 될 객체를 리턴해야한다.** 

 provider는 $get메소드를 갖는 객체라고 했는데, provider를 등록할 때에는 이름과 함께 function객체를 넘겨주고 있기 때문이다. 여기서 이 function의 의미가 **생성자 함수**라는 것을 알아야한다. 

결론은 angularjs에서 provider등록시에 전달된 function을 생성자 함수로 사용하여 객체를 만들고 그 객체자체가 provider가 되는 것이다. 

![image-20210115145141805](C:\Users\Autumnsky\AppData\Roaming\Typora\typora-user-images\image-20210115145141805.png)





해당 서비스가 필요하면 그 서비스의 provider를 찾고 그 provider의 $get을 호출해서 그 서비스의 객체를 얻게 된다. ($get이 리턴하는 객체가 결국 서비스가 되기 때문에 서비스의 성격에 따라 $get은 Object객체나 Array, function을 리턴하게된다. )

결국 사용되고 inject되는 서비스는 이 provider의 객체의 **$get 메소드가 리턴한 객체**가 되는 것이다. 

(참고: provider 등록시에 function이 아니라, $get을 가진 객체를 직접 넣어도된다.)



#### 2. factory

factory를 간단히 설명하자면, 서비스 객체를 제공하는 함수정도 되겠다. 

factory를 등록하는 코드는 다음과 같다. 

```javascript
angular.module("ng-app").factory("serviceName", function(){
   return serviceObject; 
});
```

```js
//angularJS의 factory 소스를 보자
function factory(name, factoryFn){
    return provider(name, {$get:factoryFn})
}
```



![image-20210115150111879](C:\Users\Autumnsky\AppData\Roaming\Typora\typora-user-images\image-20210115150111879.png)

그림을 참고하자면 factory의 등록은 결국 provider를 등록하는 형태가 되는데 factory로 등록되는 function은 바로 provider의 $get메소드가 된다.  따라서 factory로 등록되는 function은 객체를 리턴해야만 하고 그 리턴되는 객체가 바로 서비스 객체가 된다. 

#### 3. service

이름만으로는 서비스를 만드는 가장 직접적인 방법으로 보이지만.....서비스에서는 항상Object객체를 생성하게 되며 function이나 Array등등의 다른 객체를 만들기 위해서는 service를 사용할 수 없다. 이때는 factory나 provider를 사용해야한다. 

```js
//angularJS의 service 소스를 보자
function service(name, factoryFn){
    return factory(name, ['$injector', function($injector){
        return $injector.instantiate(constructor);
        //이부분은 constructor를 가지고 new하는 과정이라고 보면된다. 
    }])
}
```

위 코드를 보면 서비스함수 내에서 factory함수를 사용 하고 있는 그 factory함수내부는 간단하게 말해서 service등록시 넣어준function을 생성자로 해서 객체를 생성해서 반환하는 과정이다. 서비스함수 등록함수에서 사용되는 function은 서비스 객체를 만들기 위한 생성자 함수라는 말이다. 

![image-20210115150817539](C:\Users\Autumnsky\AppData\Roaming\Typora\typora-user-images\image-20210115150817539.png)

---

**결론적으로 모든 서비스 객체는 그 서비스 객체를 생성해는 provider객체가 존재하게 된다. 그리고 보통의 경우 Dependency Injection이 되는  대상도 서비스 객체이다. **

---

**:star: angularjs를 사용하다보면 function객체를 파라미터로 넘겨주는 경우가 많은데, 이때 이 function객체의 용도가 그냥 호출되는 일반 function인지, 아니면 이 function이 생성자 함수로 사용되고있는지 잘 구분할 필요가 있다. **

**생성자함수는 provider나 service를 등록할때 넘겨주면서 그 함수는 new를 통해서 새로운 객체를 생성할때 사용된다. 일반적으로는 생성자로 사용되는 function들은 그 안에서 this를 참조하면서 멤버 property를 설정하는 부분이 있게 된다. **

**controller생성시에 넘겨주는 매개변수function또한 controller객체를 생성하기 위한 생성자 함수이다. 보통은 단수히 $scope을 초기화 하는 용도로 사용하기도 하지만 내부적으로는 이 fucntion을 통해 새로운 객체를 생성하게 된다. **

