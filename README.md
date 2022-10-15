# 테스트 주도 개발

---

> 켄트 백의 Test-Driven Development: By Example을 읽고 정리하고자 합니다.
> 나중에 다시 읽어보기 위해 계속 정리 중,,  



>> 테스트 프로세스 : 어떠한 동작을 수행하는 비지니스 로직을 포함하는 소스코드가 있다면, 그에 해당하는 테스트 코드를 작성한다. 이 때 이 테스트 코드는 우리의 코드가 우리가 예상하는 기댓값에 맞는 지 확인한다. (함수가 어떻게 동작해야 하는 지 특정한 상황에서 어떻게 동작하는 지 성능은 어떠한지, UI는 잘 보여주는 지 등 .. 함수, 특정한 기능, UI, 성능, API 스펙) -> 테스트 프로임워크나 라이브러리를 사용
>> 성공하면 넘어가고 실패하면 다시 반복 
### 들어가기 전 ..

> 1. 테스트 주도 개발은 하나의 기술이지만 그 이면에는 사고의 근원적 변화가 있다.
   프로그래머가 자기 작업의 품질에 대한 우선적 책임을 져야하며 TDD를 실천법으로써 책임을 맡는 방법으로
   사용하면 더욱 더 강해질 것이다.

> 2. 여유를 가져야 한다. 모든 '학습'과 '개선'의 필수적 요소는 자기를 돌아보기와 자기가 생각을 것을 생각하는 메타인식이다.
   따라서 자신이 하는 것을 관조, 관찰하고 기록하고 분석해보아야 한다.
   같은 문제를 여러 번 다른 방법으로 풀어보고 사고과정 중 생각한 것을 직접 입으로 말하도록 하면서 진행하고
   이를 녹음하고 분석하는 프로토콜 분석(protocol analysis)을 해보는 것도 좋은 방법이다.

> 3. 대규모 프로젝트에서 TDD를 하는 것은 쉽지 않다.
   이럴 때는 두명이서 프로그래밍하는 것도 좋은 방법이다.
   두 사람이 함께 밑단의 시스템이 만족해야 하는 테스트와 그 테스트를 만족하는 밑단의 시스템의 stub을 모두 작성한다.
   이렇게 하면 인터페이스 변경을 제외하고는 결과적으로 두 팀을 디커플링하게 된다.
   (여기서 stub 스텁이란 기존 코드를 흉내내거나 아직 개발되지 않은 코드를 임시로 대치하는 코드를 뜻한다.)

> 4. TTD의 목표는 작동하는 깔끔한 코드이다.
   이것은 예측 가능한 개발 방법이며 코드가 가르쳐주는 모든 교훈을 학습할 기회를 갖게 된다.

> 5. 테스트 주도 개발에서의 규칙은 딱 두가지이다.

   - 오직 자동화된 테스트가 실패했을 경우에만 새로운 코드를 작성한다.
   - 중복을 제거한다.
   - 테스트를 쉽게 만드려면 반드시 응집도는 높고 결합도는 낮은 컴포넌트들로 구성되게끔 설계해야 한다.

> 6. 위의 두가지 규칙에 의해 다음과 같은 순서를 갖게 된다.

   - 빨강 : 실제하는 작은 테스트를 작성한다. 처음에는 컴파일 조차 되지 않을 수도 있다.
   - 초록 : 빨리 테스트가 통과되게끔 한다. 이 떄 어떠한? 짓을 해도 된다.
   - 블루 : 리펙토링을 진행한다.

> 7. TTD는 프로그래밍을 하면서 나타나는 두려움을 관리하는 개발 방법이다.

> 8. TTD를 하면서 얻는 장점은 다음과 같다.

   - 결함 밀도를 충분히 감소시킬 수 있다면, 품질보증(QA)을 수동적인 작업에서 능동적인 작업으로 전화할 수 있다.
   - 예외 상황 숫자를 충분히 낮출 수 있다면, 프로젝트 매니저가 정확히 추정할 수 있어 고객을 매일의 개발 과정에 참여시킬 수 있다.
   - 기술적 대화의 주제가 충분히 분명해질 수 있다면, 소프트웨어 엔지니어들은 일일 단위 혹은 주 단위의 협력 대신 분 단위로 협력하면서 일할 수 있다.
   - 한번 더, 결함 밀도가 충분히 낮아진다면, 새 기능의 선적 가능한 소프트웨어를 매일 갖게 되고, 이를 통해 고객과 새로운 비즈니스 관계에 이를 수 있다.

> 9. 어쨋든 다음과 같이 하자.
   - 단순하게 시작하고
   - 자동화된 테스트를 만들고
   - 새로운 설계 결정을 한 번에 하나씩 도입하기 위해 리팩토링을 할 준비를 하자.

### 1장. 다중 통화를 지원하는 Money 객체

