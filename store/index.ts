import { getAccessorType, mutationTree } from 'nuxt-typed-vuex'
import * as fileModule from './fileModule'

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
    fileModule,
  },
})
