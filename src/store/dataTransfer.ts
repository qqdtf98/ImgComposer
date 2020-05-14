import { DataTransfer, NewData } from '@/interfaces/any-editor-file.ts'
import { actionTree, mutationTree } from 'nuxt-typed-vuex'

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
      const eventTransfer = [...state.eventTransfer]
      eventTransfer.push(newData)
      commit('SET_EVENT_TRANSFER', eventTransfer)
    },
    addPropsData({ commit, state }, newData: DataTransfer) {
      const propsTransfer = [...state.propsTransfer]
      propsTransfer.push(newData)
      commit('SET_PROPS_TRANSFER', propsTransfer)
    },
    updateEventData({ commit, state }, newData: NewData) {
      const newEvent: DataTransfer[] = [...state.eventTransfer]
      newEvent[newData.index] = newData.transfer
      commit('SET_EVENT_TRANSFER', newEvent)
    },
    updatePropsData({ commit, state }, newData: NewData) {
      const newProps: DataTransfer[] = [...state.eventTransfer]
      newProps[newData.index] = newData.transfer
      commit('SET_PROPS_TRANSFER', newProps)
    },
  }
)
