import { Author } from "../author/author";
import { Categories } from "../categories/categories";
import { components } from "@/PortableTextComponent";
import { PortableText } from "next-sanity";
import { POST_QUERYResult } from "@/sanity/types";
import { PublishedAt } from "../publishedat/publishedat";
import { Title } from "../title/title";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export function Post(props: NonNullable<POST_QUERYResult>) {
  const { title, author, mainImage, body, publishedAt, categories } = props;

  return (
    <article className="grid lg:grid-cols-12 gap-4 gap-y-3">
      <header className="lg:col-span-12 flex flex-row gap-2 justify-between items-center">
        <div className="flex flex-col gap-1 items-center">
          <Categories categories={categories} />
          <Title>{title}</Title>
        </div>
        <div className="flex gap-4 items-center">
          <Author author={author} />
          <PublishedAt publishedAt={publishedAt} />
        </div>
      </header>
      {mainImage ? (
      <figure className="float-start lg:col-span-2 flex flex-col gap-2 items-start">
          <Image
            src={urlFor(mainImage).width(200).height(200).url()}
            width={200}
            height={200}
            alt=""
          />
          <div></div>
      </figure>
      ) : null}
      {body ? (
      <div className="lg:col-span-10 lg:col-start-3 prose lg:prose-lg">
          <PortableText value={body} components={components} />
      </div>
      ) : null}
    </article>
  );
}