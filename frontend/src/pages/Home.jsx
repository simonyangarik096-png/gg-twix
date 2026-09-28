import { useEffect, useState } from 'react';
import Scene3D from '../components/Scene3D.jsx';
import HeroButtons from '../components/HeroButtons.jsx';
import YouTubeSubscribers from '../components/YouTubeSubscribers.jsx';
import api from '../api/client.js';

export default function Home() {
  const [general, setGeneral] = useState({});

  // Ընդհանուր կոնտենտի բեռնում
  useEffect(() => {
    api.get('/general')
      .then(res => setGeneral(res.data))
      .catch(() => {
        // Եթե error → մնում են default արժեքները
      });
  }, []);

  return (
    <div className="pt-20">
      {/* ============ HERO — 3D ԼՈԳՈ + ԿՈՃԱԿՆԵՐ ============ */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden px-6">

        {/* Ֆոնային փայլեր (նեոն) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yana/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-eva/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* 3D ԼՈԳՈ — ՄԵԾ */}
        <div className="relative z-10 w-full max-w-3xl h-[40vh] md:h-[50vh] mb-8">
          <Scene3D height="100%" />
        </div>

        {/* Կոճակներ 3D լոգոյի տակ */}
        <div className="relative z-10">
          <HeroButtons />
        </div>
      </section>

      {/* ============ ՀԱՏՎԱԾ 1 — ՀԵՌՈՒՍՏԱՑՈՒՅՑ (ձախ) + ՏԵՔՍՏ (աջ) ============ */}
      <section
        id="videos"
        className="min-h-[60vh] grid md:grid-cols-2 gap-8 items-center px-6 md:px-20 py-20"
      >
        {/* Ձախ՝ 3D հեռուստացույց */}
        <div className="h-[400px] md:h-[500px]">
          <Scene3D height="100%" model="tv" />
        </div>

        {/* Աջ՝ տեքստ + YouTube բաժանորդներ */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-yana glow-yana">
            {general.tvSection?.title || 'Հեռուստացույց'}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            {general.tvSection?.text ||
              'Դիտիր մեր տեսանյութերը մեծ էկրանով։ Սեղմիր հեռուստացույցին՝ մեր ալիքը բացելու համար։'}
          </p>

          {/* YouTube-ի բաժանորդների հաշվիչ */}
          <YouTubeSubscribers />
        </div>
      </section>

      {/* ============ ՀԱՏՎԱԾ 2 — ՏԵՔՍՏ (ձախ) + ԽԱՂԱՅԻՆ ԱՊԱՐԱՏ (աջ) ============ */}
      <section className="min-h-[60vh] grid md:grid-cols-2 gap-8 items-center px-6 md:px-20 py-20">
        {/* Ձախ՝ տեքստ */}
        <div className="order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-eva glow-eva">
            {general.gameSection?.title || 'Խաղային ապարատ'}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            {general.gameSection?.text ||
              'Փորձիր մեր խաղային ապարատը։ Շուտով կլինի խաղ։'}
          </p>
        </div>

        {/* Աջ՝ 3D խաղային ապարատ */}
        <div className="h-[400px] md:h-[500px] order-1 md:order-2">
          <Scene3D height="100%" model="console" />
        </div>
      </section>
    </div>
  );
}