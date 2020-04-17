import axios from 'axios'
import apiUrl from '../modules/api-url'

class FileService {
  async deleteFile(seq: number) {
    return await axios.post(apiUrl.file.delete.url, {
      files: [{ file_seq: seq }],
    })
  }
}

export default new FileService()
