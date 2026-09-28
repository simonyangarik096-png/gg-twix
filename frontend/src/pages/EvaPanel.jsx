import { useEffect, useState } from 'react';
import api from '../api/client.js';
import SocialTiles from '../components/SocialTiles.jsx';

// YouTube / ուղիղ MP4 URL-ները տարբերելու ֆունկցիա
function getVideoEmbed(src) {
  if (!src) return { type: 'unknown' };

  if (src.includes('youtube.com/watch?v=')) {
    const id = src.split('v=')[1].split('&')[0];
    return { type: 'youtube', id };
  }
  if (src.includes('youtu.be/')) {
    const id = src.split('youtu.be/')[1].split('?')[0];
    return { type: 'youtube', id };
  }
  if (src.includes('youtube.com/shorts/')) {
    const id = src.split('shorts/')[1].split('?')[0];
    return { type: 'youtube', id };
  }
  if (src.includes('youtube.com/embed/')) {
    const id = src.split('embed/')[1].split('?')[0];
    return { type: 'youtube', id };
  }

  return { type: 'direct', src };
}

export default function EvaPanel() {
  const [content, setContent] = useState({
    bio: '',
    images: [],
    videos: []
  });

  useEffect(() => {
    api.get('/eva')
      .then(res => setContent(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="pt-24 px-6 md:px-20 pb-20 min-h-screen">
      {/* Վերնագիր */}
      <div className="mb-12">
        <h1 className="text-6xl md:text-7xl font-black text-eva glow-eva mb-4">
          💠 EVA
        </h1>
        {content.bio && (
          <p className="text-white/70 max-w-3xl text-lg leading-relaxed">
            {content.bio}
          </p>
        )}
      </div>

      {/* Սոցիալական ցանցեր */}
      <SocialTiles
        title="Հետևիր Eva-յին"
        items={[
          {
            name: 'Instagram',
            icon: 'fa-instagram',
            href: 'https://www.instagram.com/eevagrig_',
            color: '#e4405f',
            before: '#d81c3f',
            after: '#e46880'
          },
          {
            name: 'TikTok',
            icon: 'fa-tiktok',
            href: 'https://www.tiktok.com/@evagrigoryan_',
            color: '#000000',
            before: '#1a1a1a',
            after: '#333333'
          }
        ]}
      />

      {/* Նկարներ */}
      <section className="mb-16">
        <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
          <span className="text-eva">🖼️</span> Նկարներ
        </h2>

        {content.images?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {content.images.map((img, i) => (
              <div
                key={i}
                className="group relative rounded-xl overflow-hidden border border-eva/30 hover:border-eva transition-all duration-300 hover:scale-105"
              >
                <img
                  src={img.url}
                  alt={img.caption || `Eva ${i + 1}`}
                  className="w-full h-48 md:h-56 object-cover"
                />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm text-white">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white/40 text-center py-12 border border-white/10 rounded-xl">
            Դեռ նկարներ չկան
          </div>
        )}
      </section>

      {/* Տեսանյութեր */}
      <section className="mb-16">
        <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
          <span className="text-eva">🎬</span> Տեսանյութեր
        </h2>

        {content.videos?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {content.videos.map((v, i) => {
              const embed = getVideoEmbed(v.src);

              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-eva/30 hover:border-eva transition"
                >
                  {embed.type === 'youtube' ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${embed.id}`}
                      className="w-full aspect-video bg-black"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title={v.title || `Eva video ${i + 1}`}
                    />
                  ) : (
                    <video
                      src={v.src}
                      controls
                      className="w-full aspect-video bg-black"
                      preload="metadata"
                    />
                  )}

                  {v.title && (
                    <div className="p-4 bg-black/40">
                      <p className="text-sm md:text-base">{v.title}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-white/40 text-center py-12 border border-white/10 rounded-xl">
            Դեռ տեսանյութեր չկան
          </div>
        )}
      </section>
    </div>
  );
}