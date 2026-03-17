import PublicLayout from '../layouts/PublicLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

function Home() {
  const [stats] = useState([
    { value: '500+', label: 'Audits Completed', icon: '✅' },
    { value: '98%', label: 'Client Satisfaction', icon: '⭐' },
    { value: '50+', label: 'Expert Auditors', icon: '👥' },
    { value: '10+', label: 'Years Experience', icon: '📅' },
  ]);

  const features = [
    {
      icon: '🔍',
      title: 'Desk Audit',
      description: 'Efficient remote audit processing with advanced analytics and document verification.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: '📊',
      title: 'Comprehensive Audit',
      description: 'In-depth analysis of financial statements, operations, and compliance.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: '💱',
      title: 'Transfer Pricing',
      description: 'Expert analysis of cross-border transactions and related party dealings.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: '🤝',
      title: 'Joint Audit',
      description: 'Seamless coordination between multiple auditing agencies.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: '⚠️',
      title: 'Fraud Detection',
      description: 'Advanced algorithms to identify suspicious patterns and potential fraud.',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: '📈',
      title: 'Risk Assessment',
      description: 'Comprehensive risk profiling and priority-based case selection.',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  const partners = [
    { name: 'Ministry of Revenue', logo: '🏛️' },
    { name: 'Ethiopian Customs', logo: '🛃' },
    { name: 'Commercial Bank', logo: '🏦' },
    { name: 'Ernst & Young', logo: '📊' },
    { name: 'Deloitte', logo: '📋' },
    { name: 'PwC', logo: '📈' }
  ];

  const achievements = [
    { number: '98%', label: 'Client Retention', icon: '⭐' },
    { number: '24/7', label: 'Support Available', icon: '🕒' },
    { number: '100+', label: 'Team Members', icon: '👥' },
    { number: '15+', label: 'Awards Won', icon: '🏆' }
  ];

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center space-x-3 mb-6"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-2xl">
                  <span className="text-white text-2xl font-bold">O</span>
                </div>
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  ODFlow
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                Transform Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  Audit Process
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-300 mb-8 leading-relaxed"
              >
                Enterprise-grade audit management system trusted by leading organizations across Ethiopia.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link 
                  to="/services" 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition shadow-2xl inline-block"
                >
                  Explore Services →
                </Link>
                <Link 
                  to="/contact" 
                  className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 rounded-xl font-semibold hover:bg-opacity-20 transition inline-block"
                >
                  Contact Us
                </Link>
              </motion.div>

              {/* Trust Badge */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex items-center space-x-4"
              >
                <span className="text-sm text-gray-400">Trusted by leading organizations</span>
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gray-700 rounded-full border-2 border-gray-800 flex items-center justify-center text-xs">
                      {i}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur rounded-3xl p-8 border border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded-xl p-4">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="text-sm text-gray-300">Active Cases</div>
                    <div className="text-2xl font-bold">248</div>
                  </div>
                  <div className="bg-gray-700 rounded-xl p-4">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-sm text-gray-300">Completed</div>
                    <div className="text-2xl font-bold">1,247</div>
                  </div>
                  <div className="bg-gray-700 rounded-xl p-4">
                    <div className="text-3xl mb-2">💰</div>
                    <div className="text-sm text-gray-300">Recovered</div>
                    <div className="text-2xl font-bold">Br 4.2M</div>
                  </div>
                  <div className="bg-gray-700 rounded-xl p-4">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-sm text-gray-300">Satisfaction</div>
                    <div className="text-2xl font-bold">98%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={statVariants}
                className="text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-3xl font-bold text-gray-900">{item.number}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Right-to-Left Flow */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}
          <motion.div
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Audit Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage tax audits efficiently in one integrated platform
            </p>
          </motion.div>

          {/* Right-to-Left Flowing Cards */}
          <div className="relative py-8">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -2400]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear"
                }
              }}
            >
              {/* Triple the features for smoother loop */}
              {[...features, ...features, ...features].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[320px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all"
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  <div className={`p-6 ${feature.bgColor}`}>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg mx-auto">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm text-center px-2">
                      {feature.description}
                    </p>
                    <div className="text-center">
                      <Link 
                        to="/services" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
                      >
                        Learn more 
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8">Trusted by industry leaders</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition"
              >
                <span className="text-4xl mb-2">{partner.logo}</span>
                <span className="text-sm text-gray-600 text-center">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose ODFlow?</h2>
              <div className="space-y-4">
                {[
                  { title: 'Enterprise-Grade Security', desc: 'Bank-level encryption and security protocols' },
                  { title: 'Expert Support Team', desc: '24/7 support from audit and tech professionals' },
                  { title: 'Customizable Solutions', desc: 'Tailored to meet your specific requirements' },
                  { title: 'Proven Track Record', desc: 'Trusted by government and private sector' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-blue-100 mb-6">
                Join hundreds of organizations that trust ODFlow for their audit management needs.
              </p>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Experience ODFlow Today</h2>
          <p className="text-xl text-blue-100 mb-8">
            Schedule a demo to see how we can transform your audit process
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition shadow-xl"
          >
            Request Demo
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

export default Home;