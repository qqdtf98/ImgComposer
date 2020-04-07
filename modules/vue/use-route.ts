import { SetupContext } from '@vue/composition-api'
import { Route } from 'vue-router/types/router'

export default function useVuex(ctx: SetupContext): Route {
  return ctx.root.$route
}
