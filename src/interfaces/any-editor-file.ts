/**
 * editor 프로젝트에서 사용하는 파일 데이터의 타입
 */
export interface File {
  fileId: number
  filePath: string
  fileName: string
  fileType: 'html' | 'css' | 'js'
  data: string
  htmlCssPair: cssPair[] | null
}

/**
 * api에서 받아온 파일 데이터의 타입
 */
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

export interface CompoDataType {
  key: string
  value: string
}

export type CompoData = CompoDataType[]

/**
 * composer에서 컴포넌트 설계 시 저장하는 데이터 타입
 */
export interface IdentifierType {
  index: number
  left: number
  top: number
  width: number
  height: number
  color: string
  calWidth: number
  calHeight: number
  calLeft: number
  calTop: number
  state: boolean
  url: string | null
  queries:
    | {
        key: string
        value: string
      }[]
    | null
  params:
    | {
        key: string
        value: string
      }[]
    | null
  compoName: string
  compoData: CompoData
  nameWidth: number
  compoView: boolean
  // componentList 트리 생성을 위해 저장
  parentIndex: number | null
  level: number
}
export type Identifiers = IdentifierType[]

export interface NewIden {
  index: number
  identifier: IdentifierType
}

/**
 * event, props, global event 데이터 저장을 위한 타입
 */
export interface DataTransfer {
  startCompo: IdentifierType[]
  endCompo: IdentifierType[]
  data: string | null
  index: number
  type: 'event' | 'props' | 'global'
}

export interface NewData {
  index: number
  transfer: DataTransfer
}

/**
 * api에서 받아온 템플릿 데이터의 타입
 */
export interface TemplateType {
  category: {
    category_seq: number
    category_name: string
  }
  template_seq: number
  template_name: string
  html_code: string
  css_code: string
}
