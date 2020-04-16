import { getMatchedCssRules } from '@/modules/get-matched-css-rules'
import { Vuex } from '@/modules/vuex'
import _ from 'lodash'
import { Cem } from '@/modules/custom-events-manager'

export class Marker {
  public static iframe: HTMLIFrameElement
  public static markers: {
    target: HTMLElement
    boundary: HTMLElement
  }[] = []

  /**
   * Initialize the Marker with the iframe element
   */
  public static setIframe(iframe: HTMLIFrameElement) {
    if (Marker.iframe) {
      console.warn(`You already set the iframe`)
      return
    }
    Marker.iframe = iframe

    if (!iframe.contentWindow) {
      return
    }

    iframe.contentWindow.addEventListener('click', (e) => {
      const target = e.target as HTMLElement

      const markedIndex = Marker.isAlreadyMarked(target)
      if (markedIndex !== null) {
        // Already selected
        if (!e.shiftKey && !e.ctrlKey) {
          // Without shift
          if (Marker.markers.length > 1) {
            // If there are multiple elements marked,
            // remark the current one excluding others
            Marker.resetMarkers()
            Marker.addMarker(target)
          } else {
            // Deselect the element if it is the only element marked
            Marker.removeMarker(markedIndex)
            Marker.resetVuex()
            // Dispatch an event about markers change
            Cem.dispatchEvent('deactivatecontext')
          }
        } else {
          // Deselect the element if it is the only element marked
          Marker.removeMarker(markedIndex)
          Marker.resetVuex()
          // Dispatch an event about markers change
          Cem.dispatchEvent('deactivatecontext')
        }
      } else {
        // New target to be selected
        if (!e.shiftKey && !e.ctrlKey) {
          Marker.resetMarkers()
        }
        Marker.addMarker(e.target as HTMLElement)
        Vuex.store.styleData.SET_STYLE_DATA(
          getComputedStyle(e.target as HTMLElement)
        )
        Vuex.store.styleData.SET_TARGET(e.target as HTMLElement)
        Vuex.store.editorInfo.SET_MATCHED_CSS_RULES(
          getMatchedCssRules(e.target as Element)
        )
      }

      // Dispatch an event about markers change
      // Cem.dispatchEvent('onmarkerschange')
    })
  }

  /**
   * Set Vuex store's styleData to null
   */
  public static resetVuex() {
    Vuex.store.styleData.SET_STYLE_DATA(null)
    Vuex.store.styleData.SET_TARGET(null)
  }

  public static addMarker(target: HTMLElement) {
    if (!Marker.iframe || !Marker.iframe.contentDocument) {
      console.error(`Creating Marker instnace without setting the iframe`)
      return
    }

    if (Marker.iframe.contentDocument.body.isSameNode(target)) {
      return
    }

    const boundary = document.createElement('div')
    const id = new Date().getTime()
    boundary.id = `any-editor-marker--${id}`
    boundary.style.pointerEvents = 'none'
    boundary.style.position = 'fixed'
    boundary.style.zIndex = '9999999'
    boundary.style.boxShadow = 'rgba(249, 26, 75, 0.7) 0px 0px 0px 4px'
    boundary.style.borderRadius = '2px'

    this.setRect(target, boundary)

    Marker.markers.push({
      target,
      boundary,
    })
    Marker.iframe.contentDocument.body.appendChild(boundary)
  }

  public static removeMarker(markedIndex: number) {
    const { boundary } = Marker.markers[markedIndex]
    if (boundary.parentElement) {
      boundary.parentElement.removeChild(boundary)
      _.pullAt(Marker.markers, markedIndex)
    }
  }

  public static isAlreadyMarked(target: HTMLElement) {
    for (let i = 0; i < Marker.markers.length; i += 1) {
      const marker = Marker.markers[i]

      if (marker.target.isSameNode(target)) {
        return i
      }
    }

    return null
  }

  /**
   * Remove all the previously selected markers
   */
  public static resetMarkers() {
    for (const marker of Marker.markers) {
      const { boundary } = marker
      if (boundary.parentElement) {
        boundary.parentElement.removeChild(boundary)
      }
    }
    Marker.markers = []
  }

  /**
   * Set a boundary position around the target element
   * @param target Target element which will be wrapped with a boundary
   * @param boundary Thin, retangular element around the target element
   */
  private static setRect(target: HTMLElement, boundary: HTMLElement) {
    const targetRect = target.getBoundingClientRect()
    boundary.style.top = `${targetRect.top}px`
    boundary.style.left = `${targetRect.left}px`
    boundary.style.width = `${targetRect.width}px`
    boundary.style.height = `${targetRect.height}px`
  }
}
