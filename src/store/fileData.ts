import { cssPair, dataType, File } from '@/interfaces/any-editor-file'
import { reactive } from '@vue/composition-api'
import { actionTree, mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  fileList: File[]
  selectedFile: File | null
} = () => ({
  fileList: [],
  selectedFile: null,
})

export const mutations = mutationTree(state, {
  SET_FILE_LIST: (state, files: File[]) => (state.fileList = files),
  SET_SELECTED_FILE: (state, file: File) => (state.selectedFile = file),
})

export const actions = actionTree(
  {
    state,
    mutations,
  },
  {
    storeFiles({ commit, state }, file: dataType) {
      const newList: File[] = [...state.fileList]
      // console.log(typeof file)
      const newFile: File = {
        fileId: file.file_seq,
        filePath: file.file_path,
        fileName: file.file_name,
        fileType: file.file_type,
        data: file.contents,
        htmlCssPair: [],
      }
      if (file.file_type === 'html') {
        let i
        if (!file.html_css_pair) return
        const cssPairList: cssPair[] = []

        for (i = 0; i < file.html_css_pair.length; i++) {
          const cssPair: cssPair = reactive({
            htmlFileSeq: file.html_css_pair[i].html_file_seq,
            cssFileSeq: file.html_css_pair[i].css_file_seq,
          })
          cssPairList.push(cssPair)
        }
        newFile.htmlCssPair = cssPairList
      }

      newList.push(newFile)
      commit('SET_FILE_LIST', newList)
    },
  }
)
