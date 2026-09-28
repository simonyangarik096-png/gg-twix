import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function GeneralAdmin() {
  const [content, setContent] = useState({});
  const [saving, setSaving] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Կոնտենտի բեռնում
  useEffect(() => {
    api.get('/general')
      .then(res => setContent(res.data))
      .catch(() => {
        // Եթե error → մնում է default state-ը
      });
  }, []);

  // Պահել փոփոխությունները
  async function save() {
    setSaving(true);
    try {
      await api.put('/general', content);
      alert('Պահված է ✅');
    } catch (err) {
      alert('Սխալ: ' + (err.response?.data?.error || err.message));
    } finally {
      setSaving(false);
    }
  }

  // Թարմացնել top-level դաշտը
  function update(field, value) {
    setContent({ ...content, [field]: value });
  }

  // Թարմացնել nested object-ի դաշտը
  function updateNested(parent, field, value) {
    setContent({
      ...content,
      [parent]: { ...content[parent], [field]: value }
    });
  }

  return (
    <div className="min-h-screen bg-dark pt-24 px-6 md:px-12 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-4xl font-black">⚙️ ԸՆԴՀԱՆՈՒՐ ADMIN</h1>
        <div className="flex gap-3">
          <span className="text-sm text-white/60 self-center">{user?.username}</span>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 text-sm transition"
          >
            Ելք
          </button>
        </div>
      </div>

      <div className="max-w-4xl space-y-6">

        {/* Hero Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold">🎯 Hero</h2>
          <div>
            <label className="block text-sm text-white/60 mb-2">Վերնագիր</label>
            <input
              value={content.heroTitle || ''}
              onChange={e => update('heroTitle', e.target.value)}
              placeholder="GG TWIX"
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-yana transition"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Ենթավերնագիր</label>
            <input
              value={content.heroSubtitle || ''}
              onChange={e => update('heroSubtitle', e.target.value)}
              placeholder="Երկու քույր, մեկ ալիք"
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-yana transition"
            />
          </div>
        </div>

        {/* Հեռուստացույցի բաժին */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold">📺 Հեռուստացույցի բաժին</h2>
          <div>
            <label className="block text-sm text-white/60 mb-2">Վերնագիր</label>
            <input
              value={content.tvSection?.title || ''}
              onChange={e => updateNested('tvSection', 'title', e.target.value)}
              placeholder="Հեռուստացույց"
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-yana transition"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Տեքստ</label>
            <textarea
              value={content.tvSection?.text || ''}
              onChange={e => updateNested('tvSection', 'text', e.target.value)}
              placeholder="Նկարագրություն..."
              className="w-full h-24 bg-black/50 border border-white/20 rounded-lg p-4 outline-none focus:border-yana transition"
            />
          </div>
        </div>

        {/* Խաղի բաժին */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold">🎮 Խաղի բաժին</h2>
          <div>
            <label className="block text-sm text-white/60 mb-2">Վերնագիր</label>
            <input
              value={content.gameSection?.title || ''}
              onChange={e => updateNested('gameSection', 'title', e.target.value)}
              placeholder="Խաղային ապարատ"
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-yana transition"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">Տեքստ</label>
            <textarea
              value={content.gameSection?.text || ''}
              onChange={e => updateNested('gameSection', 'text', e.target.value)}
              placeholder="Նկարագրություն..."
              className="w-full h-24 bg-black/50 border border-white/20 rounded-lg p-4 outline-none focus:border-yana transition"
            />
          </div>
        </div>

        {/* Սոցիալական ցանցեր */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold">🔗 Սոցիալական ցանցեր</h2>
          <div>
            <label className="block text-sm text-white/60 mb-2">📺 YouTube</label>
            <input
              value={content.socials?.youtube || ''}
              onChange={e => updateNested('socials', 'youtube', e.target.value)}
              placeholder="https://youtube.com/@..."
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-yana transition"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">📷 Instagram</label>
            <input
              value={content.socials?.instagram || ''}
              onChange={e => updateNested('socials', 'instagram', e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-yana transition"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-2">🎵 TikTok</label>
            <input
              value={content.socials?.tiktok || ''}
              onChange={e => updateNested('socials', 'tiktok', e.target.value)}
              placeholder="https://tiktok.com/@..."
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-yana transition"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold">© Footer</h2>
          <div>
            <label className="block text-sm text-white/60 mb-2">Footer տեքստ</label>
            <input
              value={content.footerText || ''}
              onChange={e => update('footerText', e.target.value)}
              placeholder="© GG TWIX"
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-yana transition"
            />
          </div>
        </div>

        {/* Պահելու կոճակ */}
        <button
          onClick={save}
          disabled={saving}
          className="w-full bg-gradient-to-r from-purple-500 to-yana py-4 rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition"
        >
          {saving ? '⏳ Պահվում...' : '💾 Պահել'}
        </button>
      </div>
    </div>
  );
}