---
date: 2024-06-10T18:32
authors: Jisu Kim
title: 'C++ 활용한 자료구조 - 배열'
description: 'C++ 자료구조 배열'
keywords: ['C 언어']
tags:
  - C 언어
---

- [C 언어 기초 정리](#c-언어-기초-정리)

<!--truncate-->

<br />

# C++ 활용한 자료구조 - 배열

## 목차

1. [소개](#소개)
2. [배열의 기초](#배열의-기초)
3. [배열의 기본 연산](#배열의-기본-연산)
4. [배열의 고급 연산](#배열의-고급-연산)
5. [다차원 배열](#다차원-배열)
6. [동적 배열](#동적-배열)
7. [STL을 활용한 배열](#stl을-활용한-배열)
8. [배열의 한계와 대안](#배열의-한계와-대안)
9. [실습 예제](#실습-예제)
10. [결론](#결론)
11. [추가 자료 및 참고 문헌](#추가-자료-및-참고-문헌)

## 소개

배열은 가장 기본적이면서도 중요한 자료구조 중 하나입니다. 배열을 활용할 때 요소를 추가하거나 삭제하는 기능은 매우 유용합니다. 이번 포스트에서는 C++에서 배열에 요소를 추가하고 삭제하는 함수를 구현해보겠습니다.

## 배열의 기초

배열은 동일한 타입의 데이터를 연속된 메모리 공간에 저장하는 자료구조입니다. 배열은 고정된 크기를 가지며, 각 요소는 인덱스를 통해 접근할 수 있습니다.

```cpp
int arr[5]; // 정수형 배열 선언
arr[0] = 10; // 배열의 첫 번째 요소에 값 할당
```

## 배열의 기본 연산

배열의 기본 연산에는 요소 접근, 수정, 크기 구하기, 순회 등이 있습니다.

```cpp
int arr[5] = {1, 2, 3, 4, 5};

// 요소 접근
int value = arr[2]; // value는 3

// 요소 수정
arr[1] = 10; // arr은 이제 {1, 10, 3, 4, 5}

// 배열 순회
for(int i = 0; i < 5; i++) {
    cout << arr[i] << " ";
}
```

## 배열의 고급 연산

배열의 고급 연산에는 정렬, 검색, 복사, 병합 등이 있습니다.

### 정렬

```cpp
sort(arr, arr + 5); // 배열 정렬
```

### 검색

```cpp
int idx = find(arr, arr + 5, 3) - arr; // 배열에서 값 3의 인덱스 찾기
```

## 다차원 배열

다차원 배열은 배열의 배열로, 주로 2차원 배열이 사용됩니다.

```cpp
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
```

## 동적 배열

동적 배열은 실행 시간에 크기를 결정할 수 있으며, `new`와 `delete` 키워드를 사용하여 메모리를 할당 및 해제합니다.

```cpp
int* dynArr = new int[5];
delete[] dynArr;
```

## STL을 활용한 배열

C++ 표준 라이브러리(STL)는 `std::array`와 `std::vector`를 제공하여 배열을 더욱 편리하게 사용할 수 있습니다.

### `std::array`

```cpp
array<int, 5> arr = {1, 2, 3, 4, 5};
```

### `std::vector`

```cpp
vector<int> vec = {1, 2, 3, 4, 5};
vec.push_back(6);
```

## 배열의 한계와 대안

배열은 고정 크기와 삽입/삭제의 어려움 등의 한계를 가지고 있습니다. 이러한 문제를 해결하기 위해 동적 배열이나 링크드 리스트 같은 다른 자료구조를 사용할 수 있습니다.

## 실습 예제

다음은 배열에 요소를 추가하고 삭제하는 함수의 구현 예제입니다.

### 배열에 요소 추가하기

```cpp
#include <bits/stdc++.h>
using namespace std;

void insert(int idx, int num, int arr[], int& len) {
    for(int i = len; i > idx; i--) {
        arr[i] = arr[i-1];
    }
    arr[idx] = num;
    len++;
}
```

### 배열에서 요소 삭제하기

```cpp
void erase(int idx, int arr[], int& len) {
    len--;
    for(int i = idx; i < len; i++) {
        arr[i] = arr[i+1];
    }
}
```

### 예제

```cpp
int main() {
    int arr[100] = {1, 2, 3, 4, 5};
    int len = 5;

    // 배열에 요소 추가
    insert(2, 99, arr, len);
    cout << "After inserting 99 at index 2: ";
    for(int i = 0; i < len; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    // 배열에서 요소 삭제
    erase(3, arr, len);
    cout << "After erasing element at index 3: ";
    for(int i = 0; i < len; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;

    return 0;
}
```

#### 출력

```
After inserting 99 at index 2: 1 2 99 3 4 5
After erasing element at index 3: 1 2 99 4 5
```

## 결론

배열에 요소를 추가하고 삭제하는 방법을 통해 배열을 보다 유연하게 활용할 수 있습니다. 이러한 기초적인 배열 조작은 더 복잡한 자료구조와 알고리즘의 기본이 되므로, 잘 이해하고 활용하는 것이 중요합니다. 앞으로도 다양한 자료구조와 그 활용법을 살펴보겠습니다.

## 추가 자료 및 참고 문헌

- [C++ Reference](https://en.cppreference.com/)
- [GeeksforGeeks - Arrays in C++](https://www.geeksforgeeks.org/arrays-in-cpp/)
- [C++ Programming Language, Bjarne Stroustrup](https://www.stroustrup.com/4th.html)
