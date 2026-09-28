import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Login-ի ենթարկում
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(username, password);

      // Ըստ դերի → համապատասխան panel
      if (user.role === 'yana') navigate('/admin/yana');
      else if (user.role === 'eva') navigate('/admin/eva');
      else if (user.role === 'general') navigate('/admin/general');
      else if (user.role === 'leader') navigate('/admin/leader');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Մուտքի սխալ');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ֆոնային փայլեր */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yana/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-eva/20 rounded-full blur-3xl pointer-events-none"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg"
      >
        {/* Վերնագիր */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-black tracking-widest inline-block">
            GG <span className="text-yana">TWIX</span>
          </Link>
          <div className="text-xs text-white/40 mt-2 tracking-widest">
            ADMIN PANEL
          </div>
        </div>

        {/* Սխալի հաղորդագրություն */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg p-3 mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {/* Օգտանուն */}
        <label className="block mb-4">
          <span className="text-sm text-white/60 block mb-2">Օգտանուն</span>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
            required
            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-yana transition"
            placeholder="Մուտքագրիր օգտանունը"
          />
        </label>

        {/* Գաղտնաբառ */}
        <label className="block mb-6">
          <span className="text-sm text-white/60 block mb-2">Գաղտնաբառ</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-yana transition"
            placeholder="Մուտքագրիր գաղտնաբառը"
          />
        </label>

        {/* Մուտք կոճակ */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yana to-purple-600 py-3 rounded-lg font-bold text-white hover:opacity-90 disabled:opacity-50 transition"
        >
          {loading ? '⏳ Մուտք...' : '🔐 Մուտք գործել'}
        </button>

        {/* Հետ գնալ */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs text-white/40 hover:text-white/70 transition"
          >
            ← Վերադառնալ գլխավոր
          </Link>
        </div>
      </form>
    </div>
  );
}