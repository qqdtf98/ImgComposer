import * as composer from './composer'
import * as dataTransfer from './dataTransfer'
import * as folderDirectory from './folderDirectory'
import * as identifier from './identifier'

import { actionTree, getAccessorType, mutationTree } from 'nuxt-typed-vuex'

export const state = () => ({
  rootState: '',
})

export const mutations = mutationTree(state, {
  setRootState(state) {
    state.rootState = 'what'
  },
})

export const actions = actionTree({ state, mutations }, {})

export const accessorType = getAccessorType({
  state,
  mutations,
  actions,
  modules: {
    composer,
    dataTransfer,
    identifier,
    folderDirectory,
  },
})
