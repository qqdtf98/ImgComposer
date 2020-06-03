import apiUrl from '@/modules/api-url'
import axios from 'axios'

class TemplateService {
  async getTemplateList() {
    return await axios(apiUrl.template.list.url, {
      params: {
        user_seq: 2,
      },
    })
  }
}

export default new TemplateService()
