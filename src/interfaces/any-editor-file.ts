export interface File {
  fileId: number
  filePath: string
  fileName: string
  fileType: 'html' | 'css' | 'js'
  data: string
  htmlCssPair: cssPair[]
}

export interface dataType {
  file_seq: number
  file_path: string
  file_name: string
  file_type: 'html' | 'css' | 'js'
  contents: string
  html_css_pair: cssType[]
}

export interface cssPair {
  htmlFileSeq: number
  cssFileSeq: number
}

export interface cssType {
  html_file_seq: number
  css_file_seq: number
}

export interface SampleType {
  folder_seq: number
  file_name: string
  file_path: string
  file_type: string
  contents: string
}
