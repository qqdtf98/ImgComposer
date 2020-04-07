import { SetupContext } from '@vue/composition-api'
import { accessorType } from '../../store'

export default function useVuex(ctx: SetupContext): typeof accessorType {
  return (ctx.root as any).$accessor
}
