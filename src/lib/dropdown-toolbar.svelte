<style lang="scss">
  $prefix: '.zero-mde-toolbar';
  #{$prefix}-icon {
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 6px;
    margin-right: 6px;
    &:hover {
      background-color: #e1e4e8;
    }
    :global(svg) {
      display: block;
      padding: 4px;
      width: 24px;
      height: 24px;
    }
  }
  #{$prefix}-dropdown-item {
    display: flex;
    align-items: center;
    padding: 4px 4px;
    cursor: pointer;
    &:hover {
      background: rgb(241, 237, 237);
    }
  }

  #{$prefix}-dropdown-icon :global(svg) {
    display: block;
    padding: 4px;
    width: 24px;
    height: 24px;
    margin-right: 2px;
  }
  :global {
    .tippy-box[data-theme~='zero-mde'] .tippy-content {
      padding: 0;
      background: white;
      color: black;
      border: 1px solid gray;
    }
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte'

  import tippy, { Instance } from 'tippy.js'
  import 'tippy.js/dist/tippy.css'
  import type { ZeroMDEAction } from './types'
  export let plugin: ZeroMDEAction
  let btn: HTMLElement
  let template: HTMLElement
  let tip: Instance
  // 监听icon点击
  function handleIconClick(i: number) {
    if (plugin.handler.type === 'dropdown') {
      const action = plugin.handler.actions[i]
      if (action.handler.type === 'action') {
        action.handler.click()
      }
    }
  }
  // 初始化
  function init() {
    tip = tippy(btn, {
      content: template.innerHTML,
      arrow: false,
      allowHTML: true,
      placement: 'bottom-start',
      offset: [0, 4],
      theme: 'zero-mde',
      ignoreAttributes: true,
      interactive: true,
      interactiveDebounce: 50,
      onHidden(ins) {
        ins.destroy()
        init()
      },
      onCreate(ins) {
        const items = [...ins.popper.querySelectorAll('.zero-mde-toolbar-dropdown-item')]
        items.forEach((el, i) => {
          el.addEventListener('click', () => {
            handleIconClick(i)
            tip.destroy()
            init()
          })
          el.addEventListener('mouseenter', () => {})
          el.addEventListener('mouseLeave', () => {})
        })
      },
    })
  }
  onMount(() => {
    init()
  })
</script>

<div class="zero-mde-toolbar-icon" bind:this={btn}>{@html plugin.icon}</div>
<div style="display:none" bind:this={template}>
  <div class="zero-mde-toolbar-dropdown-list">
    {#if plugin.handler.type === 'dropdown'}
      {#each plugin.handler.actions as item}
        <div class="zero-mde-toolbar-dropdown-item">
          <div class="zero-mde-toolbar-dropdown-icon">{@html item.icon}</div>
          <div>{item.title}</div>
        </div>
      {/each}
    {/if}
  </div>
</div>
