import { TemplateType } from '@/interfaces/any-editor-file'
import { mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
  basicTemplates: TemplateType[]
  pageTemplates: TemplateType[]
  customTemplates: TemplateType[]
} = () => ({
  basicTemplates: [
    {
      category: {
        category_seq: 1,
        category_name: 'basic',
      },
      template_seq: 1,
      template_name: 'button',
      html_code: '<p class="sample-btn>button</button>',
      css_code: '.sample-btn{ color: yellow; background-color:green;}',
    },
    {
      category: {
        category_seq: 1,
        category_name: 'basic',
      },
      template_seq: 2,
      template_name: 'paragraph',
      html_code: '<p class="sample-para>paragraph</p>',
      css_code: '.sample-para{ color: yellow; background-color:green;}',
    },
  ],
  pageTemplates: [],
  customTemplates: [],
})

export const mutations = mutationTree(state, {
  SET_BASIC_TEMPLATES: (state, templates: TemplateType[]) =>
    (state.basicTemplates = templates),
  SET_PAGE_TEMPLATES: (state, templates: TemplateType[]) =>
    (state.pageTemplates = templates),
  SET_CUSTOM_TEMPLATES: (state, templates: TemplateType[]) =>
    (state.customTemplates = templates),
})
