import { getAccessorType, mutationTree } from 'nuxt-typed-vuex'
import * as fileModule from './fileModule'
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
    fileModule,
    styleData,
  },
})
