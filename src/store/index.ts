import * as composer from './composer'
import * as dataArrow from './dataArrow'
import * as editorInfo from './editorInfo'
import * as fileData from './fileData'
import * as identifier from './identifier'
import * as styleData from './styleData'

import { getAccessorType, mutationTree } from 'nuxt-typed-vuex'

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
    fileData,
    composer,
    identifier,
    dataArrow,
  },
})
