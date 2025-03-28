

import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from '@/sanity/lib/queries'
import { PostCard } from "@/components/postcard/postcard";
import { Title } from "@/components/title/title";
import { AUDIOS_QUERY } from "@/sanity/lib/queries";
import AudioPage from "@/components/audioFile/audio";



export default async function Page() {
  const {data: audios} = await sanityFetch({query: AUDIOS_QUERY});

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-6">
      <Title>Audio Index</Title>
      <div className="flex flex-col gap-12 py-12">
        {audios.map((audio) => (
          <AudioPage key={audio._id} {...audio} />
        ))}
      </div>
    </main>
  )
}