import {
  ArrowType,
  Arrows,
  IdentifierType,
} from '@/interfaces/any-editor-file.ts'
import { actionTree, mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  arrowData: Arrows
} = () => ({
  arrowData: [],
})

export const mutations = mutationTree(state, {
  SET_ARROW_DATA: (state, arrows: Arrows) => (state.arrowData = arrows),
})

type UpdateArrow = {
  index: number
  compo: IdentifierType
}

export const actions = actionTree(
  { state, mutations },
  {
    createArrow({ commit, state }, startCompo: IdentifierType) {
      const newArrows: Arrows = [...state.arrowData]
      const newArrow: ArrowType = {
        startCompo,
        endCompo: null,
      }
      newArrows.push(newArrow)
      commit('SET_ARROW_DATA', newArrows)
    },
    updateArrow({ commit, state }, updateArrow: UpdateArrow) {
      const newArrows: Arrows = [...state.arrowData]
      const newArrow: ArrowType = { ...newArrows[updateArrow.index] }
      newArrow.endCompo = updateArrow.compo
      newArrows.splice(updateArrow.index, 1, newArrow)
      commit('SET_ARROW_DATA', newArrows)
    },
  }
)
