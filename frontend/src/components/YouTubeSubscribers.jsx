import { useEffect, useState } from 'react';
import api from '../api/client.js';

export default function YouTubeSubscribers() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    function load() {
      api.get('/youtube/subscribers')
        .then(res => setCount(res.data.subscriberCount))
        .catch(() => setCount(0));
    }

    load();

    // Ամեն 5 րոպե → refresh
    const interval = setInterval(load, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (count === null) return null;

  // "1.2K" / "1.5M" ձևաչափ
  function formatCount(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  return (
    <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-yana/30 backdrop-blur-sm">
      <span className="text-3xl">👥</span>
      <div>
        <div className="text-3xl md:text-4xl font-black text-yana glow-yana">
          {formatCount(count)}
        </div>
        <div className="text-xs text-white/50 tracking-widest">
          ԲԱԺԱՆՈՐԴՆԵՐ
        </div>
      </div>
    </div>
  );
}