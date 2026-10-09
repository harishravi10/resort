import React from 'react';
import { HeroCinematic } from '../sections/HeroCinematic';
import { ScrollStory } from '../sections/ScrollStory';
import { FeaturedVillasSection } from '../sections/FeaturedVillasSection';
import { DiningSection } from '../sections/DiningSection';
import { SpaWellnessSection } from '../sections/SpaWellnessSection';
import { ExperiencesSection } from '../sections/ExperiencesSection';
import { LocationGlobeSection } from '../sections/LocationGlobeSection';
import { ReviewsSection } from '../sections/ReviewsSection';

export const Home = () => {
  const handleScrollToStory = () => {
    const el = document.getElementById('resort-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <HeroCinematic onExploreClick={handleScrollToStory} />
      <ScrollStory />
      <FeaturedVillasSection />
      <DiningSection />
      <SpaWellnessSection />
      <ExperiencesSection />
      <LocationGlobeSection />
      <ReviewsSection />
    </main>
  );
};
