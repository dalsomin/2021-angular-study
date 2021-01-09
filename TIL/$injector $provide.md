## $injector $provide

* AngularJS는 그 모든 기능을 서비스를 통해 구현한다. 

* 타이머($timer), Ajax통신($http), DOM의 파싱($compile) 등등의 모든 기능은 서비스 형태로 구현된다.

* AngularJS의 내부에서도 위와같이 만들어진 서비스를 이용하도록 되어 있다.

* 따라서 AngularJS의 초기화 과정중에는, 이 서비스가 등록되어 사용되어 질 수 있도록 하는 기반작업과, AngularJS의 내장 서비스들을 등록하는 과정이 포함된다.(앞서 이야기 한 $timer, $http, $compile등은 AngularJS의 내장 서비스다.)

* 결론부터 이야기 하면, AngularJS의 초기화 과정중에, 서비스를 등록할 수 있고, 등록된 서비스를 사용할 수 있도록 해주는 기반기능을 만드는데, 그것이 바로 $provide와 $injector인 것이다.

* 이 두 서비스는 AngularJS의 초기화 과정중에 제일 처음 자동으로 만들어 지는 것이기 때문에 AUTO라는 모듈이름으로 불리는 듯 하다.

* :star: agularjs에서 서비스는 싱글톤 객체로 생성되어 서비스 캐쉬에 보관되게 되는데, 서비스를 캐쉬에 등록시키는 기능을 $provid가 담당하고, 서비스 캐쉬에서 서비스를 꺼내서 사용할수 있도록 하는 기능을 담당하는 것이 $injector이다.

* 모든 기능이 서비스 형태로 구현되는 AngularJS에서 서비스를 등록하고 등록된 서비스를 가져오는 이 2가지 기능이야말로 가장 처음에 만들어져야 하는 필수 기능인 것이다.

* 서비스를 등록하는 것은, 익히 알고 있는 angular.module(...).provider, angular.module(...).factory, angular.module(...).service의 3가지 메소드 인데, 모두 내부적으로 $provide가 호출되도록 되어 있다.(각각 $provide.provider, $provide.factory, $provide.service 메소드를 호출하도록 되어 있다.)

* 반대로 서비스를 사용하는 것은, 보통 실행하고자 하는 함수를 $injector에게 실행을 요청함으써 서비스 객체를 함수의 인자로서 주입 받아서 사용한다. 물론 $injector에게서 직접 서비스 객체를 받아 올 수도 있다

* 그런데 [앞선글](http://blog.naver.com/jjoommnn/130180336800)에서 서비스는 항상 프로바이더에 의해 생성 된다고 했었다. 

* 즉 서비스와 프로바이더는 항상 쌍으로 존재하게 된다. 

* 사실 서비스를 등록하는 과정은 실질적으로는 프로바이더를 등록하는 과정이다.(이에 관해서는 [이전글](http://blog.naver.com/jjoommnn/130180336800)을 참고하자.)

* 즉 $injector에게 실행을 요청하는 경우는 service cache에 있는 서비스 객체들만을 주입받을 수 있고, provider injector에게 실행을 요청하는 경우는 프로바이더 객체만 주입 받을 수 있다

  **[출처]** [AngularJS의 $provide와 $injector, 그리고 Dependency Injection](https://blog.naver.com/jjoommnn/130184633488)|**작성자** [쫌조](https://blog.naver.com/jjoommnn)

#### 

