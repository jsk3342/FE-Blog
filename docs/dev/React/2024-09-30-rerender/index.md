---
date: 2024-09-28T10:00
authors: Jisu Kim
title: 'React에서의 리렌더링과 컴포넌트의 동일성 이해하기'
description: 'React 컴포넌트의 리렌더링 동작과 참조의 동일성에 대한 심층 분석'
category: 'React'
keywords: ['React', 'React Hook Form', 'Form Management', 'JavaScript', 'Web Development']
tags:
  - React
---

## 목차

1. [들어가며](#들어가며)
2. [예제 코드 소개](#예제-코드-소개)
3. [동작 결과](#동작-결과)
4. [궁금한 점과 그에 대한 해설](#궁금한-점과-그에-대한-해설)
   - [1. `ParentWithChildren`은 자식 컴포넌트들을 렌더링하는데, 왜 `ParentWithoutChildren`은 자식 컴포넌트들을 렌더링하지 않을까요?](#1-parentwithchildren은-자식-컴포넌트들을-렌더링하는데-왜-parentwithoutchildren은-자식-컴포넌트들을-렌더링하지-않을까요)
   - [2. `ParentWithChildren`을 클릭하여 리렌더링할 때, 왜 `ChildA`와 `ChildB`는 리렌더링되지 않을까요?](#2-parentwithchildren을-클릭하여-리렌더링할-때-왜-childa와-childb는-리렌더링되지-않을까요)
5. [React의 렌더링 동작 원리 자세히 이해하기](#react의-렌더링-동작-원리-자세히-이해하기)
   - [요소의 동일성 유지](#요소의-동일성-유지)
   - [렌더링 함수 내에서 요소 생성 시](#렌더링-함수-내에서-요소-생성-시)
   - [React.cloneElement를 통한 리렌더링 제어](#reactcloneelement를-통한-리렌더링-제어)
6. [핵심 정리](#핵심-정리)
7. [결론](#결론)
8. [참고 자료](#참고-자료)

<!--truncate-->

<br />

# React에서의 리렌더링과 컴포넌트의 동일성 이해하기

React를 사용하다 보면 컴포넌트의 리렌더링과 관련된 궁금증이 생길 수 있습니다. 특히, 컴포넌트의 props나 state가 변경되지 않았는데도 리렌더링이 발생하거나, 반대로 변경되었는데도 리렌더링이 발생하지 않는 경우가 있습니다. 이번 글에서는 이러한 현상을 이해하기 위해 예제를 통해 React의 렌더링 동작을 살펴보겠습니다.

## 예제 코드 소개

아래는 간단한 React 애플리케이션입니다.

```jsx
import React, { useState } from 'react';

export default function App() {
  return (
    <>
      <ParentWithChildren>
        <ChildA />
        <ChildB />
      </ParentWithChildren>
      <ParentWithoutChildren>
        <ChildC />
        <ChildD />
      </ParentWithoutChildren>
    </>
  );
}

function ParentWithChildren({ children }) {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>Parent A Count: {count}</button>
      {children}
    </>
  );
}

function ChildA() {
  return <div>Child A</div>;
}

function ChildB() {
  return <div>Child B</div>;
}

function ParentWithoutChildren({ children }) {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>Parent B Count: {count}</button>
      {/* children을 사용하지 않음 */}
    </>
  );
}

function ChildC() {
  return <div>Child C</div>;
}

function ChildD() {
  return <div>Child D</div>;
}
```

### 동작 결과

1. **처음 렌더링 시**
   - `App`이 렌더링됩니다.
   - `ParentWithChildren`, `ChildA`, `ChildB`가 렌더링됩니다.
   - `ParentWithoutChildren`가 렌더링됩니다.
   - `ChildC`, `ChildD`는 렌더링되지 않습니다.
2. **`ParentWithChildren`의 버튼 클릭 시**
   - `ParentWithChildren`만 리렌더링됩니다.
   - `ChildA`, `ChildB`는 리렌더링되지 않습니다.
3. **`ParentWithoutChildren`의 버튼 클릭 시**
   - `ParentWithoutChildren`만 리렌더링됩니다.

## 궁금한 점과 그에 대한 해설

### 1. `ParentWithChildren`은 자식 컴포넌트들을 렌더링하는데, 왜 `ParentWithoutChildren`은 자식 컴포넌트들을 렌더링하지 않을까요?

### 답변:

- **`ParentWithChildren` 컴포넌트**는 `children`을 받아서 `{children}`으로 렌더링합니다. 따라서 `ChildA`와 `ChildB`가 화면에 나타납니다.
- **`ParentWithoutChildren` 컴포넌트**는 `children`을 받지만, 렌더링 함수 내에서 이를 사용하지 않습니다. 즉, `{children}`을 렌더링하지 않으므로 `ChildC`와 `ChildD`는 화면에 나타나지 않습니다.
- 이처럼 `children`을 받아도 이를 렌더링에 사용하지 않으면 해당 자식 컴포넌트들은 렌더링되지 않습니다.

### 2. `ParentWithChildren`을 클릭하여 리렌더링할 때, 왜 `ChildA`와 `ChildB`는 리렌더링되지 않을까요?

### 답변:

- React는 **컴포넌트의 props와 state가 변경되지 않으면** 해당 컴포넌트를 리렌더링하지 않습니다.
- `ParentWithChildren`의 상태(`count`)가 변경되면 `ParentWithChildren`은 리렌더링되지만, 자식인 `ChildA`와 `ChildB`는 props가 변경되지 않았으므로 리렌더링되지 않습니다.
- 또한, `ChildA`와 `ChildB`는 `App` 컴포넌트에서 한 번만 생성되어 `ParentWithChildren`의 `children`으로 전달되기 때문에, **동일한 참조**를 유지합니다.
- React는 이전 렌더링과 새로운 렌더링에서 **동일한 참조를 가진 요소는 리렌더링하지 않습니다.**

## React의 렌더링 동작 원리 자세히 이해하기

### 요소의 동일성 유지

- `App` 컴포넌트에서 `<ChildA />`와 `<ChildB />`를 직접 작성하여 `ParentWithChildren`의 `children`으로 전달합니다.
- 이때 `<ChildA />`와 `<ChildB />`는 `App`이 처음 렌더링될 때 한 번 생성되고, 이후에는 **동일한 참조**를 유지합니다.
- 따라서 `ParentWithChildren`이 리렌더링되더라도 `children`으로 전달된 `<ChildA />`와 `<ChildB />`는 변경되지 않으므로, 리렌더링되지 않습니다.

### 렌더링 함수 내에서 요소 생성 시

만약 `ParentWithChildren` 컴포넌트 내에서 직접 `<ChildA />`와 `<ChildB />`를 생성한다면 어떻게 될까요?

```jsx
function ParentWithChildren() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>Parent A Count: {count}</button>
      <ChildA />
      <ChildB />
    </>
  );
}
```

- 이 경우, `ParentWithChildren`이 리렌더링될 때마다 `<ChildA />`와 `<ChildB />`를 **새롭게 생성**합니다.
- 따라서 `<ChildA />`와 `<ChildB />`의 **참조가 변경**되어, React는 이를 새로운 요소로 인식하고 리렌더링합니다.
- 이는 불필요한 리렌더링을 발생시켜 성능 저하의 원인이 될 수 있습니다.

### React.cloneElement를 통한 리렌더링 제어

`children`의 참조를 유지하면서 props를 변경하여 자식 컴포넌트를 리렌더링하고 싶다면 `React.cloneElement`를 사용할 수 있습니다.

```jsx
function ParentWithChildren({ children }) {
  const [count, setCount] = useState(0);

  const clonedChildren = React.Children.map(children, (child) => React.cloneElement(child, { parentCount: count }));

  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>Parent A Count: {count}</button>
      {clonedChildren}
    </>
  );
}
```

- `React.cloneElement`를 사용하면 기존 요소의 **참조를 유지하면서도** 새로운 props를 전달할 수 있습니다.
- 이제 `parentCount` prop이 변경되면 자식 컴포넌트들은 리렌더링됩니다.
- 자식 컴포넌트에서 `parentCount`를 사용하여 화면에 표시하거나 로직에 활용할 수 있습니다.

## 핵심 정리

- **Props로 전달된 요소의 동일성 유지**: 부모 컴포넌트에서 자식 컴포넌트를 props나 `children`으로 전달할 때, 해당 요소들이 **동일한 참조**를 유지하면 리렌더링되지 않습니다.
- **렌더링 함수 내에서 요소 생성 시**: 렌더링 함수 내에서 직접 요소를 생성하면, 컴포넌트가 리렌더링될 때마다 새로운 참조를 가지게 되어 자식 컴포넌트들도 리렌더링됩니다.
- **React.cloneElement를 통한 리렌더링 제어**: `React.cloneElement`를 사용하면 요소의 참조를 유지하면서도 props를 변경할 수 있어, 필요한 경우에만 자식 컴포넌트를 리렌더링할 수 있습니다.

## 결론

React에서 컴포넌트의 리렌더링은 성능과 직결되는 중요한 이슈입니다. 컴포넌트의 리렌더링 여부는 **참조의 동일성**과 **props의 변경 여부**에 크게 좌우됩니다. 이번 글에서 다룬 예제를 통해 다음과 같은 점을 알 수 있습니다.

- 자식 컴포넌트를 props나 `children`으로 전달할 때는, 가능하면 부모 컴포넌트 외부에서 생성하여 **동일한 참조**를 유지하는 것이 좋습니다.
- 렌더링 함수 내에서 요소를 생성하면 불필요한 리렌더링이 발생할 수 있으므로 주의해야 합니다.
- `React.cloneElement`를 활용하면 요소의 참조를 유지하면서도 props를 변경할 수 있어, 리렌더링을 세밀하게 제어할 수 있습니다.

이러한 원리를 이해하고 적절히 활용하면 React 애플리케이션의 성능을 최적화할 수 있습니다.
