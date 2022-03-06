type Listener = () => void
type ZeroMDEActionHandler =
  | {
      type: 'action'
      click: Listener
    }
  | {
      type: 'dropdown'
      actions: ZeroMDEAction[]
    }
export interface ZeroMDEAction {
  title?: string
  icon?: string
  handler?: ZeroMDEActionHandler
}
