export const isOutside = (target: HTMLElement, selectors: string[]) => {
  let isOutside = true

  for (const selector of selectors) {
    if (target.closest(selector)) {
      isOutside = false
      break
    }
  }

  return isOutside
}
