import { SetupContext } from '@vue/composition-api'
import { Route, VueRouter } from 'vue-router/types/router'
import { accessorType } from '../store'

export function useRoute(ctx: SetupContext): Route {
  return ctx.root.$route
}

export function useRouter(ctx: SetupContext): VueRouter {
  return ctx.root.$router
}

export function useVuex(ctx: SetupContext): typeof accessorType {
  return (ctx.root as any).$accessor
}
