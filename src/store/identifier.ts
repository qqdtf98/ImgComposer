import {
  IdentifierType,
  Identifiers,
  NewIden,
} from '@/interfaces/any-editor-file.ts'
import { actionTree, mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  identifierData: Identifiers
} = () => ({
  identifierData: [],
})

export const mutations = mutationTree(state, {
  SET_IDEN_DATA: (state, iden: Identifiers) => (state.identifierData = iden),
})

type Pos = {
  initX: number
  initY: number
}

export const actions = actionTree(
  { state, mutations },
  {
    storeIden({ commit, state }, pos: Pos) {
      const newIdentifiers: Identifiers = [...state.identifierData]
      const newIden: IdentifierType = {
        index: state.identifierData.length,
        left: pos.initX,
        top: pos.initY,
        width: 0,
        height: 0,
        color: 'black',
        calWidth: 0,
        calHeight: 0,
        calLeft: 0,
        calTop: 0,
        state: false,
        url: null,
        queries: null,
        params: null,
      }
      newIdentifiers.push(newIden)
      commit('SET_IDEN_DATA', newIdentifiers)
    },
    updateIden({ commit, state }, newData: NewIden) {
      const newIdentifiers: Identifiers = [...state.identifierData]
      newIdentifiers[newData.index] = newData.identifier
      commit('SET_IDEN_DATA', newIdentifiers)
      console.log(newIdentifiers)
    },
    spliceIden({ commit, state }, index: number) {
      const newIdentifiers: Identifiers = [...state.identifierData]
      newIdentifiers.splice(index, 1)
      commit('SET_IDEN_DATA', newIdentifiers)
    },
  }
)
