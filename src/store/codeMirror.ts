import { mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  htmlSectionValue: string | null
  cssSectionValue: string | null
} = () => ({
  htmlSectionValue: null,
  cssSectionValue: null,
})

export const mutations = mutationTree(state, {
  SET_HTML_SECTION: (state, section: string) =>
    (state.htmlSectionValue = section),
  SET_CSS_SECTION: (state, section: string) =>
    (state.cssSectionValue = section),
})
