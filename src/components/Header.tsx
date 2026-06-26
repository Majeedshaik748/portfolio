import { BarChart3, Brain, GraduationCap, Home } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Overview', icon: Home },
  { id: 'sales', label: 'Sales Analytics', icon: BarChart3 },
  { id: 'prediction', label: 'AI Prediction', icon: Brain },
  { id: 'student', label: 'Student Analysis', icon: GraduationCap },
];

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg font-bold text-lg">
              MS
            </div>
            <div>
              <h1 className="text-xl font-bold">Majeed Shaik</h1>
              <p className="text-xs text-purple-300">AI & Data Science Portfolio</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === item.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-purple-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="lg:hidden">
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id} className="text-gray-900">
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
