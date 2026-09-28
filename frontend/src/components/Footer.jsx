import { useEffect, useState } from 'react';
import api from '../api/client.js';
import SocialTiles from './SocialTiles.jsx';

export default function Footer() {
  const [general, setGeneral] = useState({
    footerText: '© GG TWIX',
    socials: { youtube: '', instagram: '', tiktok: '' }
  });

  useEffect(() => {
    api.get('/general')
      .then(res => setGeneral(res.data))
      .catch(() => {});
  }, []);

  const { footerText } = general;

  return (
    <footer
      id="contact"
      className="bg-black/60 border-t border-white/5 py-16 px-6 text-center text-sm text-white/60"
    >
      {/* 3D Սոցիալական սեղմակներ */}
      <SocialTiles
        title="GG TWIX-ը սոցցանցերում"
        items={[
          {
            name: 'YouTube',
            icon: 'fa-youtube',
            href: 'https://youtube.com/@evayanagrigoryans',
            color: '#ff0000',
            before: '#cc0000',
            after: '#ff3333'
          },
          {
            name: 'TikTok',
            icon: 'fa-tiktok',
            href: 'https://www.tiktok.com/@gg_twix_official',
            color: '#000000',
            before: '#1a1a1a',
            after: '#333333'
          }
        ]}
      />

      {/* Footer տեքստ */}
      <div className="text-white/40 mt-8">
        {footerText || '© GG TWIX'}
      </div>
    </footer>
  );
}