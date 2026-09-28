import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/client.js';

export default function Navbar() {
  const [general, setGeneral] = useState({ navbarLinks: [] });

  useEffect(() => {
    api.get('/general')
      .then(res => setGeneral(res.data))
      .catch(() => {
        // Եթե backend չի պատասխանում, օգտագործում ենք default հղումները
      });
  }, []);

  // Եթե DB-ից հղումներ չկան → օգտագործում ենք default-ը
  const links = general.navbarLinks?.length
    ? general.navbarLinks
    : [
        { label: 'Գլխավոր', href: '/' },
        { label: 'Տեսանյութեր', href: '/#videos' },
        { label: 'Խաղ', href: '/game' },
        { label: 'Կապ', href: '/#contact' }
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-4 bg-black/70 backdrop-blur-lg border-b border-white/5">
      {/* Լոգո */}
      <Link to="/" className="text-2xl font-black tracking-widest">
        GG <span className="text-yana">TWIX</span>
      </Link>

      {/* Հղումներ (desktop) */}
      <ul className="hidden md:flex gap-8 text-sm">
        {links.map((l, i) => (
          <li key={i}>
            <a
              href={l.href}
              className="hover:text-yana transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Մուտք կոճակ */}
      <Link
        to="/admin/login"
        className="text-xs px-4 py-2 rounded-full border border-yana/50 hover:bg-yana/20 transition-colors"
      >
        🔐 Մուտք
      </Link>
    </nav>
  );
}