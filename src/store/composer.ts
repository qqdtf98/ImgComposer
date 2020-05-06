import { mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  optionsViewMode: 'visible' | 'hidden'
} = () => ({
  optionsViewMode: 'visible',
})

export const mutations = mutationTree(state, {
  SET_OPTIONS_VIEW_MODE: (state, mode: 'visible' | 'hidden') =>
    (state.optionsViewMode = mode),
})
