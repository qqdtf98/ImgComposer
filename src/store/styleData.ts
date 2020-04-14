import { mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  styleData: CSSStyleDeclaration | null
  target: HTMLElement | null
} = () => ({
  styleData: null,
  target: null,
})

export const mutations = mutationTree(state, {
  SET_STYLE_DATA: (state, style) => (state.styleData = style),
  SET_TARGET: (state, target) => (state.target = target),
})
