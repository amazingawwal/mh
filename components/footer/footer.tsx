import Link from "next/link";

const footerLinks = [
  {
    heading: "Learn",
    links: [
      { label: "Pillars of Islam", href: "/pillars-of-islam" },
      { label: "99 Names of Allah", href: "/names-of-Allah" },
      { label: "Al-Qur'an", href: "/quran" },
      { label: "Hadith", href: "/hadith" },
    ],
  },
  {
    heading: "Practice",
    links: [
      { label: "Dua & Dhikr", href: "/dua" },
      { label: "Five Daily Prayers", href: "/prayers" },
    //   { label: "Audio", href: "/audio" },
      { label: "Story of the Prophets", href: "/audio" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-emerald-700 text-emerald-50 mt-16">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">Muslim Hub</h2>
            <p className="text-sm text-emerald-300 mt-0.5">
              {/* بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ */}
            </p>
          </div>
          <p className="text-sm text-emerald-200 leading-relaxed max-w-xs">
            A home for striving Muslims — providing resources to help you grow
            in knowledge, worship, and character.
          </p>
          <p className="text-xs text-black-400 mt-2">
            &ldquo;Seek knowledge from the cradle to the grave.&rdquo;
          </p>
        </div>

        {/* Link columns */}
        {footerLinks.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-widest mb-4">
              {section.heading}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {section.links.map((link, linkIndex) => (
                <li key={`${sectionIndex}-${linkIndex}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black-800">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-black-400">
          <p>© {new Date().getFullYear()} Muslim Hub. All rights reserved.</p>
          <p>Built with ♥ for the Ummah</p>
        </div>
      </div>
    </footer>
  );
}