import { File, SampleType } from '@/interfaces/any-editor-file.ts'

import apiUrl from '../modules/api-url'
import axios from 'axios'

type updateType = {
  file_seq: number
  contents: string
}

class FileService {
  async deleteFile(seq: number) {
    return await axios.post(apiUrl.file.delete.url, {
      files: [{ file_seq: seq }],
    })
  }

  async updateFileName(file: File, targetName: string, type: string) {
    return await axios.post(apiUrl.file.update.url, {
      files: [
        {
          file_seq: file.fileId,
          file_name: targetName,
          file_path:
            file.filePath.split(file.fileName)[0] + targetName + '.' + type,
        },
      ],
    })
  }

  async createFile(file: SampleType) {
    return await axios.post(apiUrl.file.create.url, {
      files: [file],
    })
  }

  // async checkFileName(seq, type, name) {
  //   return await axios(apiUrl.file.checkName.url, {
  //     params: {
  //       folder_seq: seq,
  //       file_type: type,
  //       file_name: name,
  //     },
  //   })
  // }

  async updateFileContents(files: updateType[]) {
    return await axios.post(apiUrl.file.update.url, {
      files,
    })
  }
}

export default new FileService()
