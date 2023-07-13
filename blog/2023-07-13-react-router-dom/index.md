---
date: 2023-07-13T18:32
authors: Jisu Kim
title: '리액트 라우터 돔(Router DOM) 깊게 이해하기: BrowserRouter, Routes, Route'
description: '리액트 라우터 돔(Router DOM) 깊게 이해하기: BrowserRouter, Routes, Route'
keywords: ['React', 'BrowserRouter', 'Routes', 'Route', 'Router', 'DOM', 'react-router-dom']
tags:
  - React
  - react-router-dom
  - BrowserRouter
  - Routes
  - Route
---

## 목차

- [프론트엔드에서의 라우팅](#프론트엔드에서의-라우팅)
- [BrowserRouter](#BrowserRouter)
- [BrowserRouter의 주요 메소드와 프로퍼티](#BrowserRouter의-주요-메소드와-프로퍼티)
- [Routes](#Routes)
- [Route의 개념 및 역할](#Route의-개념-및-역할)
- [실제 적용 예시](#실제-적용-예시)
- [주의 사항 및 자주 하는 실수](#주의-사항-및-자주-하는-실수)
- [정리 및 결론](#정리-및-결론)

<!--truncate-->

<br />

## 프론트엔드에서의 라우팅

![현재 구현된 에러 화면](image.png)

웹 개발에 있어서 라우팅은 매우 중요한 역할을 합니다. 사용자가 웹사이트의 다양한 페이지를 방문하거나 애플리케이션의 특정 기능에 접근할 때, 라우팅이 제대로 설정되어 있지 않다면 올바르게 작동하지 않거나 접근성이 떨어질 수 있습니다. 이처럼 라우팅은 웹 애플리케이션의 사용자 경험과 성능에 직접적인 영향을 미치는 핵심적인 요소입니다.

특히 프론트엔드 개발자로서 라우팅은 필수적으로 이해하고 있어야 하는 개념 중 하나입니다. 클라이언트 사이드 라우팅은 우리가 만들고 있는 애플리케이션의 구조와 설계에 영향을 주기 때문입니다. 그리고 이런 라우팅의 로직을 효과적으로 다루기 위해서는 라우팅 라이브러리의 도움을 받게 됩니다.

리액트를 이용한 프론트엔드 개발에서는 '리액트 라우터 돔(React Router DOM)'이라는 라이브러리가 대부분 사용됩니다. 리액트 라우터 돔은 SPA(Single Page Application)에서 필요한 다양한 라우팅 기능을 제공해주며, 특히 **`BrowserRouter`**, **`Routes`**, **`Route`** 등의 컴포넌트를 제공하여 라우팅 구성을 보다 간편하고 효율적으로 할 수 있게 해줍니다.

이번 글에서는 리액트 라우터 돔의 핵심 컴포넌트인 **`BrowserRouter`**, **`Routes`**, **`Route`**에 대해 깊게 알아보겠습니다. 각각의 개념과 역할, 그리고 사용법을 이해함으로써 웹 애플리케이션의 라우팅을 효과적으로 구현하는 데 도움이 될 것입니다.

## **BrowserRouter**

React Router의 핵심 구성 요소 중 하나인 **`BrowserRouter`**는 웹 애플리케이션에서 라우팅을 처리하는 데 필요한 도구를 제공합니다. 특히, React Router가 기본적으로 SPA(Single Page Application)의 라우팅을 지원하기 때문에, **`BrowserRouter`**는 이러한 SPA에서 매우 중요한 역할을 합니다.

### 개념 및 역할

**`BrowserRouter`**는 HTML5의 History API를 사용하여 UI를 현재 URL과 동기화시킵니다. 이 컴포넌트는 브라우저의 history 스택을 활용해 라우팅을 제어하며, 사용자가 브라우저의 뒤로 가기, 앞으로 가기 버튼을 클릭했을 때 해당하는 라우트로 이동하도록 합니다. 또한, **`BrowserRouter`**는 동적으로 변경되는 URL을 감지하고 그에 따라 적절한 라우트를 렌더링하게 합니다.

### 사용법

**`BrowserRouter`**는 주로 React 애플리케이션의 최상위에서 사용됩니다. 이 컴포넌트는 하위 컴포넌트들에게 현재 URL의 정보와 history 객체를 전달해주기 때문에, 앱의 모든 라우트가 **`BrowserRouter`**의 하위 요소로 있어야 합니다.

기본적인 사용 방법은 다음과 같습니다:

```jsx
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;
```

위의 코드에서 **`BrowserRouter`** 컴포넌트를 import하고 있으며, 라우트를 설정할 때 **`Route`** 컴포넌트를 사용하고 있습니다.

이처럼 **`BrowserRouter`**는 리액트 라우터 돔의 핵심 구성 요소로, 웹 애플리케이션의 라우팅을 동적으로 제어하며, 사용자의 URL 변경에 따라 적절한 컴포넌트를 렌더링하는 역할을 수행합니다. 알맞은 라우팅 구성을 통해 사용자 경험을 향상시킬 수 있습니다.

### 원리

**`BrowserRouter`**의 핵심은 HTML5의 History API에 기반을 두고 있습니다. 이 API는 **`pushState`**, **`replaceState`** 그리고 **`popState`** 이벤트를 통해 브라우저의 세션 히스토리와 상호작용하는 기능을 제공합니다.

1. **`pushState`**: 이 메서드를 호출하면 브라우저의 히스토리 스택에 새로운 엔트리가 추가되고, 브라우저의 주소 표시줄이 변경됩니다. 이때 페이지 리로드는 발생하지 않습니다.
2. **`replaceState`**: 이 메서드는 현재 히스토리 엔트리를 새로운 것으로 대체합니다. 브라우저의 주소 표시줄이 변경되지만, **`pushState`**와 마찬가지로 페이지 리로드는 발생하지 않습니다.
3. **`popState`**: 사용자가 브라우저의 뒤로 가기 또는 앞으로 가기 버튼을 눌렀을 때 발생하는 이벤트입니다. 이 이벤트가 발생하면, **`BrowserRouter`**는 이를 감지하고 적절한 라우트를 렌더링합니다.

### 커스텀

React Router는 기본 **`BrowserRouter`** 외에도 커스텀 라우터를 만드는 데 필요한 도구들을 제공합니다. **`Router`** 컴포넌트는 **`history`** 객체를 prop으로 받아, 이를 사용해 사용자 정의 라우팅 동작을 구현할 수 있습니다.

```jsx
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();

function App() {
  return <Router history={customHistory}>{/* routes */}</Router>;
}
```

위 코드에서 **`createBrowserHistory`** 함수는 **`history`** 라이브러리에서 제공하는 함수로, 새로운 히스토리 객체를 생성합니다. 이 객체를 **`Router`** 컴포넌트에 전달함으로써 라우터의 동작을 커스텀할 수 있습니다.

이렇게 함으로써 **`BrowserRouter`**를 확장하여, 애플리케이션의 요구사항에 맞는 라우팅 동작을 구현할 수 있습니다.

history 라이브러리 링크 남겨주기

## **BrowserRouter의 주요 메소드와 프로퍼티**

**`BrowserRouter`**는 **`history`** 객체를 사용해 라우팅을 관리합니다. 이 객체에는 라우팅을 구현하는 데 필요한 주요 메서드와 프로퍼티가 있습니다.

### 메서드

1. **`history.push(path, [state])`**: 새로운 엔트리를 히스토리 스택에 추가합니다. 이 메서드는 새로운 페이지로 이동하는 데 사용됩니다.
2. **`history.replace(path, [state])`**: 현재 히스토리 엔트리를 새로운 엔트리로 대체합니다. 이 메서드는 같은 페이지 내에서 이동하는 데 사용됩니다.
3. **`history.goBack()`**: 히스토리 스택에서 한 단계 뒤로 이동합니다.
4. **`history.goForward()`**: 히스토리 스택에서 한 단계 앞으로 이동합니다.

### 프로퍼티

1. **`history.location`**: 현재 위치를 나타내는 객체입니다. **`pathname`**, **`search`**, **`hash`**, **`state`** 속성을 포함하고 있습니다.
2. **`history.length`**: 히스토리 스택의 길이를 나타냅니다.

### 사용 예시

```jsx
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
      </div>
    </Router>
  );
}

function HomePage() {
  return <h2>Home</h2>;
}

function AboutPage() {
  return <h2>About</h2>;
}
```

위 예제에서 **`BrowserRouter`**는 **`Router`**로 임포트되어 사용되었습니다. **`Router`** 컴포넌트는 애플리케이션의 라우팅 컨텍스트를 설정하고, 하위 컴포넌트들에게 라우팅 관련 정보를 제공합니다. **`Link`** 컴포넌트를 통해 페이지 간 이동이 가능하고, **`Route`** 컴포넌트를 통해 경로에 따른 뷰 렌더링이 결정됩니다.

### 관련 주의 사항

1. **`BrowserRouter`**는 서버에서 렌더링할 때 문제가 될 수 있습니다. 이는 **`BrowserRouter`**가 클라이언트 측에서만 사용 가능한 HTML5 히스토리 API를 사용하기 때문입니다. 서버 렌더링이 필요한 경우 **`StaticRouter`**를 사용하세요.
2. **`BrowserRouter`**를 사용할 때 라우트 정의 순서에 주의해야 합니다. **`react-router-dom`**은 정의된 순서대로 라우트를 검사하고, 처음으로 일치하는 라우트를 렌더링합니다. 이로 인해 특정 라우트가 의도치 않게 가려질 수 있습니다. 이를 방지하기 위해 더 구체적인 경로를 앞에 위치시키거나 **`Switch`** 컴포넌트를 사용하세요.

## **Routes**

**`Routes`**는 React Router의 핵심 컴포넌트 중 하나입니다. 각 **`Route`**는 애플리케이션의 특정 URL에 매칭되는 UI를 렌더링하는 역할을 합니다. **`Route`**의 **`path`** prop는 해당 컴포넌트가 렌더링될 URL을 결정합니다. 또한, **`Routes`** 컴포넌트는 자식으로 여러 개의 **`Route`** 컴포넌트를 가질 수 있으며, URL 경로에 따라 서로 다른 컴포넌트를 렌더링하게 합니다.

### Routes 사용 예시

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  return <h2>Home</h2>;
}

function AboutPage() {
  return <h2>About</h2>;
}
```

위 예제에서 **`Routes`** 컴포넌트는 두 개의 **`Route`** 컴포넌트를 자식으로 가지고 있습니다. 각 **`Route`**는 **`/`** 경로와 **`/about`** 경로에 매칭되며, 각 경로에 따라 **`HomePage`**와 **`AboutPage`** 컴포넌트를 렌더링합니다.

### Routes의 동작 원리

**`Routes`**는 주어진 URL에 대해 자식 **`Route`** 컴포넌트를 순차적으로 비교하여 매칭되는 **`Route`**를 선택하여 렌더링합니다. 이때 매칭되는지 여부는 **`Route`**의 **`path`** prop과 현재 URL을 비교하여 판단합니다.

주어진 URL을 기반으로 각 **`Route`**를 확인하고 가장 잘 매칭되는 **`Route`**를 렌더링하는 역할을 합니다. 이를 이해하는 데 도움이 될 수 있는 간단한 **`Routes`** 구현을 아래에 구현해보겠습니다.

```jsx
function CustomRoutes({ children }) {
  const location = useLocation();

  // Filter children based on their 'path' prop
  let matchedRoute = null;
  React.Children.forEach(children, (child) => {
    if (matchPath(location.pathname, child.props.path)) {
      matchedRoute = child;
    }
  });

  return matchedRoute;
}
```

위의 **`CustomRoutes`** 컴포넌트는 **`Routes`**의 가장 기본적인 기능을 재현합니다. 현재 URL을 가져와서 각 **`Route`**의 **`path`** prop과 비교하고, 매칭되는 **`Route`**를 렌더링합니다. 여기서 **`matchPath`** 함수는 **`react-router`**가 제공하는 유틸리티 함수로서, 주어진 경로가 패턴에 매칭되는지 확인합니다.

이런 방식을 통해 **`Routes`** 컴포넌트는 매우 유연하게 동작합니다. 다양한 패턴의 경로를 처리할 수 있으며, 필요에 따라 컴포넌트를 렌더링하거나 리다이렉트를 수행할 수 있습니다.

추가적으로, 커스텀 **`Routes`** 컴포넌트를 생성함으로써 상황에 맞는 라우팅 로직을 적용할 수 있습니다. 예를 들어, 사용자가 특정 페이지에 접근 권한이 없는 경우 리다이렉트하거나, 로딩 상태나 에러 상태를 더 세밀하게 제어할 수 있습니다. 이런 경우에는 **`matchPath`** 함수와 함께 **`react-router`**의 **`useHistory`**나 **`useRedirect`** 등의 훅을 활용하여 복잡한 라우팅 로직을 구현할 수 있습니다.

### Routes의 상세 옵션과 사용 팁

- **`Route`**의 **`path`** prop에는 동적 경로 매칭을 위한 문법을 사용할 수 있습니다. 예를 들어, **`path="/post/:id"`**와 같이 작성하면 **`/post/1`**, **`/post/2`** 등과 같은 URL에 대해 동일한 **`Route`**를 사용할 수 있습니다.
- **`Routes`** 컴포넌트는 매칭되는 첫 번째 **`Route`**만 렌더링하므로, 경로가 중첩될 수 있는 경우 순서에 주의해야 합니다. 예를 들어, **`path="/"`**와 **`path="/about"`**이 있을 때 **`/`**를 먼저 위치시키면 모든 경로가 **`/`**에 매칭되어 문제가 발생할 수 있습니다.
- **`Routes`**와 **`Route`** 컴포넌트를 이용하여 중첩 라우팅을 구현할 수 있습니다. 이는 복잡한 UI 구조를 더 효과적으로 표현할 수 있게 해줍니다. 중첩된 **`Routes`**는 부모 **`Route`**의 경로를 기준으로 경로가 결정됩니다.

## **Route의 개념 및 역할**

React Router에서 **`Route`**는 특정 URL 경로에 따라 특정 컴포넌트를 렌더링하는 역할을 합니다. 즉, 사용자의 요청(URL)에 따라 적절한 컴포넌트를 선택하여 렌더링하는 중추적인 역할을 수행합니다.

### Route 사용 예시

다음은 기본적인 **`Route`** 사용 예시입니다.

```jsx
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
    </Router>
  );
}
```

위 코드에서, **`/`** 경로에 대해서는 **`HomePage`** 컴포넌트를 렌더링하고, **`/about`** 경로에 대해서는 **`AboutPage`** 컴포넌트를 렌더링합니다. 이처럼 **`Route`**는 URL과 컴포넌트를 매핑하는 역할을 합니다.

### Route의 동작 원리

**`Route`**의 동작 원리는 URL과 **`Route`**의 **`path`** prop을 비교하여 매칭 여부를 결정하고, 매칭되는 경우 해당 **`Route`**의 **`component`** prop에 지정된 컴포넌트를 렌더링하는 방식으로 작동합니다.

### Route의 구현 원리

React Router의 **`Route`** 컴포넌트는 고차 컴포넌트(HOC)와 컨텍스트 API를 사용하여 구현됩니다. **`Route`** 컴포넌트는 사용자가 입력한 URL과 각 **`Route`**의 **`path`** prop을 비교하여 매칭된 **`Route`**만 렌더링하는 역할을 합니다.

기본적으로 **`Route`** 컴포넌트는 다음과 같이 작동합니다:

1. **`Route`** 컴포넌트는 먼저 부모 컴포넌트에서 제공하는 라우터 컨텍스트를 획득합니다. 이 컨텍스트는 현재의 URL 정보 등 라우팅에 필요한 정보를 담고 있습니다.
2. **`Route`** 컴포넌트는 **`path`** prop과 현재 URL을 비교하여 매칭 여부를 결정합니다. 이때 **`exact`**, **`strict`** 등의 prop이 사용됩니다.
3. **`Route`** 컴포넌트는 자식 컴포넌트를 렌더링합니다. 이때 **`component`**, **`render`**, **`children`** 등의 prop에 따라 렌더링하는 방식이 달라집니다.

스크래치 코드로 표현하면 다음과 같습니다:

```jsx
import React, { useContext } from 'react';
import { matchPath } from 'react-router';
import { RouterContext } from './RouterContext';

const Route = ({ path, exact, component: Component, render, children }) => {
  const { location } = useContext(RouterContext); // 라우터 컨텍스트를 획득합니다.

  const match = matchPath(location.pathname, { path, exact }); // `path`와 현재 URL을 비교합니다.

  if (!match) {
    return null; // 매칭되지 않으면 아무것도 렌더링하지 않습니다.
  }

  if (Component) {
    return <Component match={match} />; // `component` prop이 지정된 경우 해당 컴포넌트를 렌더링합니다.
  }

  if (render) {
    return render({ match }); // `render` prop이 지정된 경우 해당 함수를 호출하여 렌더링합니다.
  }

  if (typeof children === 'function') {
    return children({ match }); // `children` prop이 함수인 경우 해당 함수를 호출하여 렌더링합니다.
  }

  return null; // 아무것도 렌더링하지 않습니다.
};

export default Route;
```

### Route 커스터마이징

React Router는 고차 컴포넌트(HOC) 패턴과 컨텍스트 API를 이용하여 라우팅 로직을 제공합니다. 이를 이해하면 **`Route`** 컴포넌트를 커스터마이징하여 필요에 맞게 확장할 수 있습니다.

예를 들어, 인증이 필요한 라우트를 구현하려는 경우, 인증 상태를 확인하여 인증된 사용자에게만 해당 라우트를 보여주는 **`PrivateRoute`**를 구현할 수 있습니다:

```jsx
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? ( // 인증 상태를 확인합니다.
          <Component {...props} />
        ) : (
          <Redirect to="/login" /> // 인증되지 않은 경우 로그인 페이지로 리다이렉트합니다.
        )
      }
    />
  );
}
```

이처럼 React Router는 기본적인 라우팅 기능뿐만 아니라 고차 컴포넌트나 컨텍스트 API 등을 이용하여 다양한 방식으로 라우팅 로직을 확장하고 커스터마이징할 수 있습니다.

### Route의 상세 옵션과 사용 팁

**`Route`** 컴포넌트는 다양한 prop을 통해 라우팅을 더욱 세밀하게 제어할 수 있습니다. 대표적인 prop들은 다음과 같습니다.

- **`exact`**: 이 prop이 **`true`**로 설정되면, **`Route`**의 **`path`**가 URL과 완전히 일치할 때만 렌더링합니다. 이를 통해 중복 라우팅을 방지할 수 있습니다.
- **`children`**: 이 prop을 이용하면, **`Route`**와 매칭되지 않을 때도 렌더링할 컴포넌트를 지정할 수 있습니다. 이는 로딩 상태나 에러 상태를 보여주는 등의 상황에서 유용합니다.
- **`render`**: 이 prop을 통해 인라인 렌더링 함수를 지정할 수 있습니다. 이는 **`component`** prop 대신 특정 상황에서 컴포넌트를 렌더링하려는 경우에 유용합니다.

또한, **`Route`** 내부에서는 **`useRouteMatch`**와 같은 React Router의 훅을 이용하여 현재 라우트의 상태를 얻을 수 있습니다. 이를 통해 라우트에 따라 동적으로 데이터를 불러오는 등의 로직을 구현할 수 있습니다.

## 실제 적용 예시

리액트 라우터 돔은 웹 애플리케이션에서 라우팅을 효율적으로 관리하는 데 큰 도움이 됩니다. 이제 실제 프로젝트에서 어떻게 적용하는지 살펴봅시다.

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import NotFoundPage from './NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

이 예시에서는 먼저 BrowserRouter로 앱을 감싸서 라우터 컨텍스트를 사용할 수 있게 합니다. 그런 다음 Routes 컴포넌트를 사용하여 여러 Route를 정의합니다. 각 Route는 특정 경로(path prop)에 대해 렌더링할 컴포넌트(element prop)를 지정합니다.

## 주의 사항 및 자주 하는 실수

BrowserRouter: 브라우저 히스토리가 작동하는 환경에서만 사용해야 합니다. 서버사이드 렌더링이나 정적 파일 서버에서는 작동하지 않습니다.

Routes와 Route: Routes는 모든 Route를 포함해야 합니다. Route는 Routes 외부에서 독립적으로 사용하면 안 됩니다.

경로 일치: path prop에 지정된 경로 패턴은 정확하게 일치해야 합니다. 'fuzzy' 일치가 아닌 'exact' 일치를 사용합니다.

- 경로: 이 경로는 모든 경로에 일치하므로 항상 마지막에 위치해야 합니다.

## 정리 및 결론

이 글에서는 리액트 라우터 돔의 핵심 컴포넌트인 BrowserRouter, Routes, Route에 대해 알아보았습니다. 이들은 프론트엔드 라우팅을 구현하는 데 필수적이며, SPA에서 페이지 간 이동을 관리하는 데 효과적입니다.

## References

[jundev](https://jundev.vercel.app/react%EC%99%80-history-api%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-react-router-dom-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0#e72023a134784bd3ad15aa64f499470b)
