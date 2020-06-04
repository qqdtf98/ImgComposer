# 개발 환경

Vue cli

Vue의 composition API

[참조](https://velog.io/@kyusung/Vue.js-3-Composition-API)

typescript

# 실행방법

`npm i`

`npm run dev`

# 컴포넌트 설명

Any Editor는 크게 `Composer` 와 `Editor` 두 가지 기능으로 나뉩니다.

`Composer`는 이미지 파일을 로드하여 컴포넌트 설계를 간편하게 할 수 있도록 하는 기능을 합니다.

`Editor`는 기존에 만들어놓은 웹사이트를 수정하거나 새로운 웹 페이지를 생성하는 기능을 합니다. 추후 html과 css 파일을 사용하여 특정 컴포넌트를 생성하는 기능이 추가되어야 합니다.

## Composer

`src/components/Composer/ImgMode`

### Side Panel

`VuexStore`

code mirror를 사용하여 state, mutation, actions에 대한 입력을 받습니다.

`Components`

이미지 위에 설계한 컴포넌트의 리스트를 나열합니다.

`DataTranser`

컴포넌트 간의 event, props, global event 전달에 대한 데이터를 생성하고 리스트를 보여줍니다.

### ImgLoad

`ViewHide`

이미지 위에 설계한 identifier들을 숨김/보임 기능을 합니다.

`ExpandPanel`

SidePanel을 확장시키는 기능을 합니다.

`ComponentsData`

identifier create, delete, resize, move

component 이름 입력 & 색깔 선정

DB 쿼리문 입력

컴포넌트 data 입력

`CompoLink`

페이지 이동 시 전달할 query, params의 key, value 값을 입력받습니다.

### Pages

```
<div v-show="showImgList" ref="gridRef" class="previews">
      <div
        v-for="(page, i) in store.identifier.pages"
        ref="imgRef"
        :key="i"
        class="image-wrapper"
      >
        <img
          id="page-img"
          :src="page.imageData"
          @click="openPage($event, page.imageData)"
          @mousedown="movePage"
        />
        <img
          src="@/assets/images/delete.svg"
          class="img-delete-icon"
          @click="deletePage(page)"
        />
      </div>
    </div>
```

Pages.vue내에 존재.

개별 컴포넌트로 구성되지는 않았으나 폴더 내의 파일 리스트를 이미지로 나열하는 기능을 합니다. 이미지 삭제, 순서 변경, 열기 기능을 합니다.

`Directory`

폴더 구조를 파일 탐색기 형태로 나타냈습니다. root 클릭 시 root 폴더로 이동하게 됩니다.

vuex.folderDirectory.currentList에 저장되어 있는 데이터들만 보이며, 이는 현재 선택한 폴더의 바로 하위 자식들입니다.

`File Tree`

폴더 구조를 트리 형태로 나타냈습니다. 선택한 폴더의 구조에 따라 동적으로 트리를 생성합니다.

## Editor
