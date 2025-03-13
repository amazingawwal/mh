

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

// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { sanityFetch } from "@/sanity/lib/live";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import { PortableText } from "next-sanity";
// import { components } from "@/PortableTextComponent";

// const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
//   _id,
//   title,
//   body,
//   mainImage,
//   publishedAt,
//   "categories": coalesce(
//     categories[]->{
//       _id,
//       slug,
//       title
//     },
//     []
//   ),
//   author->{
//     name,
//     image
//   }
// }`;

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { data: post } = await sanityFetch({
//     query: POST_QUERY,
//     params: await params,
//   });

//   if (!post) {
//     notFound();
//   }

//   return (
//     <main className="container mx-auto grid grid-cols-1 gap-6 py-6">
//       {post?.mainImage ? (
//         <Image
//           className="w-full aspect-[300/100]"
//           src={urlFor(post.mainImage)
//             .width(300)
//             .height(100)
//             .quality(80)
//             .auto("format")
//             .url()}
//           alt={post?.mainImage?.alt || ""}
//           width="300"
//           height="100"
//         />
//       ) : null}
//       <h1 className="text-4xl font-bold text-balance">{post?.title}</h1>
//       <hr />
//       {post?.body ? (
//         <div className="prose">
//           <PortableText value={post.body} components={components} />
//         </div>
//       ) : null}
//       <Link href="/">&larr; Return to index</Link>
//     </main>
//   );
// }



// import { Author } from "@/components/author/author";
// import { Categories } from "@/components/categories/categories";
// import { components } from "@/PortableTextComponent";
// import { PortableText } from "next-sanity";
// import { POST_QUERYResult } from "@/sanity/types";
// import { PublishedAt } from "@/components/publishedat/publishedat";
// import { Title } from "@/components/title/title";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";



// export function Post(props: NonNullable<POST_QUERYResult>) {
//   const { title, author, mainImage, body, publishedAt, categories } = props;

//   return (
//     <article className="grid lg:grid-cols-12 gap-y-12">
//       <header className="lg:col-span-12 flex flex-col gap-4 items-start">
//         <div className="flex gap-4 items-center">
//           <Categories categories={categories} />
//           <PublishedAt publishedAt={publishedAt} />
//         </div>
//         <Title>{title}</Title>
//         <Author author={author} />
//       </header>
//       {mainImage ? (
//         <figure className="lg:col-span-4 flex flex-col gap-2 items-start">
//           <Image
//             src={urlFor(mainImage).width(400).height(400).url()}
//             width={400}
//             height={400}
//             alt=""
//           />
//         </figure>
//       ) : null}
//       {body ? (
//         <div className="lg:col-span-7 lg:col-start-6 prose lg:prose-lg">
//           <PortableText value={body} components={components} />
//         </div>
//       ) : null}
//     </article>
//   );
// }
import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY } from '@/sanity/lib/queries'
import { Post } from "@/components/post/post";
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
const {data: post} = await sanityFetch({query: POST_QUERY, params: await params})

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-6">
      <Post {...post} />
    </main>
  )
}
