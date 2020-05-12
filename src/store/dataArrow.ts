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
  arrow: ArrowType
}

type CreateArrow = {
  index: number
  compo: IdentifierType
  startX: number
  startY: number
}

export const actions = actionTree(
  { state, mutations },
  {
    createArrow({ commit, state }, createArrow: CreateArrow) {
      const newArrows: Arrows = [...state.arrowData]
      const newArrow: ArrowType = {
        startCompo: createArrow.compo,
        endCompo: null,
        index: createArrow.index,
        startX: createArrow.startX,
        startY: createArrow.startY,
        endX: -1,
        endY: -1,
        degree: 0,
        arrowState: false,
      }
      newArrows.push(newArrow)
      commit('SET_ARROW_DATA', newArrows)
    },
    updateArrow({ commit, state }, updateArrow: UpdateArrow) {
      const newArrows: Arrows = [...state.arrowData]
      newArrows[updateArrow.index] = updateArrow.arrow
      commit('SET_ARROW_DATA', newArrows)
    },
  }
)
