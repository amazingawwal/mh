import Link from "next/link";

export default function Navbar (){
    return(
        <div className="text-center bg-blue-50">
            <Link href='/' className="pt-5 text-blue-950 text-3xl">
                Muslim Hub
            </Link>
            <h2><strong>Home for striving muslims</strong></h2>
        </div>
    )
}