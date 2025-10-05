'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
});

const sounds = [
  { name: 'Ferrari F40', audio: '/Ferrari.wav', desc: 'A symphony of raw power.', start: 16, end: 28 },
  { name: 'Lamborghini Huracán', audio: '/lamborghini.wav', desc: 'Aggressive. Refined. Unmistakable.', start: 3, end: 9 },
  { name: 'Nissan GT3 R34', audio: '/gt3.wav', desc: 'The legend that echoes eternity.', start: 44, end: 49 },
];

export default function SoundExperience() {
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (audio: typeof sounds[0]) => {
    // Stop any previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlaying(null);
    }

    const newAudio = new Audio(audio.audio);
    if (audio.start) newAudio.currentTime = audio.start;

    newAudio.play();

    // Stop at end time if defined
    if (audio.end) {
      const checkTime = () => {
        if (newAudio.currentTime >= audio.end!) {
          newAudio.pause();
          setPlaying(null);
          audioRef.current = null;
        } else {
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
    <section className="relative bg-black text-white py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black opacity-95" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className={`relative z-10 max-w-6xl mx-auto px-6 text-center ${orbitron.className}`}
      >
        <h2 className="text-5xl font-extrabold mb-6 tracking-widest text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          SOUND EXPERIENCE
        </h2>

        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto tracking-wide">
          Feel the resonance. Every rev tells a story. Immerse yourself in the soul of engineering.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {sounds.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              onClick={() => togglePlay(s)}
              className={`relative rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 bg-white/5 p-8 cursor-pointer transition-all duration-700
                ${
                  playing === s.audio
                    ? 'ring-2 ring-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.4)]'
                    : 'hover:ring-1 hover:ring-white/10'
                }`}
            >
              <h3 className="text-2xl font-bold mb-3 text-red-400">{s.name}</h3>
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
                    className="w-1 bg-red-500 rounded-full"
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
