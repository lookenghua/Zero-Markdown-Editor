<script>
import { unified } from 'unified'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkBreaks from 'remark-breaks'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { defaultSchema } from 'hast-util-sanitize'
export let value = ''
let html = ''
const schemaStr = JSON.stringify(defaultSchema)
let schema = JSON.parse(schemaStr)
$: {
  console.log(value)
  unified()
    .use(remarkParse) // 解析markdown文本
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, schema)
    .use(rehypeStringify)
    .process(value)
    .then((vfile) => String(vfile))
    .then((str) => (html = str))
}
</script>

<div class="markdown-body">{@html html}</div>
