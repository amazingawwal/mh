

import { client } from "@/sanity/lib/client";

import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { PortableText } from "next-sanity";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);


  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
    
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