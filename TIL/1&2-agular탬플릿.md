## 1- 정적 탬플릿(Static Template)

순전히 정적인 HTML 페이지를 만든 다음에 어떻게 동적으로 변환할 수 있는지 살펴보자.



## 2- AgularJS 템플릿


**`app/index.html`:**

```html
<html ng-app="phonecatApp">
<head>
  ...
  <script src="lib/angular/angular.js"></script>
  <script src="app.js"></script>
</head>
<body ng-controller="PhoneListController">

  <ul>
    <li ng-repeat="phone in phones">
      <span>{{phone.name}}</span>
      <p>{{phone.snippet}}</p>
    </li>
  </ul>

</body>
</html>
```

하드 코딩 된 전화 목록을 [ngRepeat](https://docs.angularjs.org/api/ng/directive/ngRepeat) 지시문과 두 개의 [AngularJS 표현식으로](https://docs.angularjs.org/guide/expression) 대체했습니다 .

- 태그 의 속성 은 AngularJS repeater 지시문입니다. 리피터는 태그를 템플릿으로 사용하여 목록의 각 전화기에 대한 요소 를 생성하도록 AngularJS에 지시 합니다.`ng-repeat="phone in phones"``<li>``<li>``<li>`
- 중괄호 ( 및 )로 묶인 식은 식 의 값으로 대체됩니다.`{{phone.name}}``{{phone.snippet}}`

또한 태그에 **컨트롤러** 를 연결하는 [ngController](https://docs.angularjs.org/api/ng/directive/ngController) 라는 새 지시문을 추가했습니다 . 이 지점에서:`PhoneListController` `<body>`

- `PhoneListController``<body>`요소 아래 (및 포함) DOM 하위 트리를 담당합니다 .
- 중괄호 ( 및 ) 의 표현식은 컨트롤러에 설정된 애플리케이션 모델을 참조하는 바인딩을 나타냅니다 .`{{phone.name}}``{{phone.snippet}}``PhoneListController`

참고 : 우리는 지정한 [AngularJS와 모듈을](https://docs.angularjs.org/api/ng/type/angular.Module) 사용하여 부하에 , 어디에서 우리의 모듈의 이름입니다. 이 모듈에는 . `ng-app="phonecatApp"``phonecatApp``PhoneListController`





## 모델 및 컨트롤러