import PublicLayout from '../layouts/PublicLayout';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'desk-audit',
      icon: '🔍',
      title: 'Desk Audit',
      tagline: 'Efficient remote audit processing',
      description: 'Our desk audit service provides comprehensive remote audit capabilities, allowing auditors to review taxpayer information, documents, and declarations without physical presence.',
      features: [
        'Automated document verification',
        'Real-time data matching with third-party sources',
        'AI-powered discrepancy detection',
        'Secure document upload portal',
        'Audit checklist management',
        'Digital findings documentation'
      ],
      benefits: [
        '50% faster audit completion',
        'Reduced travel costs',
        'Increased audit coverage',
        'Better document trail',
        'Enhanced compliance monitoring'
      ],
      process: [
        'Case assignment and notification',
        'Document collection and verification',
        'Automated data analysis',
        'Findings documentation',
        'Review and approval workflow',
        'Final report generation'
      ],
      color: 'blue'
    },
    {
      id: 'comprehensive-audit',
      icon: '📊',
      title: 'Comprehensive Audit',
      tagline: 'In-depth financial and operational review',
      description: 'Our comprehensive audit service provides a complete examination of taxpayer financial statements, operations, internal controls, and compliance with tax laws.',
      features: [
        'Full financial statement analysis',
        'Internal control evaluation',
        'Compliance testing',
        'Fraud risk assessment',
        'Industry benchmarking',
        'Management letter preparation'
      ],
      benefits: [
        'Complete assurance coverage',
        'Identification of systemic issues',
        'Strategic recommendations',
        'Enhanced stakeholder confidence',
        'Regulatory compliance'
      ],
      process: [
        'Planning and risk assessment',
        'Internal control testing',
        'Substantive procedures',
        'Evidence gathering',
        'Findings discussion',
        'Final report issuance'
      ],
      color: 'green'
    },
    {
      id: 'transfer-pricing',
      icon: '💱',
      title: 'Transfer Pricing',
      tagline: 'Expert analysis of cross-border transactions',
      description: 'Our transfer pricing service helps taxpayers comply with complex international tax regulations and ensures arm\'s length pricing for related party transactions.',
      features: [
        'Benchmarking studies',
        'Documentation preparation',
        'Risk assessment',
        'Advance pricing agreements',
        'Dispute resolution support',
        'Country-by-country reporting'
      ],
      benefits: [
        'Reduced audit risk',
        'Tax optimization',
        'Regulatory compliance',
        'Documentation ready',
        'Penalty protection'
      ],
      process: [
        'Functional analysis',
        'Comparable search',
        'Pricing analysis',
        'Documentation preparation',
        'Review and finalization',
        'Filing support'
      ],
      color: 'purple'
    },
    {
      id: 'joint-audit',
      icon: '🤝',
      title: 'Joint Audit',
      tagline: 'Seamless multi-agency coordination',
      description: 'Our joint audit service facilitates coordinated audits between multiple tax authorities or agencies, ensuring efficient resource utilization and consistent findings.',
      features: [
        'Multi-agency coordination',
        'Shared workspace',
        'Unified findings',
        'Resource optimization',
        'Consistent methodology',
        'Single taxpayer interface'
      ],
      benefits: [
        'Reduced taxpayer burden',
        'Efficient resource use',
        'Consistent outcomes',
        'Knowledge sharing',
        'Faster resolution'
      ],
      process: [
        'Joint planning',
        'Coordinated execution',
        'Shared evidence',
        'Consensus findings',
        'Unified report',
        'Joint recommendations'
      ],
      color: 'orange'
    },
    {
      id: 'fraud-investigation',
      icon: '🚨',
      title: 'Fraud Investigation',
      tagline: 'Advanced fraud detection and investigation',
      description: 'Our fraud investigation service uses advanced analytics and forensic techniques to identify, investigate, and document potential tax fraud cases.',
      features: [
        'AI-powered pattern detection',
        'Forensic data analysis',
        'Evidence collection',
        'Interview support',
        'Expert testimony',
        'Investigation reporting'
      ],
      benefits: [
        'Early fraud detection',
        'Comprehensive evidence',
        'Prosecution support',
        'Revenue protection',
        'Deterrent effect'
      ],
      process: [
        'Initial assessment',
        'Evidence gathering',
        'Analysis',
        'Interviews',
        'Findings documentation',
        'Referral for prosecution'
      ],
      color: 'red'
    },
    {
      id: 'risk-assessment',
      icon: '📈',
      title: 'Risk Assessment',
      tagline: 'Data-driven risk profiling',
      description: 'Our risk assessment service helps tax authorities prioritize audit cases based on comprehensive risk analysis and predictive modeling.',
      features: [
        'Risk scoring algorithms',
        'Predictive analytics',
        'Industry benchmarking',
        'Historical analysis',
        'Real-time monitoring',
        'Custom risk parameters'
      ],
      benefits: [
        'Optimized resource allocation',
        'Higher audit yield',
        'Better case selection',
        'Proactive compliance',
        'Data-driven decisions'
      ],
      process: [
        'Data collection',
        'Model development',
        'Risk scoring',
        'Validation',
        'Case prioritization',
        'Continuous improvement'
      ],
      color: 'yellow'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        gradient: 'from-blue-600 to-blue-700',
        light: 'bg-blue-100'
      },
      green: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200',
        gradient: 'from-green-600 to-green-700',
        light: 'bg-green-100'
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        gradient: 'from-purple-600 to-purple-700',
        light: 'bg-purple-100'
      },
      orange: {
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-200',
        gradient: 'from-orange-600 to-orange-700',
        light: 'bg-orange-100'
      },
      red: {
        bg: 'bg-red-50',
        text: 'text-red-600',
        border: 'border-red-200',
        gradient: 'from-red-600 to-red-700',
        light: 'bg-red-100'
      },
      yellow: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-600',
        border: 'border-yellow-200',
        gradient: 'from-yellow-600 to-yellow-700',
        light: 'bg-yellow-100'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive audit solutions tailored to meet the needs of modern tax authorities
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const colors = getColorClasses(service.color);
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedService(service)}
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white`}>
                    <div className="text-5xl mb-3">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-1">{service.title}</h3>
                    <p className="text-white text-opacity-90 text-sm">{service.tagline}</p>
                  </div>

                  {/* Preview */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    
                    {/* Key Features Preview */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 mb-2">KEY FEATURES</p>
                      <ul className="space-y-1">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start">
                            <span className={`${colors.text} mr-2`}>✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learn More Button */}
                    <button className={`mt-4 text-${service.color}-600 font-medium hover:text-${service.color}-800 flex items-center`}>
                      Learn more <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedService(null)}></div>
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Header */}
              <div className={`bg-gradient-to-r ${getColorClasses(selectedService.color).gradient} p-8 sticky top-0`}>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl"
                >
                  ✕
                </button>
                <div className="text-6xl mb-4">{selectedService.icon}</div>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedService.title}</h2>
                <p className="text-white text-opacity-90 text-lg">{selectedService.tagline}</p>
              </div>

              {/* Content */}
              <div className="p-8">
                
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Service Overview</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedService.description}</p>
                </div>

                {/* Features and Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  
                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-2">✓</span>
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`text-${selectedService.color}-600 mr-2 mt-1`}>✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-2">⭐</span>
                      Benefits
                    </h3>
                    <ul className="space-y-3">
                      {selectedService.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">⭐</span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Process Timeline */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Our Process</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedService.process.map((step, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl">
                        <div className={`w-8 h-8 ${getColorClasses(selectedService.color).light} rounded-full flex items-center justify-center text-${selectedService.color}-600 font-bold mb-2`}>
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Ready to get started?</h4>
                  <p className="text-gray-600 mb-4">Contact us today to learn more about our {selectedService.title.toLowerCase()} service.</p>
                  <div className="flex justify-center space-x-4">
                    <Link 
                      to="/contact" 
                      className={`px-6 py-3 bg-gradient-to-r ${getColorClasses(selectedService.color).gradient} text-white rounded-lg font-semibold hover:opacity-90 transition`}
                      onClick={() => setSelectedService(null)}
                    >
                      Request Consultation
                    </Link>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine technology and expertise to deliver exceptional audit solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '⚡', title: 'Fast & Efficient', desc: 'Automated workflows reduce audit time by up to 50%' },
              { icon: '🔒', title: 'Secure & Compliant', desc: 'Bank-level security and regulatory compliance' },
              { icon: '🤖', title: 'AI-Powered', desc: 'Advanced algorithms for fraud detection and risk assessment' },
              { icon: '📊', title: 'Data-Driven', desc: 'Analytics and insights for better decision making' }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export default Services;