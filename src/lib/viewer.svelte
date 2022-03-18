<script>
    import {unified} from 'unified'
    import rehypeRaw from 'rehype-raw'
    import rehypeSanitize from 'rehype-sanitize'
    import rehypeStringify from 'rehype-stringify'
    import remarkBreaks from 'remark-breaks'
    import remarkParse from 'remark-parse'
    import rehypePrism from '@mapbox/rehype-prism'
    import remarkRehype from "remark-rehype"
    import remarkFootnotes from 'remark-footnotes'
    import {defaultSchema} from 'hast-util-sanitize'
    import deepmerge from 'deepmerge'
    import rehypeAutolinkHeadings from "rehype-autolink-headings"
    import remarkFrontmatter from "remark-frontmatter"
    import remarkGfm from 'remark-gfm'
    import remarkCodesandbox from "remark-codesandbox"
    import remarkHeadings from '@vcarl/remark-headings';
    import {createEventDispatcher} from "svelte";
    
    export let value = ''
    let html = ''
    const schemaStr = JSON.stringify(defaultSchema)
    const emit = createEventDispatcher()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const schema = deepmerge(JSON.parse(schemaStr), {
        attributes: {
            pre: ['className'],
            code: ['className'],
            iframe:['src']
        },
        tagNames:[
            "iframe"
        ]
    })

    function debug(info) {
        console.log(info)
        return (tree) => {
            console.dir(tree)
        }

    }

    function updateHTML() {
        unified()
            .use(remarkParse)// 解析markdown文本
            .use(remarkFrontmatter, 'yaml')// 获取frontmatter
            .use(() => (tree) => {
                console.log("===frontmatter===")
                console.dir(tree)
            })
            .use(remarkCodesandbox, {mode: 'iframe'})
            .use(remarkBreaks) // 保持换行状态
            .use(remarkGfm) // gfm支持高级功能,table,脚注,待办
            .use(remarkFootnotes, {inlineNotes: true})// 脚注
            .use(() => (tree) => {
                console.log("===footnote===")
                console.dir(tree)
            })
            .use(remarkHeadings) // 增加标题列表到vifle
            .use(remarkRehype, {allowDangerousHtml: true}) // 将markdown转换成属性结构
            .use(() => (tree) => {
                console.log("===rehype===")
                console.dir(tree)
            })
            .use(rehypePrism) // 高亮代码
            .use(rehypeRaw)// 保持markdown里面直接书写的html
            .use(rehypeSanitize, schema)// 过滤html字符串
            .use(rehypeStringify) // 将AST树形结构转换成html
            .use(rehypeAutolinkHeadings)
            .process(value)
            .then((vfile) =>{
                emit("change:heading",vfile.data.headings)
                return String(vfile)
            } )
            .then((str) => (html = str))
    }

    $: {
        console.log(value)
        updateHTML()
    }
</script>

<div class="markdown-body">{@html html}</div>
