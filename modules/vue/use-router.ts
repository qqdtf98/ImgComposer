import { SetupContext } from '@vue/composition-api'
import { VueRouter } from 'vue-router/types/router'

export default function useVuex(ctx: SetupContext): VueRouter {
  return ctx.root.$router
}
