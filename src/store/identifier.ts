import {
  Identifiers,
  IdentifierType,
  NewIden,
} from '@/interfaces/any-editor-file.ts'
import { actionTree, mutationTree } from 'nuxt-typed-vuex'

type Page = {
  imageData: string
  identifiers: Identifiers
}

export const state: () => {
  pages: Page[]
  selectedPageIndex: number | null
  fileState: boolean
  /** @deprecated */
  identifierData: Identifiers
} = () => ({
  pages: [],
  selectedPageIndex: null,
  fileState: false,
  /** @deprecated */
  identifierData: [],
})

export const mutations = mutationTree(state, {
  SET_PAGES: (state, pages: Page[]) => (state.pages = pages),
  SET_SELECTED_PAGE_INDEX: (state, index: number) =>
    (state.selectedPageIndex = index),
  /** @deprecated */
  SET_IDEN_DATA: (state, iden: Identifiers) =>
    (state.pages[state.selectedPageIndex as number].identifiers = iden),
  SET_FILE_STATE: (state, current: boolean) => (state.fileState = current),
})

type Pos = {
  initX: number
  initY: number
}

type spliceData = {
  spliceIndex: number
  targetIndex: number
}

export const actions = actionTree(
  { state, mutations },
  {
    /**
     * Add a page to `pages` state
     */
    addPage({ commit, state }, page: Page) {
      const pages = [...state.pages]

      const lastIndex = pages.push(page) - 1

      commit('SET_PAGES', pages)

      commit('SET_SELECTED_PAGE_INDEX', lastIndex)
    },
    storeIden({ commit, state }, pos: Pos) {
      const newIdentifiers: Identifiers = [
        ...state.pages[state.selectedPageIndex as number].identifiers,
      ]
      const newIden: IdentifierType = {
        index:
          state.pages[state.selectedPageIndex as number].identifiers.length,
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
        compoName: '',
        compoData: [],
        nameWidth: 0,
        compoView: true,
        parentIndex: null,
        level: 0,
      }
      newIdentifiers.push(newIden)
      commit('SET_IDEN_DATA', newIdentifiers)
    },
    updateIden({ commit, state }, newData: NewIden) {
      const newIdentifiers: Identifiers = [
        ...state.pages[state.selectedPageIndex as number].identifiers,
      ]
      newIdentifiers[newData.index] = newData.identifier
      commit('SET_IDEN_DATA', newIdentifiers)
    },
    spliceIden({ commit, state }, index: number) {
      const newIdentifiers: Identifiers = [
        ...state.pages[state.selectedPageIndex as number].identifiers,
      ]
      newIdentifiers.splice(index, 1)
      commit('SET_IDEN_DATA', newIdentifiers)
    },
    movePage({ commit, state }, data: spliceData) {
      const newPages: Page[] = [...state.pages]
      newPages.splice(data.targetIndex + 1, 0, newPages[data.spliceIndex])
      newPages.shift()
      commit('SET_PAGES', newPages)
    },
    deletePage({ commit, state }, index: number) {
      const newPages: Page[] = [...state.pages]
      newPages.splice(index, 1)
      commit('SET_PAGES', newPages)
    },
  }
)
