import { useVuex } from '../../../../modules/vue-hooks'
import { Cem } from '@/modules/custom-events-manager'
    const vuex = useVuex(ctx)
    watch(
      () => vuex.editorInfo.matchedCssRules,
      () => {
        cssRules.value = vuex.editorInfo.matchedCssRules
        // Dispatch an event about markers change
        Cem.dispatchEvent('onmarkerschange')
      }
    )

    function selectCssSelector(e: MouseEvent, rule: CSSStyleRule) {
      vuex.editorInfo.SET_SELECTED_CSS_RULE(rule)

      setTimeout(() => {
        Cem.dispatchEvent('openstyles')
      }, 0)
    }
    }

    }

    }
