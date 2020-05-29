import cssom from 'cssom'
import { Vuex as vuex } from '@/modules/vuex'

export default function replaceCssRules(before: string, after: string) {
  for (const css of vuex.store.fileData.cssFileList) {
    const cssData = css.data.replace(/(\s*)/g, '')
    if (
      cssData.includes(
        vuex.store.editorInfo.selectedCssRule?.selectorText as string
      )
    ) {
      const parsedCss = cssom.parse(cssData)
      const cssRules = parsedCss.cssRules as CSSStyleRule[]
      let changedCSS = ''
      for (const rule of cssRules) {
        const style = rule.style as Record<number | string, any>
        if (
          rule.selectorText ===
          (vuex.store.editorInfo.selectedCssRule?.selectorText as string)
        ) {
          style[before] = after
        }
        changedCSS += rule.cssText
      }
      vuex.store.fileData.updateFileValue({
        value: changedCSS,
        type: 'css',
        index: css.fileId,
      })
      // TODO 바뀔때마다 editor로드하기
    }
  }
}
