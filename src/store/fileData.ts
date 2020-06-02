import { File, cssPair, dataType } from '@/interfaces/any-editor-file'
import { actionTree, mutationTree } from 'nuxt-typed-vuex'

import { reactive } from '@vue/composition-api'
import { Vuex as vuex } from '@/modules/vuex'

export const state: () => {
  fileList: File[]
  selectedFile: File | null
  cssFileList: File[]
} = () => ({
  fileList: [],
  selectedFile: null,
  cssFileList: [],
})

export const mutations = mutationTree(state, {
  SET_FILE_LIST: (state, files: File[]) => (state.fileList = files),
  SET_SELECTED_FILE: (state, file: File) => (state.selectedFile = file),
  SET_CSS_FILE_LIST: (state, files: File[]) => (state.cssFileList = files),
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
      if (file.file_type === 'css') {
        const newCssList: File[] = [...state.cssFileList]
        newCssList.push(newFile)
        commit('SET_CSS_FILE_LIST', newCssList)
      }

      newList.push(newFile)
      commit('SET_FILE_LIST', newList)
    },
    removeFile({ commit, state }, fileId: number) {
      const newList: File[] = [...state.fileList]
      const idx = newList.findIndex(function (file: File) {
        return file.fileId === fileId
      })
      if (idx > -1) newList.splice(idx, 1)
      commit('SET_FILE_LIST', newList)
    },
    updateFileValue({ commit, state }, { value, type, index }) {
      if (type === 'html') {
        const newSelectedFile = { ...state.selectedFile } as File
        newSelectedFile.data = value
        commit('SET_SELECTED_FILE', newSelectedFile)
        const newFileList = [...state.fileList]
        const newFileIndex = state.fileList.findIndex(
          (elem) => elem.fileId === newSelectedFile.fileId
        )
        const newFile = { ...state.fileList[newFileIndex] }
        newFile.data = value
        newFileList.splice(newFileIndex, 1, newFile)
        commit('SET_FILE_LIST', newFileList)
      } else if (type === 'css') {
        const newFileList = [...state.fileList]
        let newFileIndex = state.fileList.findIndex(
          (elem) => elem.fileId === index
        )
        let newFile = { ...state.fileList[newFileIndex] }
        newFile.data = value
        newFileList.splice(newFileIndex, 1, newFile)
        commit('SET_FILE_LIST', newFileList)
        const newCssList = [...state.cssFileList]
        newFileIndex = state.cssFileList.findIndex(
          (elem) => elem.fileId === index
        )
        newFile = { ...state.cssFileList[newFileIndex] }
        newFile.data = value
        newCssList.splice(newFileIndex, 1, newFile)
        commit('SET_CSS_FILE_LIST', newCssList)
      }
    },
    addFileValue({ commit, state }, { value, title }) {
      const newFileList = [...state.fileList]
      let newFileIndex = state.fileList.findIndex(
        (elem) => elem.fileName === title
      )
      let newFile = { ...state.fileList[newFileIndex] }
      newFile.data = newFile.data + value
      newFileList.splice(newFileIndex, 1, newFile)

      newFile = { ...state.fileList[vuex.store.codeMirror.htmlSectionIndex] }
      const iframe = document.querySelector('#main-iframe') as HTMLIFrameElement
      // newFile.data = iframe.
      // TODO class나 id가 추가된 iframe의 innerHTML을 가지고와서 저장하기
      // console.log(iframe.contentDocument?.documentElement.innerHTML)
      commit('SET_FILE_LIST', newFileList)

      const newCssList = [...state.cssFileList]
      newFileIndex = state.cssFileList.findIndex(
        (elem) => elem.fileName === title
      )
      newFile = { ...state.cssFileList[newFileIndex] }
      newFile.data = newFile.data + value
      newCssList.splice(newFileIndex, 1, newFile)
      commit('SET_CSS_FILE_LIST', newCssList)
    },
  }
)
