import { AnyEditorFile } from '@/interfaces/any-editor-file'
import { mutationTree } from 'nuxt-typed-vuex'

type EditorInfoState = {
  openedFiles: AnyEditorFile[]
  activeFileIndex: number | null
}

export const state = () =>
  ({
    openedFiles: [],
    activeFileIndex: null,
  } as EditorInfoState)

export const mutations = mutationTree(state, {
  SET_OPENED_FILES: (state, files: EditorInfoState['openedFiles']) =>
    (state.openedFiles = files),
  SET_ACTIVE_FILE_INDEX: (state, index: number) =>
    (state.activeFileIndex = index),
})
