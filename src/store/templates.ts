import { actionTree, mutationTree } from 'nuxt-typed-vuex'

import { TemplateType } from '@/interfaces/any-editor-file'

export const state: () => {
  basicTemplates: TemplateType[]
  pageTemplates: TemplateType[]
  customTemplates: TemplateType[]
  selectCssFile: boolean
  selectorPosX: number
  selectorPosY: number
  insertTarget: HTMLElement | null
  insertTemplate: TemplateType | null
} = () => ({
  basicTemplates: [],
  pageTemplates: [],
  customTemplates: [],
  selectCssFile: false,
  selectorPosX: 0,
  selectorPosY: 0,
  insertTarget: null,
  insertTemplate: null,
})

export const mutations = mutationTree(state, {
  SET_BASIC_TEMPLATES: (state, templates: TemplateType[]) =>
    (state.basicTemplates = templates),
  SET_PAGE_TEMPLATES: (state, templates: TemplateType[]) =>
    (state.pageTemplates = templates),
  SET_CUSTOM_TEMPLATES: (state, templates: TemplateType[]) =>
    (state.customTemplates = templates),
  SET_SELECT_CSS_FILE: (state, selectState: boolean) =>
    (state.selectCssFile = selectState),
  SET_SELECTOR_POS_X: (state, pos: number) => (state.selectorPosX = pos),
  SET_SELECTOR_POS_Y: (state, pos: number) => (state.selectorPosY = pos),
  SET_INSERT_TARGET: (state, elem: HTMLElement) => (state.insertTarget = elem),
  SET_INSERT_TEMPLATE: (state, template: TemplateType) =>
    (state.insertTemplate = template),
})

type AddTempType = {
  template: TemplateType
  type: string
}

export const actions = actionTree(
  { state, mutations },
  {
    addTemplateData({ commit, state }, data: AddTempType) {
      let newTemplates
      if (data.type === 'basic') {
        newTemplates = [...state.basicTemplates]
        newTemplates.push(data.template)
        commit('SET_BASIC_TEMPLATES', newTemplates)
      } else if (data.type === 'custom') {
        newTemplates = [...state.customTemplates]
        newTemplates.push(data.template)
        commit('SET_CUSTOM_TEMPLATES', newTemplates)
      } else if (data.type === 'page') {
        newTemplates = [...state.pageTemplates]
        newTemplates.push(data.template)
        commit('SET_PAGE_TEMPLATES', newTemplates)
      }
    },
  }
)
