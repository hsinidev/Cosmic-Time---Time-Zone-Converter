import React, { useState } from 'react';
import ThemeLayout from './components/ThemeLayout';
import TimeZoneConverterTool from './components/TimeZoneConverterTool';
import SeoArticle from './components/SeoArticle';
import { ModalType } from './types';

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [isArticleExpanded, setIsArticleExpanded] = useState(false);
  
  const articlePreview = "In our hyper-connected world, understanding time is more complex than simply looking at a clock. Global business, international travel, and digital communication all hinge on a shared, precise understanding of time across different geographical locations. This comprehensive guide delves into the intricate world of time zones, the confusing mechanics of Daylight Saving Time (DST), and the standards that govern our global clocks.";


  return (
    <ThemeLayout 
      activeModal={activeModal} 
      setActiveModal={setActiveModal}
    >
      <div className="w-full space-y-12">
        <TimeZoneConverterTool />

        <div className="max-w-7xl mx-auto">
            <div className="bg-slate-900 bg-opacity-50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl shadow-purple-500/20 transition-all duration-500">
              <h2 className="text-3xl font-bold font-orbitron mb-4 text-purple-300">A Deep Dive into Global Time</h2>
              
              {!isArticleExpanded && (
                 <p className="text-slate-300 mb-6 line-clamp-2">
                    {articlePreview}
                 </p>
              )}
              
              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isArticleExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <SeoArticle />
              </div>

              <button 
                onClick={() => setIsArticleExpanded(!isArticleExpanded)}
                className="mt-4 font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                aria-expanded={isArticleExpanded}
              >
                {isArticleExpanded ? 'Show Less' : 'Read More...'}
              </button>
            </div>
        </div>
      </div>
    </ThemeLayout>
  );
};

export default App;