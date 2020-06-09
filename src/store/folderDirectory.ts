import { mutationTree } from 'nuxt-typed-vuex'

// 파일 탐색기와 파일 트리를 구성할 때 사용
export const state: () => {
  /** 현재 디렉토리의 name과 children */
  directory: dirType
  currentList: dirType[]
  rootTitle: string
} = () => ({
  directory: {
    name: '',
    children: [],
  },
  currentList: [],
  rootTitle: '',
})

export type dirType = {
  name: string
  children: dirType[]
}

export const mutations = mutationTree(state, {
  SET_DIRECTORY: (state, directory: dirType) => (state.directory = directory),
  SET_CURRENT_LIST: (state, list: dirType[]) => (state.currentList = list),
  SET_ROOT_TITLE: (state, title: string) => (state.rootTitle = title),
})
