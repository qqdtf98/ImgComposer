import { getAccessorType, mutationTree } from 'nuxt-typed-vuex'
import * as editorInfo from './editorInfo'
import * as styleData from './styleData'

export const state = () => ({
  rootState: '',
})

export const mutations = mutationTree(state, {
  setRootState(state) {
    state.rootState = 'what'
  },
})

export const accessorType = getAccessorType({
  state,
  mutations,
  modules: {
    styleData,
    editorInfo,
  },
})
