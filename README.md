# 테스트 주도 개발

---

> 켄트 백의 Test-Driven Development: By Example을 읽고 정리하고자 합니다.

### 들어가기 전 ..

1. 테스트 주도 개발은 하나의 기술이지만 그 이면에는 사고의 근원적 변화가 있다.
   프로그래머가 자기 작업의 품질에 대한 우선적 책임을 져야하며 TDD를 실천법으로써 책임을 맡는 방법으로
   사용하면 더욱 더 강해질 것이다.
2. 여유를 가져야 한다. 모든 '학습'과 '개선'의 필수적 요소는 자기를 돌아보기와 자기가 생각을 것을 생각하는 메타인식이다.
   따라서 자신이 하는 것을 관조, 관찰하고 기록하고 분석해보아야 한다.
   같은 문제를 여러 번 다른 방법으로 풀어보고 사고과정 중 생각한 것을 직접 입으로 말하도록 하면서 진행하고
   이를 녹음하고 분석하는 프로토콜 분석(protocol analysis)을 해보는 것도 좋은 방법이다.
3. 대규모 프로젝트에서 TDD를 하는 것은 쉽지 않다.
   이럴 때는 두명이서 프로그래밍하는 것도 좋은 방법이다.
   두 사람이 함께 밑단의 시스템이 만족해야 하는 테스트와 그 테스트를 만족하는 밑단의 시스템의 stub을 모두 작성한다.
   이렇게 하면 인터페이스 변경을 제외하고는 결과적으로 두 팀을 디커플링하게 된다.
   (여기서 stub 스텁이란 기존 코드를 흉내내거나 아직 개발되지 않은 코드를 임시로 대치하는 코드를 뜻한다.)
