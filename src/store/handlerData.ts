import { mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  handlerTarget: HTMLElement | null
  handlerPosX: number
  handlerPosY: number
} = () => ({
  handlerTarget: null,
  handlerPosX: 0,
  handlerPosY: 0,
})

export const mutations = mutationTree(state, {
  SET_HANDLER_TARGET: (state, target: HTMLElement | null) =>
    (state.handlerTarget = target),
  SET_HANDLER_POS_X: (state, pos: number) => (state.handlerPosX = pos),
  SET_HANDLER_POS_Y: (state, pos: number) => (state.handlerPosY = pos),
})
