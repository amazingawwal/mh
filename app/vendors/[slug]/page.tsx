
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

import Link from "next/link";

import { PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

// const POSTS_QUERY = `*[
//   _type == "post"
//   && defined(slug.current)
// ]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;


import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";


const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// const options = { next: { revalidate: 30 } };

export default async function PostPage(
{
  params,
}: 
{
  params: Promise<{ slug: string }>;
}
) 

{
//   const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const { data: post } = await sanityFetch({ query: POST_QUERY, params: await params});

if (!post) {
    notFound();
  }
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(150).height(50).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          width={150}
          height={50}
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}


// const Vendors = ()=>{
//     return(
//         <>
//             vendors
//         </>
//     )
// }

// export default Vendors;