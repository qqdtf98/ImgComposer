import { DataTransfer, NewData } from '@/interfaces/any-editor-file.ts'
import { actionTree, mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  eventTransfer: DataTransfer[]
  propsTransfer: DataTransfer[]
  globalTransfer: DataTransfer[]
} = () => ({
  eventTransfer: [],
  propsTransfer: [],
  globalTransfer: [],
})

export const mutations = mutationTree(state, {
  SET_EVENT_TRANSFER: (state, data: DataTransfer[]) =>
    (state.eventTransfer = data),
  SET_PROPS_TRANSFER: (state, data: DataTransfer[]) =>
    (state.propsTransfer = data),
  SET_GLOBAL_TRANSFER: (state, data: DataTransfer[]) =>
    (state.globalTransfer = data),
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
    addGlobalData({ commit, state }, newData: DataTransfer) {
      const globalTransfer = [...state.globalTransfer]
      globalTransfer.push(newData)
      commit('SET_GLOBAL_TRANSFER', globalTransfer)
    },
    updateEventData({ commit, state }, newData: NewData) {
      const newEvent: DataTransfer[] = [...state.eventTransfer]
      newEvent[newData.index] = newData.transfer
      commit('SET_EVENT_TRANSFER', newEvent)
    },
    updatePropsData({ commit, state }, newData: NewData) {
      const newProps: DataTransfer[] = [...state.propsTransfer]
      newProps[newData.index] = newData.transfer
      commit('SET_PROPS_TRANSFER', newProps)
    },
    updateGlobalData({ commit, state }, newData: NewData) {
      const newGlobal: DataTransfer[] = [...state.globalTransfer]
      newGlobal[newData.index] = newData.transfer
      commit('SET_GLOBAL_TRANSFER', newGlobal)
    },
  }
)
