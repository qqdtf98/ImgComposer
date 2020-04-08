import { mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  styleData: CSSStyleDeclaration | null
  target: HTMLElement | null
  changedData: {
    payload: HTMLElement
    style: string
    value: string
  } | null
} = () => ({
  styleData: null,
  target: null,
  changedData: null,
})

export const mutations = mutationTree(state, {
  SET_STYLE_DATA: (state, style) => (state.styleData = style),
  SET_TARGET: (state, target) => (state.target = target),
  SET_CHANGED_DATA: (state, data) => (state.changedData = data),
})
