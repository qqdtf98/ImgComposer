<template>
  <div>
    <MenuBar />
    <Tabs />
    <Canvas />
    <StylesPanel />
    <StudioPanel />
    <CodeEditor />
    <CssFileSelector />
    <TemplateHandler />
    <TemplateEditor />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import MenuBar from './MenuBar/index.vue'
import Canvas from './Canvas/index.vue'
import Tabs from './Tabs/index.vue'
import StylesPanel from './StylesPanel/index.vue'
import StudioPanel from './StudioPanel/index.vue'
import { useVuex } from '@/modules/vue-hooks'
import ProjectService from '@/services/project-service'
import CodeEditor from './CodeEditor/index.vue'
import CssFileSelector from '@/components/Editor/StudioPanel/StudioTemplateList/CssFileSelector.vue'
import TemplateHandler from '@/components/Editor/StudioPanel/StudioTemplateList/TemplateHandler.vue'
import { TemplateType } from '../../interfaces/any-editor-file'
import TemplateService from '@/services/template-service'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import TemplateEditor from '@/components/Editor/StudioPanel/StudioTemplateList/TemplateEditor.vue'

export default defineComponent({
  components: {
    MenuBar,
    Canvas,
    Tabs,
    StylesPanel,
    StudioPanel,
    CodeEditor,
    TemplateHandler,
    CssFileSelector,
    TemplateEditor,
  },
  props: {
    projectId: Number,
  },
  setup(props, ctx) {
    const vuex = useVuex(ctx)
    onMounted(async () => {
      const { projectId } = props

      if (!projectId) {
        alert('프로젝트 ID가 없습니다.')
        return
      }

      // projectId로 data 받아와서 vuex에 저장
      const res = await ProjectService.getProjectData(projectId)
      if (res.data.responseCode === 'SUCCESS') {
        const folders = res.data.data.folders
        for (const i in folders) {
          for (const j in folders[i].files) {
            vuex.fileData.storeFiles(folders[i].files[j])
          }
        }
      }

      // 페이지가 로드될 때 template 데이터를 받아와서 vuex에 저장
      TemplateService.getTemplateList().then((res: AxiosResponse) => {
        if (res.data.responseCode === 'SUCCESS') {
          const templateList = res.data.data as TemplateType[]
          for (const temp of templateList) {
            vuex.templates.addTemplateData({
              template: temp,
              type: temp.category.category_name,
            })
          }
        }
      })
    })
    return {}
  },
})
</script>
