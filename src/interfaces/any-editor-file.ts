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
