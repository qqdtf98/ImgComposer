/**
 * Bubble the specific events fired from the iframe's window to the root window object
 */
export function bubbleIframeEvents(
  iframe: HTMLIFrameElement,
  bubblingWindow: Window
) {
  if (iframe.contentWindow) {
    const iframeWindow = iframe.contentWindow
    const eventNames = [
      'click',
      'keydown',
      'keypress',
      'keyup',
      'mousedown',
      'mouseup',
      'mousemove',
      'mouseenter',
      'mouseleave',
      'mouseover',
      'mouseout',
    ]

    eventNames.forEach((eventName) => {
      iframeWindow.addEventListener(eventName, (e) => {
        const clonedEvent = new Event(e.type, e)
        bubblingWindow.dispatchEvent(clonedEvent)
      })
    })
  }
}
