[![GitHub issues](https://img.shields.io/github/issues/antop-dev/project-todos.svg)](https://github.com/antop-dev/project-todos/issues)
[![GitHub forks](https://img.shields.io/github/forks/antop-dev/project-todos.svg)](https://github.com/antop-dev/project-todos/network)
[![GitHub stars](https://img.shields.io/github/stars/antop-dev/project-todos.svg)](https://github.com/antop-dev/project-todos/stargazers)
[![GitHub license](https://img.shields.io/github/license/antop-dev/project-todos.svg)](https://github.com/antop-dev/project-todos/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/antop-dev/project-todos.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fantop-dev%2Fproject-todos)

# Todos project

Webpack + TypeScript + Vue.js + Express 연습 해보는 Todo List 프로젝트.

배포에 대한 사항은 고려되어 있지 않은 소소한 개발 연습 프로젝트입니다.

## Getting started

```
git clone https://github.com/antop-dev/project-todos.git
cd project-todos
npm install
```

```
npm run serve
```

```
http://localhost:3000/
```

## References

### Webpack

* [Documentation &gt; Guide &gt; Getting Started](https://webpack.js.org/guides/getting-started/)
* [Documentation &gt; Guide &gt; Asset Management](https://webpack.js.org/guides/asset-management/)
* [Documentation &gt; Guide &gt; Output Management](https://webpack.js.org/guides/output-management/)
* [Documentation &gt; Guide &gt; Development](https://webpack.js.org/guides/development/)
* [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)

### Typesciprt

* [TypeScript loader for webpack](https://github.com/TypeStrong/ts-loader)
* [TypeSearch](https://microsoft.github.io/TypeSearch/)
* [How to use a third party library in Typescript with or without its type definition file?](http://www.albertgao.xyz/2016/08/10/how-to-use-a-third-party-library-in-typescript-with-or-without-its-type-definition-file/)
* [Any Plans on including TypeScript definitions?](https://github.com/SortableJS/Vue.Draggable/issues/379)
* [Sortable &#35;options](https://github.com/RubaXa/Sortable#options)

### Vue Loader 15

* [Getting Started &gt; Manual Config](https://vue-loader.vuejs.org/guide/#manual-configuration)
* [Using Pre-Processors &gt; TypeScript](https://vue-loader.vuejs.org/guide/pre-processors.html#typescript)
* [CSS Modules](https://vue-loader.vuejs.org/guide/css-modules.html)

### Class-Style Vue Components

* [배우기 &gt; 가이드 &gt; TypeScript 지원 &gt; 클래스 스타일 Vue 컴포넌트](https://kr.vuejs.org/v2/guide/typescript.html#%ED%81%B4%EB%9E%98%EC%8A%A4-%EC%8A%A4%ED%83%80%EC%9D%BC-Vue-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)
* [vue-class-component](https://github.com/vuejs/vue-class-component)
* [vue-property-decorators](https://github.com/kaorun343/vue-property-decorator)

### Design

* [Vuetify](https://vuetifyjs.com/ko)
* [Material Design](https://material.io)
* [Metrial Design Icons](http://google.github.io/material-design-icons/)

### Third party packages

* [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
* [Express](https://expressjs.com/ko/)
* [SQLite Node.js](http://www.sqlitetutorial.net/sqlite-nodejs)

## 시행착오

### Single File Component(SFC) with TypeScript

자꾸 이거 빠트려서 애먹었다.. ㅠㅠ

```html
<template>

</template>

<script lang="ts">
    // lang="ts" 잊지 말자...
    ..
</script>

<style scoped module>
    ...
</style>
```

### CSS Modules

CSS 모듈을 사용하려고 아래와 같이 설정을 넣었다...

```
{
    test: /\.css$/,
    use: [
        'vue-style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                // 아래 두 개 주목!
                modules: true,
                localIdentName: '[local]_[hash:base64:8]'
            }
        }
    ]
}
```

Vue 싱글파일 컴포넌트 작성할 때 아래처럼 일반적으로(?) 사용하게 되면

```html
<template>
    ...
    <span class="link" @click="remove">x</span>
</template>

<script lang="ts">
    ...
</script>

<style scoped>
    .link {
        cursor: pointer;
        font-weight: bold;
        color: red;
    }
</style>
```

아래처럼 CSS는 `스타일명_해시8자리`로 나오는데 HTML 태그는 `스타일명` 으로 나오면서 불일치하게 된다.

```html
<style type="text/css">
/* 설정 한대로 해시태그가 붙어서 생성 되었다. */
.link_2HwuedkQ[data-v-33df0029] {
    cursor: pointer;
    font-weight: bold;
    color: red;
}
</style>

<div data-v-33df0029="" data-v-3de47834="">
    <input data-v-33df0029="" type="checkbox">a
    <!-- class 속성값이 "link_2HwuedkQ"가 아니다!!! -->
    <span data-v-33df0029="" class="link">x</span>
</div>
``` 

아래와 같이 사용해야 한다.

```html
<template>
    ...
    <!-- v-bind 사용 -->
    <span :class="$style.link" @click="remove">x</span>
</template>

<script lang="ts">
    ...
</script>

<!-- module 속성 추가 -->
<style scoped module>
    .link {
        cursor: pointer;
        font-weight: bold;
        color: red;
    }
</style>
```

### TS2564: Property '...' has no initializer and is not definitely assigned in the constructor.

TypeScript 2.7 부터 컴파일 옵션 중 `strict: true`일 경우 클래스 속성의 값이 초기화 되어 있어야 한다.

```typescript
class Person {
    firstName: string;
    lastName: string;
}
```
 
위와 같이 작성 하고 컴파일을 하게 되면 TS2564 에러가 발생한다.

1. 해결방법으로는 속성 선언시 `!:`로 선언 하는 방법

```typescript
class Person {
    firstName!: string;
    lastName!: string;
}
```

2. 컴파일 설정에서 `strictPropertyInitialization` 값을 `false`로 한다.

```json
{
  "compilerOptions": {
    "strict": true,
    "strictPropertyInitialization": false
  }
}
```

[Strict Property Initialization Checks in TypeScript 2.7](https://hk.saowen.com/a/496168b33f7312485c463935eda3db511cb06f0f30060d7c57c1e500875c706e)

### component lists rendered with v-for should have explicit keys

v-for 디렉티브 사용시 :key 속성을 선언하지 않으면 빌드시에 아래와 같은 경고가 난다.

```
WARNING in ./src/client/components/TodoList.vue?vue&type=template&id=144cd6d2&scoped=true& (./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/client/components/TodoList.vue?vue&type=
    template&id=144cd6d2&scoped=true&)
    Module Warning (from ./node_modules/vue-loader/lib/loaders/templateLoader.js):
    (Emitted value instead of an instance of Error) <todo-item v-for="item in items">: component lists rendered with v-for should have explicit keys. See https://vuejs.org/guide/list.html#key for more info.
     @ ./src/client/components/TodoList.vue?vue&type=template&id=144cd6d2&scoped=true& 1:0-224 1:0-224
     @ ./src/client/components/TodoList.vue
     @ ./src/client/index.ts
```

