import { BarChart3, Brain, GraduationCap, ArrowRight, TrendingUp, Database, Sparkles, User } from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const projects = [
  {
    id: 'sales',
    title: 'Smart Sales Analytics Engine',
    description: 'Python-based analytics pipeline processing 10,000+ transactional records for business trend analysis. Automated preprocessing and visualization workflows reducing manual analysis effort by approximately 30%.',
    icon: BarChart3,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    highlights: [
      '10,000+ records processed',
      '30% effort reduction',
      'Revenue pattern identification',
      'Actionable business insights',
    ],
    bullets: [
      'Engineered a Python-based analytics pipeline processing 10,000+ transactional records for business trend analysis',
      'Automated preprocessing and visualization workflows reducing manual analysis effort by approximately 30%',
      'Built analytical reporting modules to identify revenue patterns and customer trends',
      'Applied exploratory data analysis techniques to generate actionable business insights',
    ],
  },
  {
    id: 'prediction',
    title: 'AI-Based Prediction System',
    description: 'Developed and optimized a supervised machine learning model achieving approximately 82% prediction accuracy. Implemented feature engineering, preprocessing, model training, and evaluation pipelines.',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    highlights: [
      '82% prediction accuracy',
      'Multiple ML algorithms',
      'Feature engineering pipeline',
      'Model optimization',
    ],
    bullets: [
      'Developed and optimized a supervised machine learning model achieving approximately 82% prediction accuracy',
      'Implemented feature engineering, preprocessing, model training, and evaluation pipelines',
      'Compared multiple ML algorithms to improve predictive performance and reliability',
      'Strengthened practical expertise in predictive analytics and ML workflow optimization',
    ],
  },
  {
    id: 'student',
    title: 'Student Performance Analysis Platform',
    description: 'Analyzed academic datasets to identify factors affecting student performance outcomes. Generated statistical insights and performance improvement strategies with visual dashboards.',
    icon: GraduationCap,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-200',
    highlights: [
      'Academic data analysis',
      'Statistical insights',
      'Visual dashboards',
      'Performance strategies',
    ],
    bullets: [
      'Analyzed academic datasets to identify factors affecting student performance outcomes',
      'Generated statistical insights and performance improvement strategies',
      'Built visual dashboards and trend analysis reports using visualization techniques',
      'Applied data cleaning and transformation methods to improve analysis reliability',
    ],
  },
];

export default function HomePage({ setCurrentPage }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">AI & Data Science Portfolio</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl font-bold shadow-2xl border-4 border-white/20">
              MS
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Majeed Shaik
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-200 mb-6">
            AI & Data Science Professional
          </h2>

          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-10">
            Three complete, interactive analytics projects — Smart Sales Analytics Engine, 
            AI-Based Prediction System, and Student Performance Analysis Platform. 
            Built with Python-style data pipelines, machine learning, and rich visualizations.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setCurrentPage('sales')}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:-translate-y-1"
            >
              Explore Projects
            </button>
            <a
              href="https://github.com/Majeedshaik748"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              View GitHub
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-300" />
              <span>10K+ records analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-300" />
              <span>82% ML prediction accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-300" />
              <span>30% efficiency improvement</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 border border-purple-100 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 flex justify-center">
                <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl font-bold text-white shadow-2xl">
                  MS
                </div>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">About Majeed Shaik</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  AI & Data Science professional with expertise in building analytics pipelines, 
                  machine learning models, and data visualization dashboards. Passionate about 
                  transforming raw data into actionable insights and intelligent predictions.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['Python Analytics', 'Machine Learning', 'Data Visualization', 'Predictive Modeling', 'Statistical Analysis', 'EDA & Reporting'].map((skill, i) => (
                    <div key={i} className="bg-white rounded-xl px-4 py-2 text-sm font-medium text-purple-700 border border-purple-100 text-center">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Cards */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click any project to explore the interactive dashboard with live data visualizations, 
            dynamic filters, and real-time analytics.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border ${project.borderColor} hover:-translate-y-2 cursor-pointer`}
                onClick={() => setCurrentPage(project.id)}
              >
                <div className={`bg-gradient-to-br ${project.bgColor} p-8`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-gray-500 mb-2">Project {idx + 1}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{project.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-700 font-medium">
                        {h}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-6">
                    {project.bullets.slice(0, 2).map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-3 bg-gradient-to-r ${project.color} text-white rounded-xl font-semibold flex items-center justify-center gap-2 group-hover:shadow-lg transition-all`}>
                    Open Dashboard
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Portfolio at a Glance</h2>
            <p className="text-purple-200">Key metrics from all three analytics projects</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Records Analyzed' },
              { value: '82%', label: 'ML Prediction Accuracy' },
              { value: '30%', label: 'Efficiency Improvement' },
              { value: '3', label: 'Complete Projects' },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">
                  {s.value}
                </div>
                <div className="text-purple-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
