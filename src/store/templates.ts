import { TemplateType } from '@/interfaces/any-editor-file'
import { mutationTree } from 'nuxt-typed-vuex'

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
  basicTemplates: [
    {
      category: {
        category_seq: 1,
        category_name: 'basic',
      },
      template_seq: 1,
      template_name: 'button',
      html_code: '<button class="sample-btn">button</button>',
      css_code: '.sample-btn{ color: yellow; background-color:green;}',
    },
    {
      category: {
        category_seq: 1,
        category_name: 'basic',
      },
      template_seq: 2,
      template_name: 'paragraph',
      html_code: '<p class="sample-para">paragraph</p>',
      css_code: '.sample-para{ color: red; background-color:orange;}',
    },
  ],
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
