import { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import HeroSection from '../components/HeroSection';
import SearchFilter from '../components/SearchFilter';
import RecipeGallery from '../components/RecipeGallery';
import RecipeModal from '../components/RecipeModal';
import Footer from '../components/Footer';
import FloatingActionBar from '../components/FloatingActionBar';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-fixed-dim selection:text-on-primary-container">
      <TopNavBar />
      
      <main>
        <HeroSection />
        <SearchFilter />
        <RecipeGallery onOpenAddModal={() => setIsModalOpen(true)} />
      </main>
      
      <Footer />
      <FloatingActionBar />

      <RecipeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
