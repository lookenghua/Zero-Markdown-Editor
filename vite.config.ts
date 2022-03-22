import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import sveltePreprocess from 'svelte-preprocess'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte({
			preprocess: [
				sveltePreprocess({
					postcss: true,
				}),
			],
		}),
		// @ts-ignore
		monacoEditorPlugin.default({
			languageWorkers: ['editorWorkerService'],
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/lib/index.ts'),
			formats: ['es'],
			name: 'ZeroMDE',
			fileName: (format) => `zero-mde.${format}.js`,
		},
	},
	optimizeDeps: {
		include: ['monaco-editor/esm/vs/editor/editor.worker'],
	},
})
