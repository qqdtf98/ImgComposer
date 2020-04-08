export const isOutside = (target: HTMLElement, selectors: string[]) => {
  let isOutside = true

  for (const selector of selectors) {
    const selectorTarget = document.querySelector(selector)
    if (selectorTarget.isSameNode(target)) {
      return false
    }
    if (target.closest(selector)) {
      isOutside = false
      break
    }
  }

  return isOutside
}
