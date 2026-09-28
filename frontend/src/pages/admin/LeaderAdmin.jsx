import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function LeaderAdmin() {
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    role: 'yana'
  });
  const [showCreate, setShowCreate] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
    loadLogs();
  }, []);

  async function loadUsers() {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Users error:', err.message);
    }
  }

  async function loadLogs() {
    try {
      const res = await api.get('/admin/logs');
      setLogs(res.data);
    } catch (err) {
      console.error('Logs error:', err.message);
    }
  }

  // Ստեղծել նոր ադմին
  async function createAdmin(e) {
    e.preventDefault();
    try {
      await api.post('/admin/users', form);
      setForm({ username: '', password: '', email: '', role: 'yana' });
      setShowCreate(false);
      loadUsers();
      loadLogs();
      alert('✅ Ադմին ստեղծված է');
    } catch (err) {
      alert('Սխալ: ' + (err.response?.data?.error || err.message));
    }
  }

  // Ջնջել ադմին
  async function deleteAdmin(id) {
    if (!confirm('Ջնջե՞լ այս ադմինին')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      loadUsers();
      loadLogs();
    } catch (err) {
      alert('Սխալ: ' + (err.response?.data?.error || err.message));
    }
  }

  // Փոխել password
  async function changePassword(id, username) {
    const pwd = prompt(`Նոր password "${username}"-ի համար (min 4):`);
    if (!pwd) return;

    try {
      await api.put(`/admin/users/${id}/password`, { password: pwd });
      loadLogs();
      alert('✅ Password փոխված է');
    } catch (err) {
      alert('Սխալ: ' + (err.response?.data?.error || err.message));
    }
  }

  // Փոխել դերը
  async function changeRole(id, newRole) {
    try {
      await api.put(`/admin/users/${id}`, { role: newRole });
      loadUsers();
      loadLogs();
    } catch (err) {
      alert('Սխալ: ' + (err.response?.data?.error || err.message));
    }
  }

  const roleColors = {
    leader: 'text-leader',
    yana: 'text-yana',
    eva: 'text-eva',
    general: 'text-white'
  };

  return (
    <div className="min-h-screen bg-dark pt-24 px-6 md:px-12 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-4xl font-black text-leader glow-leader">👑 LEADER ADMIN</h1>
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

      {/* Tabs */}
      <div className="flex gap-3 mb-8 border-b border-white/10">
        <button
          onClick={() => setTab('users')}
          className={`px-6 py-3 transition ${
            tab === 'users'
              ? 'text-leader border-b-2 border-leader'
              : 'text-white/60 hover:text-white'
          }`}
        >
          👥 Ադմիններ ({users.length})
        </button>
        <button
          onClick={() => setTab('logs')}
          className={`px-6 py-3 transition ${
            tab === 'logs'
              ? 'text-leader border-b-2 border-leader'
              : 'text-white/60 hover:text-white'
          }`}
        >
          📜 Գործողություններ ({logs.length})
        </button>
      </div>

      {/* Users Tab */}
      {tab === 'users' && (
        <div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="mb-6 px-6 py-3 bg-leader/20 border border-leader/50 rounded-lg hover:bg-leader/30 text-leader font-bold transition"
          >
            {showCreate ? '− Փակել' : '+ Ստեղծել ադմին'}
          </button>

          {/* Create form */}
          {showCreate && (
            <form
              onSubmit={createAdmin}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 grid md:grid-cols-2 gap-4"
            >
              <input
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                placeholder="Օգտանուն"
                required
                minLength={3}
                className="bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-leader transition"
              />
              <input
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Գաղտնաբառ (min 4)"
                required
                minLength={4}
                className="bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-leader transition"
              />
              <input
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="Email (ոչ պարտադիր)"
                type="email"
                className="bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-leader transition"
              />
              <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="bg-black/50 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-leader transition"
              >
                <option value="yana">🩷 Yana Admin</option>
                <option value="eva">💠 Eva Admin</option>
                <option value="general">⚙️ Ընդհանուր Admin</option>
                <option value="leader">👑 Leader Admin</option>
              </select>
              <button
                type="submit"
                className="md:col-span-2 bg-leader text-black py-3 rounded-lg font-bold hover:opacity-90 transition"
              >
                ✅ Ստեղծել
              </button>
            </form>
          )}

          {/* Users list */}
          {users.length === 0 ? (
            <div className="text-white/40 text-center py-12">Ադմիններ դեռ չկան</div>
          ) : (
            <div className="space-y-3">
              {users.map(u => (
                <div
                  key={u._id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 flex-wrap"
                >
                  <div className="flex-1 min-w-[200px]">
                    <div className="font-bold text-lg">
                      {u.username}
                      {u._id === user?.id && (
                        <span className="text-xs text-leader ml-2">(Դու)</span>
                      )}
                    </div>
                    <div className="text-xs text-white/50">{u.email || '—'}</div>
                  </div>

                  <select
                    value={u.role}
                    onChange={e => changeRole(u._id, e.target.value)}
                    className={`bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none ${roleColors[u.role]}`}
                  >
                    <option value="yana">Yana</option>
                    <option value="eva">Eva</option>
                    <option value="general">General</option>
                    <option value="leader">Leader</option>
                  </select>

                  <button
                    onClick={() => changePassword(u._id, u.username)}
                    className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition"
                  >
                    🔑 Password
                  </button>

                  <button
                    onClick={() => deleteAdmin(u._id)}
                    disabled={u._id === user?.id}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-sm hover:bg-red-500/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    🗑 Ջնջել
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Logs Tab */}
      {tab === 'logs' && (
        <div className="space-y-2">
          {logs.length === 0 ? (
            <div className="text-white/40 text-center py-12">Գործողություններ դեռ չկան</div>
          ) : (
            logs.map(log => (
              <div
                key={log._id}
                className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center gap-4 flex-wrap"
              >
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="font-bold text-leader">{log.username}</span>
                  <span className="text-white/40">→</span>
                  <span className="text-yana font-mono">{log.action}</span>
                  {log.target && (
                    <>
                      <span className="text-white/40">·</span>
                      <span className="text-white/60">{log.target}</span>
                    </>
                  )}
                  {log.details && (
                    <>
                      <span className="text-white/40">·</span>
                      <span className="text-white/70">{log.details}</span>
                    </>
                  )}
                </div>
                <div className="text-xs text-white/40">
                  {new Date(log.createdAt).toLocaleString('hy-AM')}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}