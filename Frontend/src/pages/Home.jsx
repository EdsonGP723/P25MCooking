import { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import HeroSection from '../components/HeroSection';
import SearchFilter from '../components/SearchFilter';
import RecipeGallery from '../components/RecipeGallery';
import RecipeModal from '../components/RecipeModal';
import Footer from '../components/Footer';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-fixed-dim selection:text-on-primary-container">
      <TopNavBar />
      
      <main>
        <HeroSection />
        <SearchFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <RecipeGallery 
          onOpenAddModal={() => setIsModalOpen(true)}
          searchQuery={searchQuery}
          activeFilter={activeFilter}
        />
      </main>
      
      <Footer />

      <RecipeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
