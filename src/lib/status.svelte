<style lang="scss">
  $prefix: '.zero-mde';
  #{$prefix}-status {
    font-size: 12px;
    border-top: 1px solid #e1e4e8;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 24px;
    .scroll-top{
      cursor: pointer;
    }
  }

</style>
<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let lineCount = 0
    export let wordCount = 0
    export let isSyncScroll = true
    const emit = createEventDispatcher()

    // 监听变化
    function handleChange(e: Event) {
        const target = e.target as HTMLInputElement
        emit("change-sync", target.checked)
    }

    // 滚动到顶部
    function scrollTop(){
        emit("scroll-top")
    }
</script>

<div class="zero-mde-status">
    <div class="zero-mde-status-left">
        <div><span>字数:{wordCount}</span>&emsp;&emsp;<span>行数:{lineCount}</span></div>
    </div>
    <div class="zero-mde-status-right">
        <label><input type="checkbox" bind:checked={isSyncScroll} on:change={handleChange}>同步滚动</label>
        <span class="scroll-top" on:click={scrollTop}>滚动到顶部</span>
    </div>
</div>
