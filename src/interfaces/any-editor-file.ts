export interface AnyEditorFile {
  path: string
  fileId: number
  fileName: string
  fileType: 'html' | 'css' | 'js' // JS is experimental
  data: string
}
