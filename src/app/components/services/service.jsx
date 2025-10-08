'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import rawData from "@/data/services.json";

const Service = ({ slug }) => {
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(false); // Set to false since we have build-time data
  const [activeFaq, setActiveFaq] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const processServiceData = () => {
      try {
        // Search in all service categories using imported data
        let foundService = null;
        
        // Check main services
        if (rawData.services) {
          foundService = rawData.services.find(service => service.id === slug);
        }
        
        // Check neon categories
        if (!foundService && rawData.neon_sign_categories) {
          foundService = rawData.neon_sign_categories.find(service => service.category === slug);
        }
        
        // Check material based services
        if (!foundService && rawData.material_based_services) {
          foundService = rawData.material_based_services.find(service => service.id === slug);
        }
        
        // Check digital solutions
        if (!foundService && rawData.digital_solutions) {
          foundService = rawData.digital_solutions.find(service => service.id === slug);
        }

        if (!foundService) {
          router.push('/services');
          return;
        }

        setService(foundService);
        
        // Combine all services for navigation
        const allServicesCombined = [
          ...(rawData.services || []),
          ...(rawData.neon_sign_categories || []),
          ...(rawData.material_based_services || []),
          ...(rawData.digital_solutions || [])
        ];
        setAllServices(allServicesCombined);
      } catch (error) {
        console.error('Error processing service:', error);
      }
    };

    processServiceData();
  }, [slug, router]);

  // Get next and previous services for navigation
  const getAdjacentServices = () => {
    if (!service || allServices.length === 0) return { prev: null, next: null };

    const currentIndex = allServices.findIndex(s => {
      if (s.id) return s.id === service.id;
      if (s.category) return s.category === service.category;
      return false;
    });
    
    const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : null;
    const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : null;

    return { prev: prevService, next: nextService };
  };

  const { prev, next } = getAdjacentServices();
  
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Helper function to get service URL
  const getServiceUrl = (service) => {
    if (service.id) return `/service/${service.id}`;
    if (service.category) return `/service/${service.category}`;
    return '/services';
  };

  // Helper function to get service title
  const getServiceTitle = (service) => {
    return service.title || service.name || 'Service';
  };

  // Remove loading state since we have build-time data
  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Back to All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      {/* Navigation Buttons */}
      <div className="max-w-6xl mx-auto px-4 mb-8 flex justify-between gap-4">
        <Link
          href="/services"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Services
        </Link>

        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      <article className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="mb-12 text-center animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            {service.tagline || 'Premium Signage Solutions'}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {service.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {service.description}
          </p>
        </header>

        {/* What Is Section */}
        {service.what_is && (
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What is {service.title}?</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{service.what_is}</p>
            </div>
          </div>
        )}

        {/* Features Section */}
        {service.features && (
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {service.features.title || 'Why Choose Our Service?'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.points.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.feature}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offerings/Products Section */}
        {service.offerings && (
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {service.offerings.title || 'Our Offerings'}
              </h2>
              {service.offerings.description && (
                <p className="text-gray-600 mb-6">{service.offerings.description}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.offerings.products.map((product, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{product}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Industries/Applications Section */}
        {service.industries && (
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {service.industries.title || 'Industries We Serve'}
              </h2>
              {service.industries.description && (
                <p className="text-gray-600 mb-6">{service.industries.description}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.industries.clients.map((industry, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Benefits Section */}
        {service.benefits && (
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.points && service.benefits.points.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
                {Array.isArray(service.benefits) && service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Why Choose Us Section */}
        {service.why_choose_us && (
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose V Sign Pvt Ltd?</h2>
              {typeof service.why_choose_us === 'string' ? (
                <p className="text-gray-700 leading-relaxed text-lg">{service.why_choose_us}</p>
              ) : (
                <div className="space-y-4">
                  {service.why_choose_us.map((point, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">{point}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQs Section */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <span className={`transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation between services */}
        <div className="mt-16 pt-8 border-t border-gray-200 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {prev ? (
              <Link
                href={getServiceUrl(prev)}
                className="group flex-1 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Previous Service</p>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {getServiceTitle(prev)}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1"></div>
            )}

            {next ? (
              <Link
                href={getServiceUrl(next)}
                className="group flex-1 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-right"
              >
                <div className="flex items-center justify-end">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Next Service</p>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {getServiceTitle(next)}
                    </p>
                  </div>
                  <svg className="w-5 h-5 ml-3 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" />
                  </svg>
                </div>
              </Link>
            ) : (
              <div className="flex-1"></div>
            )}
          </div>
        </div>

        {/* Related Services Section */}
        {allServices.length > 1 && (
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Explore Other Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices
                .filter(s => {
                  if (s.id) return s.id !== service.id;
                  if (s.category) return s.category !== service.category;
                  return true;
                })
                .slice(0, 3)
                .map((relatedService) => (
                  <Link
                    key={relatedService.id || relatedService.category}
                    href={getServiceUrl(relatedService)}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {getServiceTitle(relatedService)}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {relatedService.description || relatedService.tagline}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </article>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Service;