import Link from "next/link";
import Image from "next/image";

export default function Navbar (){
    return(
    <header className="bg-blue-50 ">
        {/* ----------------------Title-----------------------------------  */}
        <div className="text-center ">
            <Link href='/' className="pt-2 hover:text-rose-900 text-blue-950 text-3xl">
                Muslim Hub
            </Link>
            <h2><strong>Home for striving muslims</strong></h2>
        </div>
        

    <div className="navbar bg-blue-100 shadow-sm">

      <div className="navbar-start">
        <Link href='/'>
          <Image src='/new-logo.png'
                            alt="MH Logo"
                            width={62} 
                            height={15} 
                            priority 
                            className="h-auto w-auto rounded-full"
                            
                            />
        </Link>
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul>
          </div>
        </div>




        <div className="navbar-center bg-blue-150 hidden lg:flex shadow-lg  rounded-lg">
          <ul className="menu menu-horizontal  px-4 space-x-6 text-lg font-semibold text-gray-700">
              <li><Link href="/" className="hover:bg-blue-150 hover:text-rose-500">Home</Link></li>
              <li><Link href="/" className="hover:text-blue-500">Dua</Link></li>
              <li><Link href="/" className="hover:text-blue-500">Al-Qur&apos;an</Link></li>
              <li><Link href="/" className="hover:text-blue-500">Hadith</Link></li>
              <li><Link href="/" className="hover:text-blue-500">Blog</Link></li>
              <li><Link href="/" className="hover:text-blue-500">Vendor</Link></li>
              <li><Link href="/" className="hover:text-blue-500">Donation</Link></li>
          </ul>
        </div>



        <div className="navbar-end">
            <Link href='/'>
                <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                </button>
            </Link>
        </div>
      
    </div>
</header>
    )
};

