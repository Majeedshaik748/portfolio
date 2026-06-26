import { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import SalesAnalytics from './components/SalesAnalytics';
import AIPrediction from './components/AIPrediction';
import StudentAnalysis from './components/StudentAnalysis';
import { ArrowUp, Mail } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'sales':
        return <SalesAnalytics />;
      case 'prediction':
        return <AIPrediction />;
      case 'student':
        return <StudentAnalysis />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-lg">
                  MS
                </div>
                <div>
                  <h3 className="text-xl font-bold">Majeed Shaik</h3>
                  <p className="text-xs text-purple-300">AI & Data Science</p>
                </div>
              </div>
              <p className="text-purple-200 text-sm leading-relaxed">
                Three complete data science and machine learning projects showcasing 
                analytics pipelines, predictive modeling, and educational data analysis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Projects</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => { setCurrentPage('sales'); scrollToTop(); }} className="text-purple-200 hover:text-white transition-colors">
                    Smart Sales Analytics Engine
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentPage('prediction'); scrollToTop(); }} className="text-purple-200 hover:text-white transition-colors">
                    AI-Based Prediction System
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentPage('student'); scrollToTop(); }} className="text-purple-200 hover:text-white transition-colors">
                    Student Performance Analysis Platform
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <div className="space-y-3 text-sm">
                <a
                  href="https://github.com/Majeedshaik748"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-purple-200 hover:text-white transition-colors"
                >
                  <span className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center font-bold transition-colors">
                    GH
                  </span>
                  github.com/Majeedshaik748
                </a>
                <a
                  href="mailto:majeed.shaik@example.com"
                  className="flex items-center gap-3 text-purple-200 hover:text-white transition-colors"
                >
                  <span className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                    <Mail className="w-5 h-5" />
                  </span>
                  Contact via Email
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-sm text-purple-300">
            <p>© {new Date().getFullYear()} Majeed Shaik — AI & Data Science Portfolio. All rights reserved.</p>
            <p className="mt-1 text-xs">Built with React, TypeScript, Tailwind CSS, and Recharts</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
