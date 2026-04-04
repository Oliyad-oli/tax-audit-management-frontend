import PublicLayout from '../layouts/PublicLayout';
import { Link } from 'react-router-dom';

import SimpleNav from '../components/SimpleNav';

// Inside the component, add <SimpleNav /> right after the fragment opening:

function About() {
  const team = [
    {
      name: 'Oliad Dandena',
      role: 'Software Architect & Full-Stack Developer',
      image: '👨‍💻',
      bio: 'Lead engineer responsible for SRS design, frontend development, and seamless backend system integration. Expert in building scalable enterprise architectures.',
      expertise: ['SRS Design', 'React/TypeScript', 'System Integration', 'MERN Stack'],
      social: {
        linkedin: '#',
        github: 'https://github.com/Oliyad-oli',
        twitter: '#'
      }
    },
    {
      name: 'Borifan Dabasa',
      role: 'Backend Software Engineer',
      image: '👨‍💻',
      bio: 'Specializes in server-side logic and database management, ensuring high-performance data processing and security for audit compliance.',
      expertise: ['Node.js', 'API Design', 'Database Security', 'Tax Logic'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    {
      name: 'Paulos Diriba',
      role: 'Software Quality Assurance & Specialist',
      image: '👨‍🎓',
      bio: 'Expert in international software standards and system validation, focusing on cross-border tax regulations and technical compliance.',
      expertise: ['System Testing', 'International Standards', 'Technical Audit', 'QA'],
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    }
];
  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'Started with a vision to transform tax audit management' },
    { year: '2019', title: 'First Major Client', description: 'Onboarded Ministry of Revenue as our first enterprise client' },
    { year: '2020', title: 'Launch of AuditFlow v1.0', description: 'Released comprehensive audit management system' },
    { year: '2021', title: 'Expansion to 10+ Organizations', description: 'Grew to serve multiple government agencies' },
    { year: '2022', title: 'AI-Powered Features', description: 'Integrated machine learning for fraud detection' },
    { year: '2023', title: 'International Recognition', description: 'Recognized as top tax tech solution in East Africa' },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We strive for excellence in every line of code and every audit process we design.'
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'Building trust through transparent, reliable, and ethical solutions.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Constantly pushing boundaries to solve complex audit challenges.'
    },
    {
      icon: '🌍',
      title: 'Impact',
      description: 'Creating solutions that make a real difference in tax administration.'
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About AuditFlow</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're on a mission to revolutionize tax audit management through innovative technology 
            and deep domain expertise.
          </p>
        </div>
      </section>

      {/* Founder Section - Oliad Dandena */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Founder Image/Icon */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-12 text-center">
                <div className="text-9xl mb-4 animate-bounce">👨‍💻</div>
                <h3 className="text-3xl font-bold text-gray-800">Oliad Dandena</h3>
                <p className="text-xl text-blue-600">Software Engineer & Developer</p>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
            </div>

            {/* Founder Info */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet the Founder</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  <span className="font-bold text-blue-600">Oliad Dandena</span> is a passionate software engineer 
                  and full-stack developer with expertise in building enterprise-scale applications. 
                  With a vision to modernize tax administration in Ethiopia, Oliad founded AuditFlow 
                  to bridge the gap between traditional audit processes and modern technology.
                </p>
                <p>
                  Holding a degree in Software Engineering, Oliad has worked on numerous projects 
                  ranging from financial systems to government platforms. His expertise in React, 
                  Node.js, and database design has been instrumental in creating the robust 
                  AuditFlow platform.
                </p>
                <p>
                  "I believe that technology can transform how tax authorities operate, making 
                  audits more efficient, transparent, and effective. AuditFlow is the culmination 
                  of years of experience and a deep understanding of both technology and audit 
                  processes."
                </p>
              </div>

              {/* Skills */}
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-3">Technical Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'PostgreSQL', 'Express', 'Tailwind CSS', 'System Architecture'].map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gray-800 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition text-2xl">📱</a>
                <a href="#" className="w-12 h-12 bg-gray-800 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition text-2xl">💼</a>
                <a href="#" className="w-12 h-12 bg-gray-800 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition text-2xl">📧</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">From a vision to a transformative solution</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden md:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} items-center gap-8`}>
                  
                  {/* Year Bubble */}
                  <div className="md:w-1/2 flex justify-center">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg z-10">
                      {milestone.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:shadow-xl transition group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 transition">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Experts dedicated to your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group">
                
                {/* Image/Icon */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center">
                  <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center text-6xl group-hover:scale-110 transition">
                    {member.image}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  
                  {/* Expertise */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">EXPERTISE</p>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((exp, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social */}
                  <div className="flex space-x-3">
                    {Object.entries(member.social).map(([key, value]) => (
                      <a key={key} href={value} className="text-gray-400 hover:text-blue-600 transition">
                        {key === 'linkedin' && '📱'}
                        {key === 'github' && '💻'}
                        {key === 'twitter' && '🐦'}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export default About;