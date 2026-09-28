import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function EvaAdmin() {
  const [content, setContent] = useState({ bio: '', images: [], videos: [] });
  const [saving, setSaving] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Կոնտենտի բեռնում
  useEffect(() => {
    api.get('/eva')
      .then(res => setContent(res.data))
      .catch(() => {
        // Եթե error → մնում է default state-ը
      });
  }, []);

  // Պահել փոփոխությունները
  async function save() {
    setSaving(true);
    try {
      await api.put('/eva', content);
      alert('Պահված է ✅');
    } catch (err) {
      alert('Սխալ: ' + (err.response?.data?.error || err.message));
    } finally {
      setSaving(false);
    }
  }

  // Նկարի վերբեռնում
  async function uploadImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await api.post('/upload/image', fd);
      setContent({
        ...content,
        images: [...(content.images || []), { url: res.data.url, caption: '' }]
      });
    } catch (err) {
      alert('Վերբեռնման սխալ: ' + (err.response?.data?.error || err.message));
    }
  }

  // Վիդեոյի վերբեռնում (ֆայլից)
  async function uploadVideo(e) {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await api.post('/upload/video', fd);
      setContent({
        ...content,
        videos: [...(content.videos || []), { type: 'file', src: res.data.url, title: '' }]
      });
    } catch (err) {
      alert('Վերբեռնման սխալ: ' + (err.response?.data?.error || err.message));
    }
  }

  // Վիդեոյի ավելացում URL-ով
  function addVideoUrl() {
    const url = prompt('Տեսանյութի URL:');
    if (url) {
      setContent({
        ...content,
        videos: [...(content.videos || []), { type: 'url', src: url, title: '' }]
      });
    }
  }

  // Նկարի ջնջում
  function removeImage(i) {
    setContent({ ...content, images: content.images.filter((_, idx) => idx !== i) });
  }

  // Վիդեոյի ջնջում
  function removeVideo(i) {
    setContent({ ...content, videos: content.videos.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="min-h-screen bg-dark pt-24 px-6 md:px-12 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-4xl font-black text-eva glow-eva">💠 EVA ADMIN</h1>
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

      <div className="max-w-4xl space-y-8">
        {/* Bio */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <label className="block text-sm text-white/60 mb-2">Bio / Նկարագրություն</label>
          <textarea
            value={content.bio || ''}
            onChange={e => setContent({ ...content, bio: e.target.value })}
            className="w-full h-32 bg-black/50 border border-white/20 rounded-lg p-4 focus:border-eva outline-none transition"
            placeholder="Գրիր Eva-ի մասին..."
          />
        </div>

        {/* Նկարներ */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">🖼️ Նկարներ</h2>
            <label className="cursor-pointer px-4 py-2 bg-eva/30 rounded-lg text-sm hover:bg-eva/50 transition">
              + Ավելացնել
              <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
                className="hidden"
              />
            </label>
          </div>
          {content.images?.length === 0 ? (
            <div className="text-white/40 text-center py-6">Դեռ նկարներ չկան</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {content.images?.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={img.url}
                    alt={img.caption || `Eva ${i + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 bg-red-500 rounded-full w-7 h-7 opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Վիդեոներ */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h2 className="text-xl font-bold">🎬 Տեսանյութեր</h2>
            <div className="flex gap-2">
              <button
                onClick={addVideoUrl}
                className="px-4 py-2 bg-eva/30 rounded-lg text-sm hover:bg-eva/50 transition"
              >
                + URL
              </button>
              <label className="cursor-pointer px-4 py-2 bg-eva/30 rounded-lg text-sm hover:bg-eva/50 transition">
                + Upload
                <input
                  type="file"
                  accept="video/*"
                  onChange={uploadVideo}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          {content.videos?.length === 0 ? (
            <div className="text-white/40 text-center py-6">Դեռ տեսանյութեր չկան</div>
          ) : (
            <div className="space-y-3">
              {content.videos?.map((v, i) => (
                <div key={i} className="flex items-center gap-3 bg-black/30 p-3 rounded-lg flex-wrap">
                  <video src={v.src} className="w-24 h-16 object-cover rounded" />
                  <input
                    value={v.title || ''}
                    onChange={e => {
                      const arr = [...content.videos];
                      arr[i].title = e.target.value;
                      setContent({ ...content, videos: arr });
                    }}
                    placeholder="Անվանում"
                    className="flex-1 bg-black/50 border border-white/20 rounded px-3 py-2 text-sm outline-none focus:border-eva transition"
                  />
                  <button
                    onClick={() => removeVideo(i)}
                    className="text-red-400 hover:text-red-300 px-3 text-xl"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Պահելու կոճակ */}
        <button
          onClick={save}
          disabled={saving}
          className="w-full bg-gradient-to-r from-eva to-cyan-700 py-4 rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition"
        >
          {saving ? '⏳ Պահվում...' : '💾 Պահել'}
        </button>
      </div>
    </div>
  );
}