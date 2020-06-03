import apiUrl from '@/modules/api-url'
import axios from 'axios'

class ProjectService {
  async getProjectList() {
    return await axios(apiUrl.project.list.url, {
      params: {
        user_id: 'lsm',
      },
    })
  }

  async getProjectData(seq: number) {
    return await axios(apiUrl.project.get.url, {
      params: {
        project_seq: seq,
      },
    })
  }

  async createNewProject(name: string) {
    return await axios.post(apiUrl.project.create.url, {
      projects: [
        {
          user_seq: 2,
          project_name: name,
        },
      ],
    })
  }
}

export default new ProjectService()
