export function classify(className: string): string
export function classify(classNames: string[], toString: true): string
export function classify(classNames: string[]): string[]
export function classify(classNames: string[], toString: false): string[]
export function classify(
  classNameOrClassNames: string | string[],
  toString = false
): string | string[] {
  if (Array.isArray(classNameOrClassNames)) {
    const transformed = classNameOrClassNames.map((className) =>
      className ? `.${className}` : ''
    )

    if (toString) {
      return transformed.join(' ')
    } else {
      return transformed
    }
  } else {
    return `.${classNameOrClassNames}`
  }
}
