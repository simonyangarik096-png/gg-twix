export default function GamePage() {
  return (
    <div className="pt-24 px-6 min-h-screen flex items-center justify-center text-center relative overflow-hidden">
      {/* Ֆոնային փայլեր */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-eva/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yana/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl">
        <div className="text-8xl md:text-9xl mb-8 animate-bounce">
          🎮
        </div>

        <h1 className="text-6xl md:text-7xl font-black mb-6 text-eva glow-eva">
          ԽԱՂ
        </h1>

        <p className="text-2xl md:text-3xl text-white/60 mb-12">
          Շուտով...
        </p>

        <div className="text-sm text-white/40 mb-8">
          Այս բաժնում կլինի խաղ, որը կկառավարես մկնիկով։
        </div>

        <a
          href="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-eva to-cyan-700 rounded-full font-bold hover:opacity-90 transition"
        >
          ← Վերադառնալ գլխավոր
        </a>
      </div>
    </div>
  );
}