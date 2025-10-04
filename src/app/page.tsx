'use client';

import GlassNav from '@/app/components.tsx /Glassnav';
import HeroSection from '@/app/components.tsx /Herosection';
import FeaturedCars from './components.tsx /Features';
import HistoryLegacy from './components.tsx /History';
import CarExperience from './components.tsx /CarExperience';
import SoundExperience from './components.tsx /SoundExperience';
import LifestyleCulture from './components.tsx /Lifestyle';
import NewsletterJoin from './components.tsx /Newsletter';
import Footer from './components.tsx /Footer';
export default function Home() {
  return (
    <main className="bg-white text-black relative min-h-screen">
      {/* NAVBAR */}
      <GlassNav />

      {/* HERO SECTION */}
      <HeroSection />

      <FeaturedCars/>

      <HistoryLegacy/>

      <CarExperience/>

<SoundExperience/>

<LifestyleCulture/>

<NewsletterJoin/>

<Footer/>
    </main>
  );
}
