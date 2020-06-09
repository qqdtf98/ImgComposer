import * as codeMirror from './codeMirror'
import * as composer from './composer'
import * as dataTransfer from './dataTransfer'
import * as editorInfo from './editorInfo'
import * as fileData from './fileData'
import * as folderDirectory from './folderDirectory'
import * as identifier from './identifier'
import * as openedFileIndex from './openedFileIndex'
import * as styleData from './styleData'
import * as templates from './templates'

import { actionTree, getAccessorType, mutationTree } from 'nuxt-typed-vuex'

export const state = () => ({
  rootState: '',
})

export const mutations = mutationTree(state, {
  setRootState(state) {
    state.rootState = 'what'
  },
})

export const actions = actionTree({ state, mutations }, {})

export const accessorType = getAccessorType({
  state,
  mutations,
  actions,
  modules: {
    styleData,
    editorInfo,
    fileData,
    composer,
    dataTransfer,
    identifier,
    folderDirectory,
    codeMirror,
    openedFileIndex,
    templates,
  },
})
