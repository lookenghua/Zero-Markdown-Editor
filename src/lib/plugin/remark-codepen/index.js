import { is } from 'unist-util-is'
import { u } from 'unist-builder'
import { parseMeta } from '../util.js'

export default function remarkCodepen() {
	return (tree) => {
		tree.children.forEach((node, i) => {
			if (is(node, { type: 'code' })) {
				if (node.meta?.startsWith('codepen')) {
					const meta = parseMeta(node.meta || '')
					const iframe = document.createElement('iframe')
					iframe.src = node.value
					iframe.loading = 'lazy'
					iframe.style.width = '100%'
					if (meta.height) {
						iframe.style.height = meta.height
					} else {
						iframe.style.height = '260px'
					}

					iframe.frameBorder = 'no'
					iframe.scrolling = 'no'
					tree.children.splice(
						i,
						1,
						u('html', {
							value: iframe.outerHTML,
						}),
					)
				}
			}
		})
	}
}
