import { actionTree, mutationTree } from 'nuxt-typed-vuex'

export const state = () => ({
  files: [],
})

export const mutations = mutationTree(state, {
  PUSH: (state) => state.files.push('file 1'),
})

export const actions = actionTree({ state, mutations }, {})
