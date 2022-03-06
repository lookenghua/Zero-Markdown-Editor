<style lang="scss">
$prefix: '.zero-mde';
#{$prefix} {
  height: 300px;
  border: 1px solid #e1e4e8;
  :global(*){
    box-sizing: border-box;
  }

  &-body {
    height: calc(100% - 58px);
    display: flex;

    #{$prefix}-editor {
      height: 100%;
      flex: 1;
    }

    #{$prefix}-preview {
      flex: 1;
    }
  }
  
}
</style>

<script lang="ts">
import * as monaco from 'monaco-editor'
import { onDestroy, onMount } from 'svelte'
import Viewer from './Viewer.svelte'
import Toolbar from './toolbar.svelte'
import Status from './status.svelte'
type IStandaloneCodeEditor = editor.IStandaloneCodeEditor
export let value = '' // 接收值
let editorContainer: HTMLElement // 容器
let monacoInstance: IStandaloneCodeEditor // 编辑器实例
let editorValue = '' // 当前编辑器文本
self.MonacoEnvironment = {
  getWorker: function (workerId, label) {
    const getWorkerModule = (moduleUrl, label) => {
      return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
        name: label,
        type: 'module',
      })
    }
    return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', label)
  },
}
onMount(() => {
  monacoInstance = monaco.editor.create(editorContainer, {
    value,
    language: 'markdown',
    minimap: {
      enabled: false, // 是否启用预览图
    },
    automaticLayout: true, // 自动布局
    overviewRulerBorder: false, // 不显示滚动条边框
    scrollbar: {
      // 滚动条设置
      verticalScrollbarSize: 0, // 竖滚动条
      horizontalScrollbarSize: 0, // 横滚动条
    },
  })
  monacoInstance.onDidChangeModelContent(() => {
    editorValue = monacoInstance.getValue()
  })
})
onDestroy(() => {
  monacoInstance.dispose()
})
</script>

<div class="zero-mde">
  <!--    工具栏-->
  <Toolbar />
  <div class="zero-mde-body">
    <!--        编辑区-->
    <div class="zero-mde-editor" bind:this="{editorContainer}"></div>
    <!--        预览区-->
    <div class="zero-mde-preview">
      <Viewer value="{editorValue}" />
    </div>
    <!--        目录-->
    <div class="zero-mde-sidebar"></div>
  </div>
  <Status />
  
</div>
