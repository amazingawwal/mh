import Image from "next/image";
import { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

  

export const components: PortableTextComponents = {
  types: {
    image: (props) =>
      props.value ? (
        <Image
          className="rounded-lg not-prose w-full h-auto"
          src={urlFor(props.value)
            .width(200)
            .height(100)
            .quality(80)
            .auto("format")
            .url()}
          alt={props?.value?.alt || ""}
          width="600"
          height="400"
        />
      ) : null,
     
      
  },
  
};



// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// export const components: PortableTextComponents = {
//   types: {
//     code: ({ value }: { value: { language: string; code: string } }) => (
//       <SyntaxHighlighter language={value.language || "javascript"} style={materialDark}>
//         {value.code}
//       </SyntaxHighlighter>
//     ),
//   },
// };
