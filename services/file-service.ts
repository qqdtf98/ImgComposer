import axios from 'axios'
import apiUrl from '../modules/api-url'

class FileService {
  async updateFile(editor, contents) {
    return await axios.post(apiUrl.file.update.url, {
      files: [
        {
          file_seq: editor.file_seq,
          folder_seq: editor.folder_seq,
          file_name: editor.file_name,
          file_path: editor.file_path,
          file_type: editor.file_type,
          contents,
        },
      ],
    })
  }

  async updateMultiFile(editor) {
    return await axios.post(apiUrl.file.update.url, {
      files: editor,
    })
  }

  async updateFileName(folder, file, targetName, type) {
    return await axios.post(apiUrl.file.update.url, {
      files: [
        {
          folder_seq: folder,
          file_seq: file.file_seq,
          file_name: targetName,
          file_path:
            file.file_path.split(file.text)[0] + targetName + '.' + type,
        },
      ],
    })
  }

  async createFile(file) {
    return await axios.post(apiUrl.file.create.url, {
      files: [file],
    })
  }

  async createTemplateFile(folder, name, path, type, contents) {
    return await axios.post(apiUrl.file.create.url, {
      file: [
        {
          folder_seq: folder,
          file_name: name,
          file_path: path,
          file_type: type,
          contents,
        },
      ],
    })
  }

  async deleteFile(seq) {
    return await axios.post(apiUrl.file.delete.url, {
      files: [{ file_seq: seq }],
    })
  }

  async checkFileName(seq, type, name) {
    return await axios(apiUrl.file.checkName.url, {
      params: {
        folder_seq: seq,
        file_type: type,
        file_name: name,
      },
    })
  }
}

export default new FileService()
