export class Selector {
  constructor(iframeElement: HTMLIFrameElement) {
    if (!iframeElement) {
      console.error(`You didn't pass the iframe element`)
    }

    const iframeWindow = iframeElement.contentWindow
    const iframeDoc = iframeElement.contentDocument

    if (!iframeWindow || !iframeDoc) {
      console.error(`Cannot get iframe's window or document`)
      return
    }

    // Set selector dom when mouse enter into the iframe's document
    iframeDoc.addEventListener('mouseover', () => {
      if (!iframeDoc.querySelector('#any-editor-selector')) {
        const selector = iframeDoc.createElement('div')
        selector.id = 'any-editor-selector'
        selector.style.position = 'absolute'
        selector.style.pointerEvents = 'none'
        selector.style.position = 'fixed'
        selector.style.zIndex = '9999997'
        selector.style.boxShadow = 'rgba(0, 111, 255, 0.7) 0px 0px 0px 4px'
        selector.style.borderRadius = '2px'
        const easing = 'cubic-bezier(0.32, 0.43, 0.13, 1)'
        const duration = '400ms'
        selector.style.transition = [
          'top',
          'right',
          'bottom',
          'left',
          'width',
          'height',
        ]
          .map((property) => `${property} ${duration} ${easing}`)
          .join(', ')
        iframeDoc.body.appendChild(selector)
      }
    })

    iframeWindow.addEventListener('mousemove', (e) => {
      const target = e.target as HTMLElement

      if (iframeDoc.body.isSameNode(target)) {
        return
      }

      const selector = iframeDoc.querySelector(
        '#any-editor-selector'
      ) as HTMLElement

      // If there is no selector or target element, cancel
      if (!selector || !target) {
        return
      }

      const targetRect = target.getBoundingClientRect()

      // Set top, left, width, height of the selector same as the target
      ;['top', 'left', 'width', 'height'].forEach((property) => {
        ;(selector.style as any)[property] = `${
          (targetRect as any)[property]
        }px`
      })
    })
  }
}
