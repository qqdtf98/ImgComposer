import { File } from '@/interfaces/any-editor-file'
import cssom from 'cssom'
import { actionTree, mutationTree } from 'nuxt-typed-vuex'

type EditorInfoState = {
  /** 사용자가 열었던 파일 리스트 저장 */
  openedFiles: File[]
  /**  현재 열려있는 ㄴ파일 */
  activeFileIndex: number | null
  /**  선택된 element에 적용된 cssStyleRule[] */
  matchedCssRules: CSSStyleRule[]
  /**  선택된 element에 적용된 css 중에 사용자가 선택한 cssStyleRule */
  selectedCssRule: CSSStyleRule | null
  /**  파일 전체에 사용된 cssStyleRule[] */
  parsedCssRules: cssom.CSSRule[]
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
  SET_PARSED_CSS_RULES: (state, rules: cssom.CSSRule[]) =>
    (state.parsedCssRules = rules),
})

export const actions = actionTree(
  {
    state,
    mutations,
  },
  {
    storeOpenedFiles({ commit, state }, file: File) {
      if (file.fileType === 'html') {
        const newList: File[] = [...state.openedFiles]
        if (!newList.find((e) => e.fileName === file.fileName)) {
          newList.push(file)
          commit('SET_OPENED_FILES', newList)
        }
      }
    },
  }
)
