import { accessorType } from '@/store'

type VuexStore = typeof accessorType

export class Vuex {
  public static store: VuexStore

  public static init(store: VuexStore) {
    if (Vuex.store) {
      console.warn('Store is already set')
      return
    }

    Vuex.store = store
  }
}
