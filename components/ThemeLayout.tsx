import React from 'react';
import { ModalType } from '../types';

interface ThemeLayoutProps {
  children: React.ReactNode;
  activeModal: ModalType | null;
  setActiveModal: (modal: ModalType | null) => void;
}

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
    <div className="bg-slate-800 bg-opacity-90 border border-slate-600 rounded-lg shadow-2xl shadow-cyan-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-slate-200" onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center p-4 border-b border-slate-700 sticky top-0 bg-slate-800">
        <h2 className="text-xl font-bold font-orbitron text-cyan-400">{title}</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">&times;</button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const getModalContent = (modalType: ModalType): { title: string, content: React.ReactNode } => {
  switch (modalType) {
    case 'About': return { title: 'About Us', content: <p>Cosmic Time is a modern time zone converter designed for a globalized world. Our mission is to provide an accurate, easy-to-use, and visually stunning tool for professionals, travelers, and anyone coordinating across different time zones.</p> };
    case 'Contact': return { title: 'Contact Us', content: <div><p>For inquiries, please reach out to us:</p><ul className="list-disc list-inside mt-2"><li>Email: hsini.web@gmail.com</li><li>Website: doodax.com</li></ul></div> };
    case 'Guide': return { title: 'User Guide', content: <div><h3 className="font-bold text-lg mb-2">How to Use Cosmic Time:</h3><ol className="list-decimal list-inside space-y-2"><li><strong>Select Source:</strong> Choose your source city and set the date and time you want to convert.</li><li><strong>Choose Targets:</strong> Select one or more target cities from the list.</li><li><strong>Convert:</strong> Click the "Convert" button to see the results.</li><li><strong>Toggle Format:</strong> Use the 12h/24h switch to change the time display format for all results.</li></ol></div> };
    case 'Privacy Policy': return { title: 'Privacy Policy', content: <p>Your privacy is important to us. We do not store any personal data. The API key you enter is stored only in your browser for the duration of your session and is never sent to our servers. All time zone calculations are performed by interacting directly with the WorldTimeAPI service.</p> };
    case 'Terms of Service': return { title: 'Terms of Service', content: <p>By using Cosmic Time, you agree to use the service responsibly. The service is provided "as is" without any warranties. We are not liable for any inaccuracies or issues that may arise from the use of this tool or the third-party API it relies on.</p> };
    case 'DMCA': return { title: 'DMCA Policy', content: <p>We respect the intellectual property of others. If you believe that your copyrighted work has been infringed, please provide us with a detailed notice including the location of the infringing material and your contact information. Send all notices to hsini.web@gmail.com.</p> };
    default: return { title: '', content: null };
  }
};


const ThemeLayout: React.FC<ThemeLayoutProps> = ({ children, activeModal, setActiveModal }) => {
  const navLinks: ModalType[] = ['About', 'Contact', 'Guide', 'Privacy Policy', 'Terms of Service', 'DMCA'];
  const { title, content } = activeModal ? getModalContent(activeModal) : { title: '', content: null };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 animate-gradient-x"></div>
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4 bg-black bg-opacity-20 backdrop-blur-sm">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold font-orbitron tracking-wider text-cyan-300">
              COSMIC TIME
            </h1>
            <div className="hidden md:flex space-x-4">
              {navLinks.map(link => (
                <button key={link} onClick={() => setActiveModal(link)} className="hover:text-cyan-300 transition-colors">
                  {link}
                </button>
              ))}
            </div>
          </nav>
        </header>

        <main className="flex-grow container mx-auto p-4 md:p-8 flex justify-center items-center">
          {children}
        </main>

        <footer className="p-4 text-center bg-black bg-opacity-20 backdrop-blur-sm text-slate-400">
          <p>
            Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold" style={{color: '#FFD700'}}>HSINI MOHAMED</a>
          </p>
          <p className="text-sm mt-1">doodax.com | hsini.web@gmail.com</p>
        </footer>
      </div>

      {activeModal && (
        <Modal title={title} onClose={() => setActiveModal(null)}>
          {content}
        </Modal>
      )}
    </div>
  );
};

export default ThemeLayout;