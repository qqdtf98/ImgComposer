import { actionTree, mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  openedFileIndexList: Set<number>
} = () => ({
  openedFileIndexList: new Set(),
})

export const mutations = mutationTree(state, {
  SET_OPENED_FILE_INDEX_LIST: (state, fileList: Set<number>) =>
    (state.openedFileIndexList = fileList),
})

export const actions = actionTree(
  {
    state,
    mutations,
  },
  {
    storeFileIndex({ commit, state }, file: number) {
      const newSet: Set<number> = new Set(state.openedFileIndexList)
      newSet.add(file)
      commit('SET_OPENED_FILE_INDEX_LIST', newSet)
    },
  }
)
