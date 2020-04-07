# Any Editor

Any Editor는 HTML과 CSS로 구성되어있는 웹 페이지를 프로그래밍 지식 없이 직관적인 UI로 편집할 수 있는 소프트웨어이다.

## Features

### 파일 로드

**변경사항**

`pair` 정보를 사용하지 않고 클라이언트에서 HTML 파일 내의 `<link />` 및 `<script />`로 짝을 짓는다.

**File**

```ts
interface File {
  path: string
  fileId: number
  fileName: string
  fileType: 'html' | 'css' | 'js'
  data: string
}
```

### Resolve CSS

페이지 HTML 마크업에 포함되어 있는 `link`는 로드 되지 않고 페이지에 적용되지 않으므로 서버에서 받아온 CSS 데이터를 `style`로 감싸서 `head`에 삽입한다.

**Life Cycle**

1. HTML 로드
2. 로드한 HTML 파일에 대해서만 stylesheet `<link />` 태그 분석
3. style 태그에 CSS seq 적용(`data-css-seq=""`)
4. `head`에 삽입
5. style 태그 제거하고 에디터에 로드

### HTML 편집 (Studio)

Studio 패널에서 드래그&드롭으로 HTML 마크업에 요소를 추가하거나 삭제할 수 있다.

**추가**

- Block: `div`
- Text: `h1` ~ `h6`, `p`
- Image: `img`
- Link(wrapper): `a`

**삭제**

**Attribute 편집**

### CSS 편집 (Styles)

HTML 마크업에 직접적으로 삽입되는 inner style 대신 class, id 등의 attribute을 직접 추가하거나 삭제하고 해당 attribute에 스타일을 적용하는 방식을 사용한다.

**Unit**

- px
- rem
- em

**Layouts**

- Position: `relative`, `absolute`, `fixed`
- Display: `block`, `inline-block`, `inline`, `flex`
- Margin
- Padding

**Dimension**

- Width
- Height
- Top, Right, Bottom Left (for `relative` position)

**Font**

- Familly
- Size
- Weight
- Color
- Line height
- Letter spacing

**Background**

- Color
- Gradient
- Image

**Border**

- Radius
- Width
- Color

**Effects**

- Opacity
- Shadow
  - Inner shadow
  - Outer shadow
- Transform
  - Scale
  - TranslateX
  - TranslateY

## 프로젝트 Style Guide

### Naming

- Class/Interface/Type: `PascalCase`
- Others: `camelCase`

**File names**

- JS/TS: `general-file.ts`
- Vue Component: `VueComponent.vue`
- Vuex Store: `storeModule.ts`
