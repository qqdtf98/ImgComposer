const host = 'http://192.168.0.86:8581/editor'

export default {
  project: {
    list: {
      method: 'get',
      url: `${host}/project/selectProject`,
    },
    get: {
      method: 'get',
      url: `${host}/project/selectProjectAll`,
    },
    create: {
      method: 'post',
      url: `${host}/project/createProject`,
    },
  },
  file: {
    update: {
      method: 'post',
      url: `${host}/file/updateFile`,
    },
    delete: {
      method: 'post',
      url: `${host}/file/deleteFile`,
    },
    checkName: {
      method: 'get',
      url: `${host}/file/checkFileName`,
    },
    create: {
      method: 'post',
      url: `${host}/file/createFile`,
    },
  },
  csspair: {
    create: {
      method: 'post',
      url: `${host}/file/createHtmlCssPair`,
    },
    get: {
      method: 'get',
      url: `${host}/file/selectHtmlCssPair`,
    },
    delete: {
      method: 'post',
      url: `${host}/file/deleteHtmlCssPair`,
    },
  },
  jspair: {
    create: {
      method: 'post',
      url: `${host}/file/createHtmlJsPair`,
    },
    get: {
      method: 'get',
      url: `${host}/file/selectHtmlJsPair`,
    },
    delete: {
      method: 'post',
      url: `${host}/file/deleteHtmlJsPair`,
    },
  },
  template: {
    list: {
      method: 'get',
      url: `${host}/template/selectTemplate`,
    },
    create: {
      method: 'post',
      url: `${host}/template/createTemplate`,
    },
    update: {
      method: 'post',
      url: `${host}/template/updateTemplate`,
    },
    delete: {
      method: 'post',
      url: `${host}/template/deleteTemplate`,
    },
  },
}
