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
}
</style>

<div class="zero-mde-status">
  <div class="zero-mde-status-left">
    <div><span>字数:256</span><span>行数:94</span></div>
  </div>
  <div class="zero-mde-status-right">
      <label><input type="checkbox">同步滚动</label>
      <span>滚动到顶部</span>
  </div>
</div>
