import { TemplateType } from '@/interfaces/any-editor-file'
import { actionTree, mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  basicTemplates: TemplateType[]
  pageTemplates: TemplateType[]
  customTemplates: TemplateType[]
  selectCssFile: boolean
  selectorPosX: number
  selectorPosY: number
  /** template을 추가할 대상 */
  insertTarget: HTMLElement | null
  insertTemplate: TemplateType | null
  handleTemplateState: boolean
  editTemplateState: boolean
  handleTemplate: TemplateType | null
  handlerPosX: number
  handlerPosY: number
} = () => ({
  basicTemplates: [],
  pageTemplates: [],
  customTemplates: [],
  selectCssFile: false,
  selectorPosX: 0,
  selectorPosY: 0,
  insertTarget: null,
  insertTemplate: null,
  handleTemplateState: false,
  editTemplateState: false,
  handleTemplate: null,
  handlerPosX: 0,
  handlerPosY: 0,
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
  SET_HANDLE_TEMPLATE_STATE: (state, handleState: boolean) =>
    (state.handleTemplateState = handleState),
  SET_EDIT_TEMPLATE_STATE: (state, handleState: boolean) =>
    (state.editTemplateState = handleState),
  SET_HANDLE_TEMPLATE: (state, template: TemplateType) =>
    (state.handleTemplate = template),
  SET_HANDLER_POS_X: (state, pos: number) => (state.handlerPosX = pos),
  SET_HANDLER_POS_Y: (state, pos: number) => (state.handlerPosY = pos),
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
    deleteTemplateData({ commit, state }, index: number) {
      const newCustomTemplates = [...state.customTemplates]
      const deleteIndex = newCustomTemplates.findIndex(
        (elem) => elem.template_seq === index
      )
      newCustomTemplates.splice(deleteIndex, 1)
      commit('SET_CUSTOM_TEMPLATES', newCustomTemplates)
    },
  }
)
