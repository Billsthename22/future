'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const sounds = [
  { name: 'Ferrari F40', audio: '/sounds/f40.mp3', desc: 'A symphony of raw power.' },
  { name: 'Lamborghini Huracán', audio: '/sounds/huracan.mp3', desc: 'Aggressive. Refined. Unmistakable.' },
  { name: 'Nissan GTR R34', audio: '/sounds/gtr.mp3', desc: 'The legend that echoes eternity.' },
];

export default function SoundExperience() {
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (audioSrc: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlaying(null);
    }

    const newAudio = new Audio(audioSrc);
    newAudio.play();
    newAudio.onended = () => setPlaying(null);
    audioRef.current = newAudio;
    setPlaying(audioSrc);
  };

  return (
    <section className="relative bg-black text-white py-28 overflow-hidden">
      {/* Cinematic glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black opacity-95" />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight">Sound Experience</h2>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          Feel the resonance. Every rev tells a story. Immerse yourself in the soul of engineering.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {sounds.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              onClick={() => togglePlay(s.audio)}
              className={`relative rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 bg-white/5 p-8 cursor-pointer transition-all duration-700
                ${playing === s.audio ? 'ring-2 ring-yellow-400/60 shadow-[0_0_25px_rgba(250,204,21,0.3)]' : 'hover:ring-1 hover:ring-white/10'}`}
            >
              <h3 className="text-2xl font-semibold mb-3">{s.name}</h3>
              <p className="text-gray-400 mb-8">{s.desc}</p>

              <div className="flex items-end justify-center space-x-2 h-14">
                {Array.from({ length: 6 }).map((_, j) => (
                  <motion.div
                    key={j}
                    animate={
                      playing === s.audio
                        ? { height: ['0.5rem', '2rem', '0.8rem'], opacity: [0.7, 1, 0.7] }
                        : { height: '0.5rem', opacity: 0.3 }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 0.5 + j * 0.15,
                      ease: 'easeInOut',
                    }}
                    className="w-1 bg-yellow-400 rounded-full"
                  />
                ))}
              </div>

              <p className="mt-6 text-sm text-gray-500 italic">
                {playing === s.audio ? 'Playing — turn up your volume.' : 'Tap to listen'}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
