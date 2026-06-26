const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with cart, payments, and admin dashboard.',
    image: '🛒',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#',
    github: '#',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates and team features.',
    image: '✅',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
    link: '#',
    github: '#',
  },
  {
    title: 'Weather Dashboard',
    description: 'Beautiful weather app with forecasts, maps, and location-based services.',
    image: '🌤️',
    tags: ['React', 'OpenWeather API', 'Mapbox', 'Tailwind'],
    link: '#',
    github: '#',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for managing multiple social media accounts.',
    image: '📊',
    tags: ['Vue.js', 'Firebase', 'Chart.js', 'OAuth'],
    link: '#',
    github: '#',
  },
  {
    title: 'Fitness Tracker',
    description: 'Personal fitness tracking app with workout plans and progress charts.',
    image: '💪',
    tags: ['React Native', 'GraphQL', 'PostgreSQL'],
    link: '#',
    github: '#',
  },
  {
    title: 'AI Chat Application',
    description: 'Intelligent chatbot with natural language processing capabilities.',
    image: '🤖',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    link: '#',
    github: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each one presented unique 
            challenges and opportunities to learn and grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="h-48 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    className="flex-1 text-center py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    className="flex-1 text-center py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
