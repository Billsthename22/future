'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const sounds = [
  { name: 'Ferrari F40', audio: '/Ferrari.wav', desc: 'V8 Twin-Turbocharged Symphony.', code: 'FREQ-F40', start: 16, end: 28 },
  { name: 'Lamborghini Huracán', audio: '/lamborghini.wav', desc: 'V10 Naturally Aspirated Aggression.', code: 'FREQ-V10', start: 3, end: 9 },
  { name: 'Nissan GT3 R34', audio: '/gt3.wav', desc: 'Straight-Six RB26 Induction Echo.', code: 'FREQ-R34', start: 44, end: 49 },
];

export default function SoundExperience() {
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (audio: typeof sounds[0]) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      if (playing === audio.audio) {
        setPlaying(null);
        return;
      }
    }

    const newAudio = new Audio(audio.audio);
    if (audio.start) newAudio.currentTime = audio.start;
    newAudio.play();

    if (audio.end) {
      const checkTime = () => {
        if (newAudio.currentTime >= audio.end!) {
          newAudio.pause();
          setPlaying(null);
          audioRef.current = null;
        } else if (audioRef.current === newAudio) {
          requestAnimationFrame(checkTime);
        }
      };
      requestAnimationFrame(checkTime);
    }

    newAudio.onended = () => setPlaying(null);
    audioRef.current = newAudio;
    setPlaying(audio.audio);
  };

  return (
    <section className="relative bg-[#050505] text-white py-32 overflow-hidden border-t border-white/5">
      {/* Background HUD Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-white/10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-white/10 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`text-red-600 text-xs tracking-[0.5em] font-bold uppercase ${orbitron.className}`}
          >
            Acoustic Analysis
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-6xl font-black mt-4 uppercase tracking-tighter ${orbitron.className}`}
          >
            The <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Sonic</span> Signature
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sounds.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => togglePlay(s)}
              className={`group relative p-8 rounded-sm border transition-all duration-500 cursor-pointer overflow-hidden
                ${playing === s.audio 
                  ? 'bg-red-950/20 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.15)]' 
                  : 'bg-white/5 border-white/10 hover:border-red-600/50 hover:bg-white/[0.07]'}`}
            >
              {/* Top Meta Info */}
              <div className="flex justify-between items-start mb-10">
                <div className={`text-[10px] tracking-[0.2em] text-gray-500 uppercase ${orbitron.className}`}>
                  {s.code}
                </div>
                <div className={`w-2 h-2 rounded-full ${playing === s.audio ? 'bg-red-600 animate-pulse shadow-[0_0_8px_#dc2626]' : 'bg-white/10'}`} />
              </div>

              <h3 className={`text-2xl font-bold mb-2 tracking-wide ${orbitron.className}`}>{s.name}</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-12 h-8">{s.desc}</p>

              {/* Enhanced Visualizer */}
              <div className="flex items-end justify-between h-16 w-full px-2 gap-[2px]">
                {Array.from({ length: 16 }).map((_, j) => (
                  <motion.div
                    key={j}
                    animate={
                      playing === s.audio
                        ? { height: [
                            `${Math.random() * 40 + 20}%`, 
                            `${Math.random() * 80 + 20}%`, 
                            `${Math.random() * 30 + 10}%`
                          ] }
                        : { height: '10%' }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 0.3 + (j % 5) * 0.1,
                      ease: 'linear',
                    }}
                    className={`w-full rounded-t-[1px] ${playing === s.audio ? 'bg-red-600' : 'bg-white/20'}`}
                  />
                ))}
              </div>

              {/* Playback Label */}
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <span className={`text-[9px] uppercase tracking-widest ${orbitron.className}`}>
                  {playing === s.audio ? 'Signal Active' : 'Standby Mode'}
                </span>
                <div className={`text-[10px] font-bold ${playing === s.audio ? 'text-red-500' : 'text-gray-600'}`}>
                  {playing === s.audio ? 'STOP' : 'PLAY'}
                </div>
              </div>

              {/* Corner Decorative Detail */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r border-b border-red-600/30 group-hover:border-red-600 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}