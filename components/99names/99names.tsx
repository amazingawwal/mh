import axios from "axios";
import { Title } from "../title/title";
import { BeautifulNames } from "../card/beautiful-names";

export type AllahName = {
  number: number;
  name: string;
  transliteration: string;
  en: { meaning: string };
};

export type ApiResponse = {
  data: AllahName[];
};




export async function getNinetyNineNames(): Promise<AllahName[]> {
  try {
    const { data } = await axios.get<ApiResponse>("https://api.aladhan.com/v1/asmaAlHusna");
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; 
  }
}


export default async function NinetyNineNamesPage() {
   
    const names = await getNinetyNineNames();
  
    return (
      <main className=" mx-auto p-6">
        <Title>Beautiful Names of Allah</Title>
        {names.length === 0 ? (
          <p className="text-red-500">Error fetching data or no names found.</p>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {names.map((name) => (
              <BeautifulNames key={name.number} {...name}/>
            ))}
          </div>
        )}
      </main>
    );
  }
  