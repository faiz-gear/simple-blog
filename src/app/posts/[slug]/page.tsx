import path from 'path'
import * as glob from 'glob'
import { getPost } from '@/lib/posts'

export const generateStaticParams = () => {
  const postsPathPattern = path.join(process.cwd(), 'src/posts/**/*.md')
  const allPostsPaths = glob.sync(postsPathPattern)
  const postNames = allPostsPaths.map((postPath) =>
    postPath
      .replace(process.cwd(), '')
      .replace(/\.md$/, '')
      .replace(/\/index$/, '/')
  )

  return postNames.map(async (postName) => {
    return {
      slug: path
    }
  })
}

export default async function Post({ params }: { params: any }) {
  const { slug } = params
  const post = await getPost(slug)
  // console.log('🚀 ~ file: page.tsx ~ line 75 ~ Post ~ post', post)
  return (
    <div>
      <h1>{post.date}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </div>
  )
}
