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
    
    export let value = ''
    let html = ''
    const schemaStr = JSON.stringify(defaultSchema)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const schema = deepmerge(JSON.parse(schemaStr), {
        attributes: {
            pre: ['className'],
            code: ['className']
        }
    })

    function debug(method) {
        console.log(method)
        return (tree) => {
            console.log(tree)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return tree
        }
    }

    function updateHTML() {
        unified()
            .use(remarkParse)// 解析markdown文本
            .use(remarkFrontmatter, 'yaml')// 获取frontmatter
            .use(() => (tree) => {
                console.dir(tree)
            })
            .use(remarkBreaks) // 保持换行状态
            .use(remarkGfm)
            .use(remarkFootnotes, {inlineNotes: true})// 脚注
            .use(remarkRehype, {allowDangerousHtml: true}) // 将markdown转换成属性结构
            .use(rehypePrism) // 高亮代码
            .use(rehypeRaw)// 保持markdown里面直接书写的html
            .use(rehypeSanitize, schema)// 过滤html字符串
            .use(rehypeStringify) // 将AST树形结构转换成html
            .use(rehypeAutolinkHeadings)
            .process(value)
            .then((vfile) => String(vfile))
            .then((str) => (html = str))
    }

    $: {
        console.log(value)
        updateHTML()
    }
</script>

<div class="markdown-body">{@html html}</div>
