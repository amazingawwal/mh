import Image from "next/image";
import { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

export const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-2 text-base leading-relaxed">{children}</p>, // Add margin-bottom
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mb-1 mt-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-medium mb-2">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic ">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
  },
  types: {
    image: ({ value }) =>
      value ? (
        <div className="rounded-lg not-prose w-full h-auto my-6">
          <Image
            src={urlFor(value).width(600).height(400).quality(80).auto("format").url()}
            alt={value?.alt || "Image"}
            width={600}
            height={400}
            layout="responsive"
          />
        </div>
      ) : null,
  },
};
