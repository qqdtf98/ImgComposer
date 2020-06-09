import { TemplateUpdateType } from '@/interfaces/any-editor-file'
import apiUrl from '@/modules/api-url'
import axios from 'axios'

type deleteType = {
  template_seq: number
}

class TemplateService {
  async getTemplateList() {
    return await axios(apiUrl.template.list.url, {
      params: {
        user_seq: 2,
      },
    })
  }

  async deleteTemplate(templateSeq: deleteType[]) {
    return await axios.post(apiUrl.template.delete.url, {
      templates: templateSeq,
    })
  }

  async updateTemplate(template: TemplateUpdateType[]) {
    return await axios.post(apiUrl.template.update.url, {
      templates: template,
    })
  }
}

export default new TemplateService()
