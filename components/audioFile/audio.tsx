
import {Slug} from "@/sanity/types"



type AudioProps = {
    description: string | null;
    _id: string;
    audio: string | null;
    title: string | null;
    slug: Slug | null;
  };
  

export default async function AudioPage({ description, title, _id, audio, slug }: AudioProps ) {

  return (

    <li className="bg-white p-4 rounded-lg" key={_id}>
          
              <h2 className="text-xl font-semibold">{title}</h2>
                          
                <p className="text-gray-500">
                  {description}
                </p>
                {
                    audio ? (
                        <audio controls>
                          <source src={audio} type="audio/OGG" />
                          Your browser does not support the audio element.
                        </audio>
                      ) : (
                        <p>Loading audio...</p>
                      )
                }
                    </li>


  );
}