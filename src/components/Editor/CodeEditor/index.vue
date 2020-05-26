<template>
  <div id="code-editor">
    <button @click="activateCodeEditor" class="code-on-btn">
      <div>Code Editor</div>
      <img class="code-arrow" src="@/assets/images/rightarrow.svg" />
    </button>
    <div class="code-mirror-section">
      <div ref="htmlSection" class="html-section"></div>
      <div ref="cssSection" class="css-section"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import CodeMirror from 'codemirror'
import AutoCloseBrackets from 'codemirror/addon/edit/closebrackets'
import MatchBrackets from 'codemirror/addon/edit/matchbrackets'
import AutoCloseTags from 'codemirror/addon/edit/closetag'
import HighlightSelectionMatches from 'codemirror/addon/search/match-highlighter'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'

export default defineComponent({
  setup() {
    const htmlSection = ref<HTMLDivElement>()
    const cssSection = ref<HTMLDivElement>()

    const codeMirrorCssOptions: CodeMirror.EditorConfiguration = {
      mode: 'css',
      tabSize: 2,
      lineWrapping: true,
      viewportMargin: 20,
      autoCloseBrackets: AutoCloseBrackets,
      matchBrackets: MatchBrackets,
      lineNumbers: true,
    }
    const codeMirrorHtmlOptions: CodeMirror.EditorConfiguration = {
      mode: 'htmlmixed',
      tabSize: 2,
      lineWrapping: true,
      viewportMargin: 20,
      autoCloseBrackets: AutoCloseBrackets,
      matchBrackets: MatchBrackets,
      lineNumbers: true,
    }

    onMounted(() => {
      if (htmlSection.value) {
        const htmlCodeMirror = CodeMirror(htmlSection.value, {
          ...codeMirrorHtmlOptions,
          value: `<head>
</head>
<body>
  <div class="aa"></div>
</body>
`,
        })
        htmlCodeMirror.setSize('100%', '100%')
      }

      if (cssSection.value) {
        const cssCodeMirror = CodeMirror(cssSection.value, {
          ...codeMirrorCssOptions,
          value: `.a { 
   color:red;
    background-color: yellow
    }`,
        })
        cssCodeMirror.setSize('100%', '100%')
      }
    })
    function activateCodeEditor() {}

    return {
      activateCodeEditor,
      htmlSection,
      cssSection,
    }
  },
})
</script>

<style lang="scss">
#code-editor {
  .code-on-btn {
    padding: 10px 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 50%;
    background: #ffffff;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    border-radius: 6.69879px 6.69879px 0px 0px;
    transform: translateX(-50%);
    cursor: pointer;

    .code-arrow {
      transform: rotate(270deg);
      margin-left: 10px;
    }
  }

  .code-mirror-section {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 300px;

    .html-section,
    .css-section {
      border: 1px solid black;
      width: 50%;
      height: 100%;
    }
  }
}
</style>
