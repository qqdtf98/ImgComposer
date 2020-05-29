import { Vuex as vuex } from '@/modules/vuex'

export default function replaceCssRules(before: string, after: string) {
  for (const css of vuex.store.fileData.cssFileList) {
    const cssData = css.data.replace(/(\s*)/g, '')
    if (
      cssData.includes(
        vuex.store.editorInfo.selectedCssRule?.selectorText as string
      )
    ) {
      vuex.store.fileData.updateFileValue({
        value: cssData.replace(before.replace(/(\s*)/g, ''), after),
        type: 'css',
        index: css.fileId,
      })
    }
  }
}
