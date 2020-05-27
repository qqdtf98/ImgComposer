import { mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  htmlSectionValue: string | null
  cssSectionValue: string | null
  htmlSectionIndex: number
  cssSectionIndex: number
} = () => ({
  htmlSectionValue: null,
  cssSectionValue: null,
  htmlSectionIndex: -1,
  cssSectionIndex: -1,
})

export const mutations = mutationTree(state, {
  SET_HTML_SECTION_VALUE: (state, section: string) =>
    (state.htmlSectionValue = section),
  SET_CSS_SECTION_VALUE: (state, section: string) =>
    (state.cssSectionValue = section),
  SET_HTML_SECTION_INDEX: (state, index: number) =>
    (state.htmlSectionIndex = index),
  SET_CSS_SECTION_INDEX: (state, index: number) =>
    (state.cssSectionIndex = index),
})
