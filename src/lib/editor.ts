import selectFiles from 'select-files'
import { monaco } from './customMonaco'

export type IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor
export type EditorUtils = ReturnType<typeof createEditorUtils>
export type EditorContext = { editor: IStandaloneCodeEditor; container: HTMLElement } & EditorUtils
// 编辑器常用方法
export function createEditorUtils(editor: IStandaloneCodeEditor) {
	return {
		// 替换文字
		wrapText(before: string, after = '') {
			const range = editor.getSelection()
			const value = editor.getModel().getValueInRange(range)
			const lineNumber = range.positionLineNumber
			const fromBefore = editor
				.getModel()
				.getValueInRange(
					new monaco.Selection(
						lineNumber,
						range.startColumn - before.length,
						lineNumber,
						range.startColumn,
					),
				)
			const toAfter = editor
				.getModel()
				.getValueInRange(
					new monaco.Selection(
						lineNumber,
						range.endColumn,
						lineNumber,
						range.endColumn + after.length,
					),
				)
			if (fromBefore === before && toAfter === after) {
				const startColumn = range.startColumn - before.length
				const endColumn = range.endColumn + after.length
				editor.executeEdits('insert-code', [
					{
						range: {
							startLineNumber: lineNumber,
							endLineNumber: lineNumber,
							startColumn,
							endColumn,
						},
						text: value,
					},
				])
				editor.setSelection(
					new monaco.Selection(lineNumber, startColumn, lineNumber, endColumn),
				)
			} else {
				const replaceText = before + value + after
				editor.executeEdits('insert-code', [
					{
						range: {
							startLineNumber: lineNumber,
							endLineNumber: lineNumber,
							startColumn: range.startColumn,
							endColumn: range.startColumn + replaceText.length,
						},
						text: replaceText,
					},
				])
				editor.setSelection(
					new monaco.Selection(
						lineNumber,
						range.startColumn + before.length,
						lineNumber,
						range.startColumn + replaceText.length - after.length,
					),
				)
			}
		},
		// 替换整行
		replaceLines(replaceMethod: (line: string) => string) {
			const position = editor.getPosition()
			const lineValue = editor.getModel().getLineContent(position.lineNumber)
			const replaceText = replaceMethod(lineValue)
			editor.executeEdits('insert-code', [
				{
					range: {
						startLineNumber: position.lineNumber,
						startColumn: 0,
						endLineNumber: position.lineNumber,
						endColumn: replaceMethod(lineValue).length + 1,
					},
					text: replaceText,
				},
			])
			const newLineValue = editor.getModel().getLineContent(position.lineNumber)
			editor.setSelection(
				new monaco.Selection(
					position.lineNumber,
					1,
					position.lineNumber,
					newLineValue.length + 1,
				),
			)
		},
		// 新增区块
		appendBlock(content: string) {
			const position = editor.getPosition()
			const { lineNumber } = position
			editor.executeEdits('insert-code', [
				{
					range: {
						startLineNumber: lineNumber,
						endLineNumber: lineNumber,
						startColumn: 0,
						endColumn: 0,
					},
					text: content,
				},
			])
		},
		selectFiles,
	}
}
