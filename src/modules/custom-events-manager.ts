type AvailableEventNames =
  | 'onmarkerschange'
  | 'deactivatecontext'
  | 'openstyles'
  | 'activateLink'
  | 'deactivateLink'

type CemStorage = Record<
  AvailableEventNames,
  {
    target: HTMLElement | Element
    listener: EventListenerOrEventListenerObject
  }[]
>

// CustomEventManager
export class Cem {
  private static storage: CemStorage = {} as CemStorage

  /**
   * If the array with a key of event name is not set, create one
   */
  static initEventKeyArray(eventName: AvailableEventNames): void {
    if (!this.storage[eventName] || !Array.isArray(this.storage[eventName])) {
      this.storage[eventName] = []
    }
  }

  /**
   * Remove event listener with the same event name and callback
   */
  static removeEventListener(
    eventName: AvailableEventNames,
    listener: EventListenerOrEventListenerObject
  ): void {
    const i = this.storage[eventName].findIndex((event) => {
      return event.listener === listener
    })
    this.storage[eventName].splice(i, 1)
    document.removeEventListener(eventName, listener)
  }

  /**
   * Attach event listener to document.
   **/
  static addEventListener(
    eventName: AvailableEventNames,
    target: HTMLElement | Element,
    listener: (e: CustomEvent) => void
  ): void {
    if (!(target instanceof HTMLElement) && !(target instanceof Element)) {
      console.error('Cem - Second argument should be HTMLElement or Element')
      return
    }

    this.initEventKeyArray(eventName)

    // Check if the same event listener has already been added
    for (const chunk of this.storage[eventName]) {
      if (chunk.target.isSameNode(target)) {
        console.info(
          `Cem - ${eventName} event is already attached to ${target}`
        )
        return
      }
    }

    document.addEventListener(
      eventName,
      listener as EventListenerOrEventListenerObject
    )
    this.storage[eventName].push({
      target,
      listener: listener as EventListenerOrEventListenerObject,
    })
  }

  /**
   * Dispatch custom event after validating if elements are included in document
   */
  static dispatchEvent(eventName: AvailableEventNames, data?: any): void {
    if (this.storage[eventName] && Array.isArray(this.storage[eventName])) {
      let i = this.storage[eventName].length
      while (i--) {
        const chunk = this.storage[eventName][i]
        if (!chunk.target.parentElement) {
          document.removeEventListener(eventName, chunk.listener)
          this.storage[eventName].splice(i, 1)
        }
      }
    }

    document.dispatchEvent(
      new CustomEvent(eventName, {
        detail: data,
      })
    )
  }
}
