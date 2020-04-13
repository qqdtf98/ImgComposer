import { AnyEditorFile } from '@/interfaces/any-editor-file'
import { mutationTree } from 'nuxt-typed-vuex'

type EditorInfoState = {
  openedFiles: AnyEditorFile[]
  activeFileIndex: number | null
  matchedCssRules: CSSStyleRule[]
  selectedCssRule: CSSStyleRule | null
  parsedCssRules: CSSStyleRule[]
}

export const state = () =>
  ({
    openedFiles: [],
    activeFileIndex: null,
    matchedCssRules: [],
    selectedCssRule: null,
    parsedCssRules: [],
  } as EditorInfoState)

export const mutations = mutationTree(state, {
  SET_OPENED_FILES: (state, files: EditorInfoState['openedFiles']) =>
    (state.openedFiles = files),
  SET_ACTIVE_FILE_INDEX: (state, index: number) =>
    (state.activeFileIndex = index),
  SET_MATCHED_CSS_RULES: (state, rules: CSSStyleRule[]) =>
    (state.matchedCssRules = rules),
  SET_SELECTED_CSS_RULE: (state, rule: CSSStyleRule) =>
    (state.selectedCssRule = rule),
  SET_PARSED_CSS_RULES: (state, rules: CSSStyleRule[]) =>
    (state.parsedCssRules = rules),
})
