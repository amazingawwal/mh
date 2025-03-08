import AutoPlayCarousel from "./carousel";
import Card from "../card/card";

export default function Hero (){
    return(
        <section className="flex p-5">
            <aside className="basis-1/4">
                <h3 className="">Articles</h3>
                <Card/>
            </aside>
            <aside className="basis-3/4">
                <AutoPlayCarousel/>
            </aside>
        </section>
    );
};