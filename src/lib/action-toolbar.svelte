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
</style>

<script lang="ts">
  import { onMount } from 'svelte'
  import tippy from 'tippy.js'
  import 'tippy.js/dist/tippy.css'
  import type { ZeroMDEAction } from './types'
  
  export let plugin: ZeroMDEAction
  let btn: HTMLElement
  // 监听icon点击
  function handleIconClick() {
    if (plugin.handler.type === 'action') {
      plugin.handler.click()
    }
  }
  onMount(() => {
    tippy(btn, {
      content: plugin.title,
      placement: 'top',
    })
  })
</script>

<div class="zero-mde-toolbar-icon" bind:this={btn} on:click={handleIconClick}
  >{@html plugin.icon}</div
>
