import { MutationTree } from 'vuex'

export const state = () => ({
  count: 0,
})

export type MyModuleState = ReturnType<typeof state>

export const mutations: MutationTree<MyModuleState> = {
  ADD: (state) => state.count++,
}
