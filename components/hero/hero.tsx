import AutoPlayCarousel from "./carousel";

export default function Hero (){
    return(
        <section className="flex ">
            <aside className="basis-1/3">
                <h3>Sidebar</h3>
            </aside>
            <aside className="basis-2/3">
                <AutoPlayCarousel/>
            </aside>
        </section>
    );
};