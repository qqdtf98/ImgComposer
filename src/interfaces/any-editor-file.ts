export interface File {
  fileId: number
  filePath: string
  fileName: string
  fileType: 'html' | 'css' | 'js'
  data: string
  htmlCssPair: cssPair[]
}

export interface dataType {
  // eslint-disable-next-line camelcase
  file_seq: number
  // eslint-disable-next-line camelcase
  file_path: string
  // eslint-disable-next-line camelcase
  file_name: string
  // eslint-disable-next-line camelcase
  file_type: 'html' | 'css' | 'js'
  contents: string
  // eslint-disable-next-line camelcase
  html_css_pair: cssType[]
}

export interface cssPair {
  htmlFileSeq: number
  cssFileSeq: number
}

export interface cssType {
  // eslint-disable-next-line camelcase
  html_file_seq: number
  // eslint-disable-next-line camelcase
  css_file_seq: number
}
