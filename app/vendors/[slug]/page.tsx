

// import { client } from "@/sanity/lib/client";

// import Link from "next/link";
// import { type SanityDocument } from "next-sanity";
// import { PortableText } from "next-sanity";

// const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
// const options = { next: { revalidate: 30 } };

// export default async function PostPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);


//   return (
//     <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
//       <Link href="/" className="hover:underline">
//         ← Back to posts
//       </Link>
    
//       <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
//       <div className="prose">
//         <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
//         {Array.isArray(post.body) && <PortableText value={post.body} />}
//       </div>
//     </main>
//   );
// }


// // const Vendors = ()=>{
// //     return(
// //         <>
// //             vendors
// //         </>
// //     )
// // }

// // export default Vendors;

import { notFound } from "next/navigation";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 py-12">
      {post?.mainImage ? (
        <img
          className="w-full aspect-[800/300]"
          src={urlFor(post.mainImage)
            .width(800)
            .height(300)
            .quality(80)
            .auto("format")
            .url()}
          alt={post?.mainImage?.alt || ""}
          width="800"
          height="300"
        />
      ) : null}
      <h1 className="text-4xl font-bold text-balance">{post?.title}</h1>
      <hr />
      <Link href="/">&larr; Return to index</Link>
    </main>
  );
}