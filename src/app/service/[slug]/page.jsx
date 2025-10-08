import Service from "@/app/components/services/service";
import data from "@/data/services.json";

export default async function ServicePage({ params }) {
  const { slug } = await params;
  return <Service slug={slug} />;
}

export async function generateStaticParams() {
  const allServices = [
    ...(data.services || []),
    ...(data.neon_sign_categories || []),
    ...(data.material_based_services || []),
    ...(data.digital_solutions || [])
  ];
  
  return allServices.map((service) => ({
    slug: service.id || service.category,
  }));
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    
    // Search in all service categories
    let service = null;
    
    // Check main services
    if (data.services) {
      service = data.services.find(s => s.id === slug);
    }
    
    // Check neon categories
    if (!service && data.neon_sign_categories) {
      service = data.neon_sign_categories.find(s => s.category === slug);
    }
    
    // Check material based services
    if (!service && data.material_based_services) {
      service = data.material_based_services.find(s => s.id === slug);
    }
    
    // Check digital solutions
    if (!service && data.digital_solutions) {
      service = data.digital_solutions.find(s => s.id === slug);
    }
    
    if (!service) {
      return {
        title: 'Service Not Found | V Sign Pvt Ltd',
      };
    }
    
    const serviceTitle = service.title || service.name || 'Service';
    
    return {
      title: `${serviceTitle} | V Sign Pvt Ltd`,
      description: service.description,
      openGraph: {
        title: serviceTitle,
        description: service.description,
        type: 'website',
        siteName: 'V Sign Pvt Ltd',
      },
      twitter: {
        card: 'summary_large_image',
        title: serviceTitle,
        description: service.description,
      },
    };
  } catch (error) {
    return {
      title: 'Service Details | V Sign Pvt Ltd',
      description: 'Professional signage solutions by V Sign Pvt Ltd',
    };
  }
}