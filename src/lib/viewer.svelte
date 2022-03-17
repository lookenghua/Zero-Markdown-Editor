<script>
    import {unified} from 'unified'
    import rehypeRaw from 'rehype-raw'
    import rehypeSanitize from 'rehype-sanitize'
    import rehypeStringify from 'rehype-stringify'
    import remarkBreaks from 'remark-breaks'
    import remarkParse from 'remark-parse'
    import remarkRehype from 'remark-rehype'
    import {defaultSchema,Schema} from 'hast-util-sanitize'

    export let value = ''
    let html = ''
    const schemaStr = JSON.stringify(defaultSchema)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const schema: Schema = JSON.parse(schemaStr)

    function updateHTML() {
        unified()
            .use(remarkParse) // 解析markdown文本
            .use(remarkBreaks)
            .use(remarkRehype, {allowDangerousHtml: true})
            .use(rehypeRaw)
            .use(rehypeSanitize, schema)
            .use(rehypeStringify)
            .process(value)
            .then((vfile) => String(vfile))
            .then((str) => (html = str))
    }

    $: {
        updateHTML()
    }
</script>

<div class="markdown-body">{@html html}</div>
