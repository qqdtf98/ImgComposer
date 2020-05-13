import { actionTree, mutationTree } from 'nuxt-typed-vuex'

import { DataTransfer } from '@/interfaces/any-editor-file.ts'

export const state: () => {
  eventTransfer: DataTransfer[]
  propsTransfer: DataTransfer[]
} = () => ({
  eventTransfer: [],
  propsTransfer: [],
})

export const mutations = mutationTree(state, {
  SET_EVENT_TRANSFER: (state, data: DataTransfer[]) =>
    (state.eventTransfer = data),
  SET_PROPS_TRANSFER: (state, data: DataTransfer[]) =>
    (state.propsTransfer = data),
})

export const actions = actionTree(
  { state, mutations },
  {
    addEventData({ commit, state }, newData: DataTransfer) {
      console.log('ee')
      const eventTransfer = [...state.eventTransfer]
      eventTransfer.push(newData)
      commit('SET_EVENT_TRANSFER', eventTransfer)
    },
    addPropsData({ commit, state }, newData: DataTransfer) {
      console.log('pp')
      const propsTransfer = [...state.propsTransfer]
      propsTransfer.push(newData)
      commit('SET_PROPS_TRANSFER', propsTransfer)
      console.log(state.propsTransfer)
    },
  }
)
