import { GetStaticProps } from 'next'
import { readFileSync } from 'fs'
import matter from 'gray-matter'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkRehype from 'remark-rehype'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import path from 'path'

export const getPost = async (postName: string) => {
  const pagePath = path.join(process.cwd(), 'src/posts', `${postName}.md`)
  const rawContent = readFileSync(pagePath, 'utf-8')
  const { data, content } = matter(rawContent)

  const body = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content)

  return {
    ...data,
    date: data.date.toString(),
    body: {
      raw: content,
      html: String(body)
    }
  }
}
