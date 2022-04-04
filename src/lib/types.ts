type Listener = () => void
type ZeroMDEActionHandler =
	| {
			type: 'action'
			active?: boolean
			click: Listener
	  }
	| {
			type: 'dropdown'
			active?: boolean
			actions: ZeroMDEAction[]
	  }

export interface ZeroMDEAction {
	title?: string
	icon?: string
	active?: boolean
	handler?: ZeroMDEActionHandler
}
