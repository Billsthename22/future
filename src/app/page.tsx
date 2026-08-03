'use client';

import GlassNav from '@/app/components/Glassnav';
import HeroSection from '@/app/components/Herosection';
import FeaturedCars from './components/Features';
import HistoryLegacy from './components/History';
import CarExperience from './components/CarExperience';
import SoundExperience from './components/SoundExperience';
import LifestyleCulture from './components/Lifestyle';
import NewsletterJoin from './components/Newsletter';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

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
      <ChatWidget />
    </main>
  );
}
