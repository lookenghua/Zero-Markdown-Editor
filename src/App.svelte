<style>
    :global(.zero-mde) {
        height: 500px !important;
    }
</style>

<script lang="ts">
    import Editor from './lib/editor.svelte'

    const data = `---
a: 1
b: 1
---

![mahua](http://mahua.jser.me/mahua-logo.jpg)
## MaHua是什么?
一个在线编辑markdown文档的编辑器

## MaHua有哪些功能？

* 方便的\`导入导出\`功能
    *  直接把一个markdown的文本文件拖放到当前这个页面就可以了
    *  导出为一个html格式的文件，样式一点也不会丢失
* 编辑和预览\`同步滚动\`，所见即所得（右上角设置）
* \`VIM快捷键\`支持，方便vim党们快速的操作 （右上角设置）
* 强大的\`自定义CSS\`功能，方便定制自己的展示
* 有数量也有质量的\`主题\`,编辑器和预览区域
* 完美兼容\`Github\`的markdown语法
* 预览区域\`代码高亮\`
* 所有选项自动记忆

## 有问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件(dev.hubo#gmail.com, 把#换成@)
* 微信:jserme
* weibo: [@草依山](http://weibo.com/ihubo)
* twitter: [@ihubo](http://twitter.com/ihubo)

## 捐助开发者
在兴趣的驱动下,写一个\`免费\`的东西，有欣喜，也还有汗水，希望你喜欢我的作品，同时也能支持一下。
##感激
感谢以下的项目,排名不分先后

* [ace](http://ace.ajax.org/)
* [jquery](http://jquery.com)

## 关于作者

\`\`\`javascript
var ihubo = {
  nickName  : "草依山",
  site : "http://jser.me"
}
\`\`\`
<div>
<img src="http://mahua.jser.me/mahua-logo.jpg" />
</div>
## footnote
Here is a footnote reference,[^1]
another,[^longnote],
and optionally there are inline
notes.^[you can type them inline, which may be easier, since you don’t
have to pick an identifier and move down to type the note.]

[^1]: Here is the footnote.

[^longnote]: Heres one with multiple blocks.
## Strikethrough

~one~ or ~~two~~ tildes.
## Autolink literals

www.example.com, https://example.com, and contact@example.com.
## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done

## Codesandbox
\`\`\`js codepen height=300px
https://codepen.io/kitjenson/embed/preview/MWrwrMw?default-tab=result
\`\`\`

`

    function handleUploadImages(files: File[]) {
        console.log(files)
        return new Promise(resolve => {
            resolve(Array.from(files).map((_,i)=>({
                url:"http://mahua.jser.me/mahua-logo.jpg",
                alt:"",
                title:`图片${i+1}`
            })))
        })
    }
</script>

<main>
    <div style="padding-top: 10vh">
        <Editor value={data} uploadImages={handleUploadImages}/>
    </div>
</main>
