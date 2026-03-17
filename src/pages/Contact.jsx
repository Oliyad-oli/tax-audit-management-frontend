import PublicLayout from '../layouts/PublicLayout';
import { useState } from 'react';

// ✅ This should be Contact, NOT Home
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Have questions about our services? We're here to help!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl">
                    📍
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Address</h3>
                    <p className="text-gray-600 mt-1">
                      Bole Road, Addis Ababa<br />
                      Ethiopia, 1000
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl">
                    📞
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone Number</h3>
                    <p className="text-gray-600 mt-1">
                      +251 911 234 567<br />
                      +251 911 765 432
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl">
                    📧
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Address</h3>
                    <p className="text-gray-600 mt-1">
                      info@auditflow.com<br />
                      support@auditflow.com
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl">
                    🕒
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Working Hours</h3>
                    <p className="text-gray-600 mt-1">
                      Monday - Friday: 8:00 - 17:00<br />
                      Saturday: 9:00 - 13:00<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600">
                      Your message has been sent. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Name and Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      {/* Phone and Company */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+251 911 234 567"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your Company Name"
                          />
                        </div>
                      </div>

                      {/* Service Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Interested In
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select a service</option>
                          <option value="desk-audit">Desk Audit</option>
                          <option value="comprehensive-audit">Comprehensive Audit</option>
                          <option value="transfer-pricing">Transfer Pricing</option>
                          <option value="joint-audit">Joint Audit</option>
                          <option value="fraud-investigation">Fraud Investigation</option>
                          <option value="risk-assessment">Risk Assessment</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="6"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Tell us about your requirements..."
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
                      >
                        Send Message
                      </button>

                      <p className="text-xs text-gray-500 text-center mt-4">
                        * Required fields. We'll respond within 24 hours.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How quickly can you respond to inquiries?',
                a: 'We typically respond to all inquiries within 24 hours during business days.'
              },
              {
                q: 'Do you offer customized solutions?',
                a: 'Yes, we tailor our services to meet the specific needs of each client.'
              },
              {
                q: 'What is your pricing model?',
                a: 'We offer flexible pricing options based on the scope and scale of your project.'
              },
              {
                q: 'Do you provide training?',
                a: 'Yes, we provide comprehensive training for all our solutions.'
              },
              {
                q: 'Is my data secure?',
                a: 'We use enterprise-grade security measures to protect all client data.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export default Contact;