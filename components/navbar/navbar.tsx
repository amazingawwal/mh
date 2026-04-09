// import Link from "next/link";
// import Image from "next/image";

// export default function Navbar (){
//     return(
//     <header className="bg-blue-50 ">
//         {/* ----------------------Title-----------------------------------  */}
//         <div className="text-center ">
//             <Link href='/' className="pt-2 hover:text-rose-900 text-blue-950 text-3xl">
//                 Muslim Hub
//             </Link>
//             <h2><strong>Home for striving muslims</strong></h2>
//         </div>
        

//     <div className="navbar bg-blue-100 shadow-sm">

//       <div className="navbar-start">
//         <Link href='/'>
//           <Image src='/new-logo.png'
//                             alt="MH Logo"
//                             width={62} 
//                             height={15} 
//                             priority 
//                             className="h-auto w-auto rounded-full"
                            
//                             />
//         </Link>
//         <div className="dropdown ">
//           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//             <li><a>Homepage</a></li>
//             <li><a>Portfolio</a></li>
//             <li><a>About</a></li>
//           </ul>
//           </div>
//         </div>




//         <div className="navbar-center bg-blue-150 hidden lg:flex shadow-lg  rounded-lg">
//           <ul className="menu menu-horizontal  px-4 space-x-6 text-lg font-semibold text-gray-700">
//               <li><Link href="/" className="hover:bg-blue-150 hover:text-rose-500">Home</Link></li>
//               <li><Link href="/" className="hover:text-blue-500">Dua</Link></li>
//               <li><Link href="/" className="hover:text-blue-500">Al-Qur&apos;an</Link></li>
//               <li><Link href="/" className="hover:text-blue-500">Hadith</Link></li>
//               <li><Link href="/" className="hover:text-blue-500">Blog</Link></li>
//               <li><Link href="/" className="hover:text-blue-500">Vendor</Link></li>
//               <li><Link href="/" className="hover:text-blue-500">Donation</Link></li>
//           </ul>
//         </div>



//         <div className="navbar-end">
//             <Link href='/'>
//                 <button className="btn btn-ghost btn-circle">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
//                 </button>
//             </Link>
//         </div>
      
//     </div>
// </header>
//     )
// };

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { NavLink } from "@/components/navigation/navlink";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Pillars of Islam", href: "/pillars-of-islam" },
  { label: "99 Names of Allah", href: "/names-of-Allah" },
  { label: "Dua & Dhikr", href: "/dua" },
  { label: "Al-Qur'an", href: "/quran" },
  { label: "Hadith", href: "/hadith" },
  { label: "Audio", href: "/audio" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
      {/* Top brand bar */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white text-center py-1.5 text-sm tracking-wide font-medium">
        بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo + site name */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/new-logo.png"
              alt="Muslim Hub Logo"
              width={44}
              height={44}
              priority
              className="h-auto w-auto rounded-full ring-2 ring-emerald-100 group-hover:ring-emerald-300 transition-all"
            />
            <div className="leading-tight">
              <span className="block text-lg font-bold text-emerald-800 group-hover:text-emerald-600 transition-colors">
                Muslim Hub
              </span>
              <span className="block text-xs text-slate-500 font-normal">
                Home for striving Muslims
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="text-sm font-medium px-3 py-2 rounded-md hover:bg-emerald-50"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side: search + mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              aria-label="Search"
              className="p-2 rounded-full text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-slate-100 bg-white shadow-md">
          <ul className="flex flex-col py-2 px-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base border-b border-slate-50 last:border-0"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}