import { Link } from 'react-router-dom';

export default function HeroButtons() {
  return (
    <div className="flex justify-center gap-6 md:gap-12 mt-8 flex-wrap">
      {/* YANA 3D կոճակ */}
      <Link
        to="/yana"
        className="group relative px-10 py-6 md:px-16 md:py-8 rounded-2xl border-2 border-yana bg-yana/10 hover:bg-yana/30 transition-all duration-300 hover:scale-105"
        style={{ boxShadow: '0 0 30px #FF33FA80' }}
      >
        <div className="text-3xl md:text-4xl font-black text-yana glow-yana">
          🩷 YANA
        </div>
        <div className="text-sm mt-2 tracking-widest text-white/70">
          PANEL
        </div>
      </Link>

      {/* EVA 3D կոճակ */}
      <Link
        to="/eva"
        className="group relative px-10 py-6 md:px-16 md:py-8 rounded-2xl border-2 border-eva bg-eva/10 hover:bg-eva/30 transition-all duration-300 hover:scale-105"
        style={{ boxShadow: '0 0 30px #0BFFFF80' }}
      >
        <div className="text-3xl md:text-4xl font-black text-eva glow-eva">
          💠 EVA
        </div>
        <div className="text-sm mt-2 tracking-widest text-white/70">
          PANEL
        </div>
      </Link>
    </div>
  );
}