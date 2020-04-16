import { reactive } from '@vue/composition-api'
import { actionTree, mutationTree } from 'nuxt-typed-vuex'

type File = {
  fileId: number
  filePath: string
  fileName: string
  fileType: 'html' | 'css' | 'js'
  data: string
  htmlCssPair: cssPair[]
}

type dataType = {
  // eslint-disable-next-line camelcase
  file_seq: number
  // eslint-disable-next-line camelcase
  file_path: string
  // eslint-disable-next-line camelcase
  file_name: string
  // eslint-disable-next-line camelcase
  file_type: 'html' | 'css' | 'js'
  contents: string
  // eslint-disable-next-line camelcase
  html_css_pair: cssType[]
}

type cssPair = {
  htmlFileSeq: number
  cssFileSeq: number
}

type cssType = {
  // eslint-disable-next-line camelcase
  html_file_seq: number
  // eslint-disable-next-line camelcase
  css_file_seq: number
}

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
    storeFiles({ commit, dispatch, getters, state }, file: dataType) {
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
