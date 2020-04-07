import { getAccessorType } from 'nuxt-typed-vuex'
import * as countModule from './countModule'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const accessorType = getAccessorType({
  state,
  modules: {
    countModule,
  },
})
