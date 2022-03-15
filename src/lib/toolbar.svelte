<style lang="scss">
$prefix: '.zero-mde';
#{$prefix}-toolbar {
  height: 34px;
  padding: 0 10px;
  border-bottom: 1px solid #e1e4e8;
  background: #fafbfc;
  display: flex;
  align-items: center;

  &-left {
    flex: 1;
  }
  &-icon {
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
}
</style>

<script lang="ts">
import { icons } from './icons'
import type { ZeroMDEAction } from './types'
import ActionToolbar from './action-toolbar.svelte'
import DropdownToolbar from './dropdown-toolbar.svelte'

const defaultPlugins: ZeroMDEAction[] = [
  {
    title: '标题',
    icon: icons.heading,
    handler: {
      type: 'dropdown',
      actions: [
        {
          title: '一级标题',
          icon: icons.h1,
        },
        {
          title: '二级标题',
          icon: icons.h2,
        },
        {
          title: '三级标题',
          icon: icons.h3,
        },
        {
          title: '四级标题',
          icon: icons.h4,
        },
        {
          title: '五级标题',
          icon: icons.h5,
        },
        {
          title: '六级标题',
          icon: icons.h6,
        },
      ],
    },
  },
  {
    title: '加粗',
    icon: icons.bold,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '倾斜',
    icon: icons.italic,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '引用',
    icon: icons.quote,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '链接',
    icon: icons.link,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '图片',
    icon: icons.image,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '代码',
    icon: icons.code,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '无序列表',
    icon: icons.ol,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '有序列表',
    icon: icons.ul,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '分割线',
    icon: icons.hr,
    handler: {
      type: 'action',
      click() {},
    },
  },
]
const rightActions: ZeroMDEAction[] = [
  {
    title: '目录',
    icon: icons.toc,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '帮助',
    icon: icons.help,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '仅编辑区',
    icon: icons.left,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '仅预览区',
    icon: icons.right,
    handler: {
      type: 'action',
      click() {},
    },
  },
  {
    title: '全屏',
    icon: icons.fullscreenOn,
    handler: {
      type: 'action',
      click() {},
    },
  },
]
</script>

<div class="zero-mde-toolbar">
  <div class="zero-mde-toolbar-left">
    {#each defaultPlugins as plugin}
      {#if plugin.handler.type === 'action'}
        <ActionToolbar {plugin} />
        {:else}
        <DropdownToolbar {plugin}/>
      {/if}
      
    {/each}
  </div>
  <div class="zero-mde-toolbar-right">
    {#each rightActions as plugin}
      <div class="zero-mde-toolbar-icon">{@html plugin.icon}</div>
    {/each}
  </div>
</div>
