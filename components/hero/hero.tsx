import AutoPlayCarousel from "./carousel";

export default function Hero (){
    return(
        <section className="flex ">
            <aside className="basis-1/4">
                <h3>Sidebar</h3>
            </aside>
            <aside className="basis-3/4">
                <AutoPlayCarousel/>
            </aside>
        </section>
    );
};