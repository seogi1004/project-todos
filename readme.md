# Todos project

Webpack + TypeScript + Vue.js 조합으로 연습해보는 Todo List 프로젝트

## References

### Webpack

* [Documentation &gt; Guide &gt; Getting Started](https://webpack.js.org/guides/getting-started/)
* [Documentation &gt; Guide &gt; Asset Management](https://webpack.js.org/guides/asset-management/)
* [Documentation &gt; Guide &gt; Output Management](https://webpack.js.org/guides/output-management/)
* [Documentation &gt; Guide &gt; Development](https://webpack.js.org/guides/development/)
* [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)
* [TypeScript loader for webpack](https://github.com/TypeStrong/ts-loader)

### Vue Loader 15

* [Getting Started &gt; Manual Config](https://vue-loader.vuejs.org/guide/#manual-configuration)
* [Using Pre-Processors &gt; TypeScript](https://vue-loader.vuejs.org/guide/pre-processors.html#typescript)
* [CSS Modules](https://vue-loader.vuejs.org/guide/css-modules.html)

### Class-Style Vue Components

* [배우기 &gt; 가이드 &gt; TypeScript 지원 &gt; 클래스 스타일 Vue 컴포넌트](https://kr.vuejs.org/v2/guide/typescript.html#%ED%81%B4%EB%9E%98%EC%8A%A4-%EC%8A%A4%ED%83%80%EC%9D%BC-Vue-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)
* [vue-class-component](https://github.com/vuejs/vue-class-component)
* [vue-property-decorators](https://github.com/kaorun343/vue-property-decorator)

### Third party packages

* [Express](https://expressjs.com/ko/)
* [LokiJS](http://lokijs.org)

### 시행착오

#### Single File Component(SFC) with TypeScript

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

#### CSS Modules

CSS 모듈을 사용하려고 아래와 같이 설정을 넣었다...

```javascript
{
    test: /\.css$/,
    use: [
        'vue-style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                modules: true,
                // 요거 주목
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
