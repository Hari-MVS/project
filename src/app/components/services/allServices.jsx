"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import rawData from "@/data/services.json"; // Changed from services.json to faqs.json

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false); // Set to false since we have build-time data
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const servicesPerPage = 6;

  useEffect(() => {
    // Use the imported build-time data directly
    const processServices = () => {
      try {
        // Combine all services from different categories WITH source info
        const allServices = [
          ...(rawData.services || []).map(service => ({ ...service, _source: 'services' })),
          ...(rawData.neon_sign_categories || []).map(service => ({ ...service, _source: 'neon' })),
          ...(rawData.material_based_services || []).map(service => ({ ...service, _source: 'material' })),
          ...(rawData.digital_solutions || []).map(service => ({ ...service, _source: 'digital' }))
        ];

        setServices(allServices);
        setFilteredServices(allServices);
      } catch (error) {
        console.error('Error processing services:', error);
      }
    };

    processServices();
  }, []);

  // Filter services based on search term and category
  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.tagline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(service => {
        const serviceCategory = getServiceCategory(service);
        return serviceCategory === selectedCategory;
      });
    }

    setFilteredServices(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, services]);

  // Get categories for filter
  const categories = [
    'All',
    'Neon Signs',
    'Digital Solutions',
    'Material Based',
    'General Services'
  ];

  // Get current services for pagination
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

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
    if (service._source === 'neon') return 'Neon Signs';
    if (service._source === 'digital') return 'Digital Solutions';
    if (service._source === 'material') return 'Material Based';
    if (service._source === 'services') return 'General Services';

    // Fallback for services without _source
    if (service.category) return 'Neon Signs';
    if (service.id?.includes('digital')) return 'Digital Solutions';
    if (service.id?.includes('acrylic') || service.id?.includes('led') || service.id?.includes('acp'))
      return 'Material Based';
    return 'General Services';
  };

  // Remove loading state since we have build-time data
  if (services.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 mb-8">
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

        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <div className="text-gray-500 text-lg mb-4">
            No services available at the moment.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 mb-8 flex justify-between gap-4">
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
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600">Explore our complete range of signage solutions</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-gray-600">
            Showing {filteredServices.length} Service{filteredServices.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Services Grid */}
        {currentServices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentServices.map((service, index) => (
                <article
                  key={service.id || service.category}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link href={getServiceUrl(service)} className="block">
                    <div className="relative overflow-hidden">
                      {/* Service Image - You might want to add images to your JSON */}
                      <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <div className="text-white text-center">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <h3 className="text-lg font-semibold">{getServiceCategory(service)}</h3>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
                          {getServiceCategory(service)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {getServiceTitle(service)}
                      </h3>

                      {service.tagline && (
                        <p className="text-blue-600 font-medium mb-3 line-clamp-1">
                          {service.tagline}
                        </p>
                      )}

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
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature.feature}
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

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm font-medium text-gray-900">
                          V Sign Pvt Ltd
                        </span>
                        <div className="flex items-center text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                          <span className="text-sm font-medium">View Details</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
                {/* Page Info */}
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages} • {filteredServices.length} services
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-300 text-sm font-medium"
                  >
                    ← Previous
                  </button>

                  {/* Mobile: Show only current page */}
                  <div className="sm:hidden px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                    {currentPage}
                  </div>

                  {/* Desktop: Show page numbers */}
                  <div className="hidden sm:flex items-center space-x-1">
                    {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-3 py-2 rounded-lg transition-all duration-300 ${currentPage === pageNumber
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'border border-gray-300 hover:bg-gray-50'
                            } text-sm min-w-[40px]`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-300 text-sm font-medium"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="text-gray-500 text-lg mb-4">
              No services found matching your criteria.
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
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
    </div>
  );
};

export default AllServices;