> 다음 예제를 TTD 해보자.
> <img width="567" alt="ex1" src="https://user-images.githubusercontent.com/49556566/193597195-9af8b5c4-2b5c-48c1-81c2-270b6cd8da5a.png"> <img width="594" alt="ex2" src="https://user-images.githubusercontent.com/49556566/193597221-f2aae76e-36d1-4620-a2e1-3b74f5b7fa00.png">
>
> - 통화가 다른 두 금액을 더해서 주어진 환율에 맞게 변한 금액을 결과로 얻을 수 있어야 한다.
> - 어떤 금액(주가)을 어떤 수(주식의 수)에 곱한 금액을 결과로 얻을 수 있어야 한다.
>   이렇게 할 일을 먼저 적고 끝나면 밑줄을 그어주자.

- 스티브 프리만은 테스트와 코드 간의 문제는 중복이 아니라 의존성에 있다.
- 의존성이란 코드나 테스트 중 한쪽을 수정하면 반드시 다른 한쪽도 수정해야만 하는 것이다.
- 프로그램에서는 중복만 제거해주어도 자연스럽게 의존성도 제거되는 경우가 많다.

### 2장. 타락한 객체

> 일반적인 TDD 주기는 다음과 같다.
>
> 1. 테스트를 작성한다. 마음 속에 있는 오퍼레이션이 코드에 어떤 식으로 나타나길 원하는 생각해보라.
>    올바른 답을 얻기 위해 필요한 이야기의 모든 요소를 포함시켜라.
> 2. 실행 가능하게 만든다. 다른 무엇보다도 중요한 것은 빨리 초록 막대를 보는 것이다.
>    만약 깔끔하고 단순한 해법이 있지만 구현하는 데 몇 분 정도 걸릴 것 같으면 일단 적어 놓은 뒤에 원래 문제(초록 막대를 보는 것)으로 돌아오자.
> 3. 올바르게 만든다. 이제 시스템이 작동하므로 직전에 저질렀던 죄악을 수습하자. 좁고 올곧은 소포트웨어 정의의 길로 되돌아와서 중복을 제거하고 초록 막대로 되돌리자.

> 빠르게 초록색을 보기 위해 취할 수 있는 전략 두 가지
>
> 1. 가짜로 구현하기 : 상수를 반환하게 만들고 진짜 코드를 얻을 때까지 단계적으로 상수를 변수로 바꾸어 간다.
> 2. 명백한 구현 사용하기 : 실제 구현을 입력한다.

- 실무에서는 TDD를 사용할 때 두 방법을 번갈아가며 사용한다.
  명백한 구현을 계속 더해 나가며(나에게 명백한 사실이 컴퓨터에게도 명백한 사실인지 확인하기 위해 각각의 명백한 구현 사이에 테스트를 한 번씩 실행한다.)
  빨간 막대를 만나면 가짜로 구현하기 방법을 사용하면서 올바른 코드로 리팩토링한다.

### 3장 모두를 위한 평등

> 일단 삼각측량 기법의 경우 어떻게 리팩토링해야 하는 지 전혀 감이 안 올 때만 사용한다.
> 코드와 테스트 사이의 중복을 제거하고 일반적인 해법을 구할 방법이 보이면 그냥 그 방법대로 구현한다.
> 삼각측량 기법이란 두 개 이상의 테스트를 만들어서 비교하고 동치성(equality)를 일반화하는 것이다.

### 4장 프라이버시

> - private할 수 있는 변수들은 private를 해주자.
> - 오직 테스트를 향상시키기 위해서만 개발된 기능을 사용했다.
> - 두 테스트가 동시에 실패하면 망한다는 점을 인식했다.
> - 위험 요소가 있음에도 계속 진행했다.
> - 테스트와 코드 사이의 결합도를 낮추기 위해, 테스트하는 객체의 새 기능을 사용했다.


### 5장 솔직히 말하자면 

> - 1. 테스트 작성
> - 2. 컴파일되게 하기
> - 3. 실패하는지 확인하기 위해 실행.
> - 4. 실행하게 만듦.
> - 5. 중복 제거 

> 각 단계에는 서로 다른 목적이 있다. 
> 처음 네 단계는 빨리 진행해야 한다. 그러면 새 기능이 포함되더라도 잘 알고 있는 상태에 이를 수 있다. 거기에 도달하기 위해서라면 어떤 죄든 저지를 수 있다. 그동안 만큼은 속도가 설계보다 더 높은 패이기 때문이다. 


### 6장 돌아온 '모두를 위한 평등'

> 중복을 피할 수 있는 방법 중 한 가지는 우리가 만든 클래스 중 하나가 다른 클래스를 상속받게 하는 것이다. 
> 충분한 테스트가 없다면 지원 테스트가 갖춰지지 않은 리펙토링을 만나게 될 수밖에 없다. -> 있으면 좋을 것 같은 테스트를 작성하라. 

### 7장 ~ 8장 

> - 동일한 메서드의 두 변이형 메서드 서명부를 통일시킴으로써 중복 제거를 한다.
> - 최소한 메서드 선언부만이라도 공통 상위 클래스로 옮긴다.
> - 팩토리 메서드를 도입하여 테스트 코드에서 콘크리트 하위 클래스의 존재 사실을 분리한다.
> - 하위 클래스가 사라지면 몇몇 테스트는 불필요한 여분의 것이 된다는 것을 인식한다. 


