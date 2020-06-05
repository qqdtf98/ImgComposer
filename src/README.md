# 개발 환경

Vue cli

Vue의 composition API

[참조](https://velog.io/@kyusung/Vue.js-3-Composition-API)

typescript

Nuxt.js

# 실행방법

`npm i`

`npm run dev`

# 컴포넌트 설명

Any Editor는 크게 `Composer` 와 `Editor` 두 가지 기능으로 나뉩니다.

`Composer`는 이미지 파일을 로드하여 컴포넌트 설계를 간편하게 할 수 있도록 하는 기능을 합니다.

`Editor`는 기존에 만들어놓은 웹사이트를 수정하거나 새로운 웹 페이지를 생성하는 기능을 합니다. 추후 html과 css 파일을 사용하여 특정 컴포넌트를 생성하는 기능이 추가되어야 합니다.

## Composer

**_src/components/Composer/ImgMode_**

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

<br>

## Editor

**_src/components/Editor_**

### Canvas

```
 <iframe
      id="main-iframe"
      ref="iframeRef"
      frameborder="0"
      :class="mergeClassNames(iframeClassName)"
    ></iframe>
```

Canvas.vue에 존재.

편집할 html 파일을 로드합니다.

`Context`

user가 선택한 element의 css selector을 나열.

selector의 이름, type(class / id)를 입력받음.

`CssFileSelector`

프로젝트 내의 css file list를 나열.

css file에 추가할 코드 생성.

`ContextHandler`

selector 이름 변경 기능 (추후 구현 필요)

selector 삭제 기능

`./modules`

- Marker: 유저가 선택한 element를 표시
- Selector: 유저가 mouseover한 target을 표시

### Code Editor

html 파일과 css 파일을 code editor를 사용하여 직접 편집할 수 있습니다.

Code Mirror를 사용하여 htmlCodeMirror, cssCodeMirror를 생성하였습니다. codeMirror가 변화할 때의 기능, editor 열기/닫기, resize의 기능이 있습니다.

[참조](https://codemirror.net/doc/manual.html#events)

### FileListPanel

`FileList`

현재 프로젝트의 파일리스트를 보여줍니다.

FileContext, FolderContext를 열고 닫는 기능이 있으며 새로운 파일 생성 시 사용자로부터 파일이름을 받아와 저장합니다.

### MenuBar

화면 상단의 메뉴 바 입니다.

UI만 구현되어 있으며 추후 기능 구현이 필요합니다.

### StudioPanel

단순한 기본 템플릿을 담고 있는 `BasicTemplates`, 페이지 기본 템플릿을 담고 있는 `PageTemplates`, 사용자가 직접 업로드한 `CustomTemplates`가 있습니다.

`TemplateCompo`

BasicTemplates, PageTemplates, CustomTemplates를 구성하는 단일 template 컴포넌트입니다.

template을 드래그&드롭을 사용하여 iframe에 삽입하는 부분이 구현되어 있습니다.

`TemplateHandler`

사용자가 선택한 CustomTemplate을 삭제하는 부분이 구현되어 있습니다.

`TemplateEditor`

사용자가 선택한 customTemplate을 로드하여 code mirror를 사용해 수정할 수 있습니다.

### StylesPanel

UI 상으로 css를 쉽게 수정할 수 있습니다. 사용자가 css selector 선택 시 이를 저장하여 StylesPanel에서 수정한 내용을 해당 selector에 적용시킵니다.

각 css 속성에 따라 컴포넌트가 분리되어 있습니다.

### Tabs

화면 상단에 위치하며 파일을 열 때 tab이 추가됩니다.

# store 폴더

**_src/store_**

vuex store에 저장할 데이터들을 정의해두었습니다.

# interfaces 폴더

**_src/interfaces/any-editor-file_**

여러 파일에서 사용하는 type들을 정의해두었습니다.

# services 폴더

**_src/services_**

각 기능의 api 통신 함수가 구현되어있습니다.

`file-service`, `project-service`, `template-service`로 구성되어있습니다.

# modules 폴더

# npm 모듈 설명

color-picker: Chrome
