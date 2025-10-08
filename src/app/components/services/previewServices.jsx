'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import rawData from "@/data/services.json";

const PreviewServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false); // Set to false since we have build-time data

  useEffect(() => {
    // Use the imported build-time data directly
    const processServices = () => {
      try {
        // Combine all services and take first 3 for preview
        const allServices = [
          ...(rawData.services || []),
          ...(rawData.neon_sign_categories || []),
          ...(rawData.material_based_services || []),
          ...(rawData.digital_solutions || [])
        ];
        
        // Show only first 3 services for preview
        setServices(allServices.slice(0, 3));
      } catch (error) {
        console.error('Error processing services:', error);
      }
    };

    processServices();
  }, []);

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

  // Helper function to get service category for display
  const getServiceCategory = (service) => {
    if (service.category) return 'Neon Signs';
    if (service.id?.includes('digital')) return 'Digital Solutions';
    if (service.id?.includes('acrylic') || service.id?.includes('led') || service.id?.includes('acp')) 
      return 'Material Based';
    return 'General Services';
  };

  // Remove loading state since we have build-time data
  if (services.length === 0) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Premium Services
            </h2>
            <p className="text-gray-500 mb-8">
              No services available at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-8xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of signage solutions tailored for your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {services.map((service, index) => (
            <article
              key={service.id || service.category}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={getServiceUrl(service)}>
                <div className="relative overflow-hidden">
                  {/* Service Image Placeholder with Gradient */}
                  <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-500">
                    <div className="text-white text-center">
                      <svg className="w-12 h-12 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <h3 className="text-lg font-semibold group-hover:scale-105 transition-transform duration-300">
                        {getServiceCategory(service)}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
                      {getServiceCategory(service)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Service Tagline */}
                  {service.tagline && (
                    <p className="text-blue-600 font-medium mb-2 text-sm line-clamp-1">
                      {service.tagline}
                    </p>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {getServiceTitle(service)}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  
                  {/* Features Preview */}
                  {service.features && service.features.points && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.features.points.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="line-clamp-1">{feature.feature}</span>
                          </li>
                        ))}
                        {service.features.points.length > 2 && (
                          <li className="text-blue-600 text-sm">
                            +{service.features.points.length - 2} more features
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Offerings Preview */}
                  {service.offerings && service.offerings.products && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Includes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {service.offerings.products.slice(0, 3).map((product, idx) => (
                          <span key={idx} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md line-clamp-1">
                            {product}
                          </span>
                        ))}
                        {service.offerings.products.length > 3 && (
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                            +{service.offerings.products.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-900">
                      V Sign Pvt Ltd
                    </span>
                    <div className="flex items-center text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-sm font-medium">View Details</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Services
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

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
          opacity: 0;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
    </section>
  );
};

export default PreviewServices;