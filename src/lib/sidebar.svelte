<style lang="scss">
  .zero-mde-toc {
    li {
      list-style: none;
      margin-bottom: 4px;
      font-size: 14px;
      line-height: 2;
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      &.zero-mde-active {
        color: #0366d6;
        background-color: #f6f8fa;
      }
    }
  }
</style>
<script lang="ts">
    export let headings: Array<{ depth: number, value: string }> = []
    $:{
        console.log(headings)
    }
</script>
<div class="zero-mde-toc">
    <h2>目录</h2>
    <ul>
        {#each headings as head }
            <li class={`zero-mde-toc-${head.depth}`} style={`padding-left:${(head.depth-1)*8}px`}>{head.value}</li>
        {/each}
    </ul>
</div>
