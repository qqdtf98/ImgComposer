import { actionTree, mutationTree } from 'nuxt-typed-vuex'

type File = {
  fileId: number
  filePath: string
  fileName: string
  fileType: 'html' | 'css' | 'js'
  data: string
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
}

export const state: () => {
  fileList: File[]
} = () => ({
  fileList: [],
})

export const mutations = mutationTree(state, {
  SET_FILE_LIST: (state, files: File[]) => (state.fileList = files),
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
      }

      newList.push(newFile)
      commit('SET_FILE_LIST', newList)
    },
  }
)
