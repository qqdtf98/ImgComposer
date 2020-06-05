<template>
  <div v-show="vuex.templates.editTemplateState" id="template-editor">
    <div @click="closeTemplateEditor" class="bg"></div>
    <div class="template-editor-wrapper">
      <div class="html-wrapper">
        <div class="code-type">HTML</div>
        <div ref="htmlSection" class="html-template-section"></div>
      </div>

      <div class="css-wrapper">
        <div class="code-type">CSS</div>
        <div ref="cssSection" class="css-template-section"></div>
        <button class="update-btn">Update</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from '@vue/composition-api'
import CodeMirror from 'codemirror'
import AutoCloseBrackets from 'codemirror/addon/edit/closebrackets'
import MatchBrackets from 'codemirror/addon/edit/matchbrackets'
import AutoCloseTags from 'codemirror/addon/edit/closetag'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import { useVuex } from '../../../../modules/vue-hooks'
import prettier from 'prettier/standalone'
import parserHtml from 'prettier/parser-html'
import parserPostCss from 'prettier/parser-postcss'
import { format } from 'url'

export default defineComponent({
  setup(props, ctx) {
    const vuex = useVuex(ctx)

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

    let htmlCodeMirror: CodeMirror.Editor
    let cssCodeMirror: CodeMirror.Editor

    const htmlSection = ref<HTMLDivElement>()
    const cssSection = ref<HTMLDivElement>()

    onMounted(() => {
      if (htmlSection.value) {
        htmlCodeMirror = CodeMirror(htmlSection.value, {
          ...codeMirrorHtmlOptions,
          value: '',
        })

        htmlCodeMirror.setSize('100%', '100%')

        htmlCodeMirror.on('change', function (cm, change) {
          // if (vuex.codeMirror.htmlSectionIndex !== -1) {
          //   const valueType = {
          //     value: cm.getValue(),
          //     type: 'html',
          //     index: vuex.codeMirror.htmlSectionIndex,
          //   }
          //   vuex.fileData.updateFileValue(valueType)
          // }
        })
      }

      if (cssSection.value) {
        cssCodeMirror = CodeMirror(cssSection.value, {
          ...codeMirrorCssOptions,
          value: '',
        })
        cssCodeMirror.setSize('100%', '100%')

        cssCodeMirror.on('change', function (cm, change) {
          // if (vuex.codeMirror.cssSectionIndex !== -1) {
          //   const valueType = {
          //     value: cm.getValue(),
          //     type: 'css',
          //     index: vuex.codeMirror.cssSectionIndex,
          //   }
          //   vuex.fileData.updateFileValue(valueType)
          // }
        })
      }
    })

    // TODO code 넣으면 깨짐
    // TODO update
    watch(
      () => vuex.templates.editTemplateState,
      () => {
        if (!vuex.templates.handleTemplate) return
        const formattedHtml = prettier.format(
          vuex.templates.handleTemplate.html_code,
          {
            parser: 'html',
            plugins: [parserHtml],
          }
        )
        const formattedCss = prettier.format(
          vuex.templates.handleTemplate.css_code,
          {
            parser: 'css',
            plugins: [parserPostCss],
          }
        )
        htmlCodeMirror.setValue(formattedHtml)
        cssCodeMirror.setValue(formattedCss)
      }
    )

    function closeTemplateEditor() {
      vuex.templates.SET_EDIT_TEMPLATE_STATE(false)
    }

    return {
      htmlSection,
      cssSection,
      vuex,
      closeTemplateEditor,
    }
  },
})
</script>
<style lang="scss">
#template-editor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .bg {
    width: 100%;
    height: 100%;
    background-color: #464646;
    opacity: 0.8;
  }
  .template-editor-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 700px;
    border-radius: 10px;
    height: 420px;
    background-color: #8e8e8e;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: row;
    padding: 10px 20px;

    .html-wrapper,
    .css-wrapper {
      width: 50%;
      display: flex;
      flex-direction: column;
      margin: 8px;
      align-items: flex-end;

      .code-type {
        width: 100%;
        text-align: left;
        margin: 10px;
        padding: 0 0 0 10px;
        font-size: 20px;
      }
      .html-template-section,
      .css-template-section {
        width: 100%;
        height: 300px;
      }

      .update-btn {
        width: 80px;
        background-color: #ca9898;
        padding: 10px 10px;
        border-radius: 5px;
        margin-top: 13px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
