import { mutationTree } from 'nuxt-typed-vuex'

export const state = () =>
  ({
    styleData: null,
    target: null,
    changedData: null,
  } as {
    styleData: CSSStyleDeclaration
    target: HTMLElement
    changedData: {
      payload: HTMLElement
      style: string
      value: string
    }
  })

export const mutations = mutationTree(state, {
  SET_STYLE_DATA: (state, style) => (state.styleData = style),
  SET_TARGET: (state, target) => (state.target = target),
  SET_CHANGED_DATA: (state, data) => (state.changedData = data),
})
