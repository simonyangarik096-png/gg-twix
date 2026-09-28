import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();

  // 1. Սպասում ենք, մինչև auth state-ը բեռնվի
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div>Բեռնում...</div>
        </div>
      </div>
    );
  }

  // 2. Եթե օգտատերը մուտք գործած չէ → ուղղորդում login էջ
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // 3. Եթե դերերը սահմանված են → ստուգում ենք
  // Leader-ը միշտ անցնում է
  if (roles.length && user.role !== 'leader' && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // 4. Ամեն ինչ լավ է → ցուցադրում ենք child-ը
  return children;
}