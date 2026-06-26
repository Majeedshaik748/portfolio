import { Code, Palette, Zap, Globe } from 'lucide-react';

const skills = [
  {
    icon: <Code className="w-6 h-6" />,
    title: 'Frontend Development',
    description: 'React, TypeScript, Next.js, Tailwind CSS',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Backend Development',
    description: 'Node.js, Python, PostgreSQL, MongoDB',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'UI/UX Design',
    description: 'Figma, Adobe XD, User Research',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Web Performance',
    description: 'Optimization, SEO, Accessibility',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With over 5 years of experience in web development, I specialize in creating 
            modern, responsive, and user-friendly applications. I love turning complex 
            problems into simple, beautiful solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Building Digital Experiences
            </h3>
            <p className="text-gray-600 mb-4">
              I'm a full-stack developer based in San Francisco with a passion for 
              building digital products. I specialize in creating everything from 
              small business sites to rich interactive web applications.
            </p>
            <p className="text-gray-600 mb-6">
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open-source projects, or sharing my knowledge through 
              blog posts and tutorials.
            </p>
            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
              >
                Let's Talk
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-8">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <span className="text-8xl">👨‍💻</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4">
              <div className="text-3xl font-bold text-purple-600">5+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                {skill.icon}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{skill.title}</h4>
              <p className="text-sm text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
