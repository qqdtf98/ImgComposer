import { mutationTree } from 'nuxt-typed-vuex'

export const state: () => {
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