### 뒤에 장들을 더 읽고,, 

> 뒤에까지 더 읽어보고 느낀 점은 모든 코딩 과정은 신중하게 일어나야 한다는 점이다.
> 먼저 기능을 구현할 때 모든 요구 사항을 할 일 목록 처럼 쭉 나열하며 일단 어떻게 구현할 지 정리한다.
> 각각의 기능을 구현할 때 다음과 같은 프로세스를 반복 한다.
> 1. 작은 테스트를 추가한다.
> 2. 모든 테스트를 실행하고, 실패하는 것을 확인한다.
> 3. 코드에 변화를 준다.
> 4. 모든 테스트를 실행하고, 성공하는 것을 확인한다.
> 5. 중복을 제거하기 위해 리펙토링한다. 


### 프로젝트 중반에 TTD를 도입하려면 어떻게 해야 할까? 
> 많은 양의 코드가 있을 때 TTD로 바꾸는 것에 대해서는 너무나 어렵다. 애초에 테스트를 염두에 두지 않고 만든 코드는 테스트하기가 그리 쉽지 않다는 점이다.
> 우선 해야 할 일은 변경의 범위를 제한하는 것이다. 
> 다음으로 해야 할 일은 테스트와 리펙토링 사이에 존재하는 교착상태(deadLock)을 풀어주는 것이다. (아주 조심스럽게 작업하거나 짝 프로그래밍을 하거나,,)
> 시간이 지나면서, 시스템에서 늘 변화하는 부분들은 테스트 주도로 된 것처럼 보이게 될 것이다. 

### 왜 이름이 테스트 주도 개발일까? 
> 개발: 의사 결정에 시차기 있으면 그 사이에 피드백이 어렵기 때문에, 소프트웨어 개발을 어떤 단계(phase)에 따라 나누는 과거의 사고 방식은 약화되었다. 여기에서 "개발"이란 분석, 논리적 설계, 물리적 설계, 구현, 테스팅, 검토, 통합, 배포를 아우르는 복잡한 춤을 말한다.
> 주도: 만약 개발을 테스트로 주도하지 않는다면, 무엇으로 주도할 것인가? 추측? 명세? 
> 테스트 : 자동화되고 구체적이며 명확한 테스트를 말한다. 


### 실전 TDD

> 1. GUI 프로그래밍 TDD 
> GUI 프로그래밍을 TDD로 진행할 때는 다음 항목을 숙지하자. 
> - GUI 개발에서도 TDD의 리듬을 유지하며 점진적으로 개발하자.
> - 모델(또는 도메인 모델, 로직에 해당되는 코드)과 뷰를 분리하자. 이는 테스트 기능성을 높이기 위해서도 중요하다.
> - 뷰는 가능한 얇게 만든다.(충분히 얇다고 생각할 때도 더 얇게 만들 수 있다.), 하지만 뷰가 너무 자주 바뀌는 경우에 대해서는 생각해볼 필요가 있다. 
> - 언제나 늘 모델부터 생각하자. 

---

# 테스트 자동화 

> 1. 자동화된 테스트란? 사람이 직접 확인을 하는 것이 아니라 테스트를 하는 코드를 작성해서, 테스트 시스템이 자동으로 확인을 해줄 수 있는 지 확인하는 것이다. 

### 테스트는 리펙토링에도 도움이 된다.
> 리펙토링하는 기능이 규모가 크다면 리펙토링하는 과정에서 버그가 있는지 없는지 정말 세밀하게 또 확인을 해야한다. 하지만 테스트 코드가 존재한다면, 리펙토링 이후에 코드가 이전과 똑같이 작동하는지 검증하는 게 매우 쉬워진다. 

### 유닛 테스트와 통합 테스트 
> 1. 유닛 테스트
> 프로젝트의 기능을 잘게잘게 쪼개서 테스트를 해 각 기능이 모두 잘 작동하는지 확인할 수 있다. 
> - 컴포넌트가 잘 렌더링되는 지 확인한다.
> - 컴포넌트의 특정 함수를 실행하면 상태가 우리가 원하는 형태로 바꿔준다.
> - 리덕스의 액션 생성 함수가 액션 객체를 잘 만들어낸다.
> - 리덕스의 리듀서에 상태와 액션객체를 넣어서 호출하면 새로운 상태를 잘 만들어 준다.

> 2. 통합 테스트
> 기능들이 전체적으로 잘 작동하는지 확인하기 위해 통합 테스트를 실시한다.
> - 여러 컴포넌트들을 렌더링하고 서로 상호 작용을 잘 하는지 확인
> - DOM 이벤트를 발생 시켰을 때 우리의 UI에 원하는 변화가 잘 발생한다.
> - 리덕스와 연동된 컨테이너 컴포넌트의 DOM에 특정 이벤트를 발생시켰을 때 우리가 원하는 액션이 잘 디스패치된다. 


