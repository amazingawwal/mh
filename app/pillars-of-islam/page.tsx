

import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from '@/sanity/lib/queries'
import { PostCard } from "@/components/postcard/postcard";
import { Title } from "@/components/title/title";

export default async function Page() {
  const {data: posts} = await sanityFetch({query: POSTS_QUERY});

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-6">
      <Title>Post Index</Title>
      <div className="flex flex-col gap-12 py-12">
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </main>
  )
}