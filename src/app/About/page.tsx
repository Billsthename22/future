'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700', '900'] });

const timeline = [
  {
    year: '1886',
    title: 'The Birth of the Automobile',
    desc: 'Karl Benz built the first gasoline-powered automobile — the Benz Patent-Motorwagen. It marked the beginning of human obsession with speed and freedom.',
    image: '/cars/history1.jpg',
  },
  {
    year: '1960s',
    title: 'The Muscle Car Era',
    desc: 'Power met personality. The Ford Mustang, Dodge Charger, and Camaro defined rebellion, design, and raw power on the streets.',
    image: '/cars/history2.jpg',
  },
  {
    year: '1980s–1990s',
    title: 'Supercar Revolution',
    desc: 'Ferrari, Lamborghini, and McLaren pushed boundaries — creating legends like the F40, Countach, and F1. The dream of ultimate speed was alive.',
    image: '/cars/history3.jpg',
  },
  {
    year: '2000s–Today',
    title: 'The Age of Innovation',
    desc: 'From electric revolutions to hypercars, the blend of technology and design continues. Tesla, Bugatti, Rimac — the future is fast and fearless.',
    image: '/cars/history4.jpg',
  },
];

export default function AboutPage() {
  return (
    <section className="bg-black text-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 uppercase tracking-widest ${orbitron.className}`}>
            About <span className="text-red-600">The Legacy</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Every car tells a story — of innovation, emotion, and the relentless pursuit of perfection.
            This site celebrates that evolution, one machine at a time.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-24">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}
            >
              <div className="flex-1 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg border border-red-900/30 object-cover w-full h-[350px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 rounded-2xl" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-red-600 ${orbitron.className}`}>
                  {item.year}
                </h2>
                <h3 className={`text-2xl font-semibold mb-3 ${orbitron.className}`}>{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inspiration Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 ${orbitron.className}`}>
            Why These Cars?
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-lg">
            These cars were chosen not just for their speed — but for their soul.
            Each one represents a moment in time when human creativity redefined what was possible.
            From the roar of combustion to the silence of electricity, this is the timeline of motion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
