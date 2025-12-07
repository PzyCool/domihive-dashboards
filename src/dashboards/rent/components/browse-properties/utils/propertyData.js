// Nigerian property images - These are actual Lagos property images
// Using Nigerian real estate websites as image sources
const NIGERIAN_PROPERTY_IMAGES = {
  // Lekki/Ikoyi properties (Island)
  luxury: [
    'https://www.propertypro.ng/blog/wp-content/uploads/2021/03/luxury-apartment-in-ikoyi.jpg',
    'https://www.propertypro.ng/blog/wp-content/uploads/2020/11/lekki-apartment-for-rent.jpg',
    'https://www.privateproperty.com.ng/blog/wp-content/uploads/2022/06/modern-apartment-lagos.jpg',
    'https://www.propertypro.ng/blog/wp-content/uploads/2021/05/contemporary-lagos-apartment.jpg',
  ],
  
  // Ikeja/Surulere properties (Mainland)
  standard: [
    'https://www.privateproperty.com.ng/blog/wp-content/uploads/2022/03/ikeja-apartment-interior.jpg',
    'https://www.propertypro.ng/blog/wp-content/uploads/2020/09/surulere-flat-for-rent.jpg',
    'https://www.propertypro.ng/blog/wp-content/uploads/2021/08/mainland-lagos-property.jpg',
    'https://www.privateproperty.com.ng/blog/wp-content/uploads/2021/11/affordable-lagos-apartment.jpg',
  ],
  
  // Estate properties
  estate: [
    'https://www.propertypro.ng/blog/wp-content/uploads/2022/01/gated-estate-lagos.jpg',
    'https://www.privateproperty.com.ng/blog/wp-content/uploads/2022/04/lagos-estate-property.jpg',
    'https://www.propertypro.ng/blog/wp-content/uploads/2020/12/lekki-gated-community.jpg',
  ],
  
  // Nigerian apartment interiors
  interior: [
    'https://www.propertypro.ng/blog/wp-content/uploads/2021/07/nigerian-living-room-design.jpg',
    'https://www.privateproperty.com.ng/blog/wp-content/uploads/2022/02/lagos-bedroom-interior.jpg',
    'https://www.propertypro.ng/blog/wp-content/uploads/2021/04/modern-nigerian-kitchen.jpg',
  ],
  
  // Fallback images (in case Nigerian sites block)
  fallback: [
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1545323157-f6f63c0d66a7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
  ]
};

// Lagos areas categorized by Island/Mainland
const LAGOS_AREAS = {
  island: {
    locations: [
      'Ikoyi', 'Lekki Phase 1', 'Victoria Island', 'Ajah', 'Sangotedo',
      'Chevron', 'Oniru', 'Banana Island', 'Lekki Phase 2', 
      'Victoria Garden City (VGC)', 'Lekki Scheme 2', 'Osapa London',
      'Jakande', 'Awoyaya', 'Abraham Adesanya', 'Lakowe', 'Ibeju Lekki',
      'Marina', 'Dolphin Estate', '1004 Estate'
    ],
    priceRange: { min: 3000000, max: 10000000 }, // per year
    propertyTypes: ['Luxury Apartment', 'Penthouse', 'Duplex', 'Terrace House']
  },
  
  mainland: {
    locations: [
      'Ikeja', 'Ikeja GRA', 'Yaba', 'Surulere', 'Ojota', 'Oshodi', 'Ilupeju',
      'Egbeda', 'Maryland', 'Ikorodu', 'Agege', 'Festac Town', 'Gbagada',
      'Mushin', 'Mende', 'Ogba', 'Alausa', 'Anthony', 'Palmgroove'
    ],
    priceRange: { min: 800000, max: 5000000 }, // per year
    propertyTypes: ['Flat', 'Self-Contain', 'Mini-Flat', 'Bungalow', 'Apartment']
  }
};

// Management type configurations
const MANAGEMENT_TYPES = {
  domihive_managed: {
    name: 'DomiHive Managed',
    description: 'Full property management by DomiHive. We act as your landlord with complete maintenance and support.',
    badgeColor: '#9f7539', // Gold
    features: [
      'Full maintenance included',
      '24/7 DomiHive support',
      'Direct complaint handling',
      'Annual payment to DomiHive',
      'Property managed end-to-end'
    ]
  },
  
  estate_managed: {
    name: 'Estate Managed',
    description: 'Property within a managed estate. Maintenance handled by estate management with optional DomiHive add-ons.',
    badgeColor: '#0e1f42', // Dark blue
    features: [
      'Estate maintenance team',
      'Gated community security',
      'Shared amenities',
      'One-time tenant placement fee',
      'Optional DomiHive add-ons'
    ]
  },
  
  landlord_managed: {
    name: 'Landlord Managed',
    description: 'Direct management by property owner. Landlord resides nearby for immediate support.',
    badgeColor: '#10b981', // Green
    features: [
      'Direct landlord communication',
      'On-site landlord support',
      'Flexible arrangements',
      'One-time placement fee',
      'Basic DomiHive features'
    ]
  }
};

// Generate mock Nigerian properties
const generateNigerianProperties = (count = 80) => {
  const properties = [];
  const managementTypes = Object.keys(MANAGEMENT_TYPES);
  
  for (let i = 1; i <= count; i++) {
    // Determine area type (60% Island, 40% Mainland for realistic distribution)
    const isIsland = Math.random() > 0.4;
    const areaType = isIsland ? 'island' : 'mainland';
    const areaData = LAGOS_AREAS[areaType];
    
    // Random management type
    const managementType = managementTypes[Math.floor(Math.random() * managementTypes.length)];
    const mgmtConfig = MANAGEMENT_TYPES[managementType];
    
    // Select random location
    const location = areaData.locations[Math.floor(Math.random() * areaData.locations.length)];
    
    // Generate realistic price based on area and management type
    let price;
    if (areaType === 'island') {
      price = mgmtConfig.name === 'DomiHive Managed' 
        ? 3500000 + Math.random() * 6500000
        : 3000000 + Math.random() * 5000000;
    } else {
      price = mgmtConfig.name === 'DomiHive Managed'
        ? 1200000 + Math.random() * 2800000
        : 800000 + Math.random() * 2200000;
    }
    
    // Bedrooms (1-5, weighted towards 2-3)
    let bedrooms;
    const rand = Math.random();
    if (rand < 0.3) bedrooms = 2;
    else if (rand < 0.6) bedrooms = 3;
    else if (rand < 0.8) bedrooms = 1;
    else if (rand < 0.95) bedrooms = 4;
    else bedrooms = 5;
    
    // Property type based on area
    const propertyType = areaData.propertyTypes[
      Math.floor(Math.random() * areaData.propertyTypes.length)
    ];
    
    // Select appropriate images
    const imageSet = areaType === 'island' ? 'luxury' : 'standard';
    const images = [
      NIGERIAN_PROPERTY_IMAGES[imageSet][Math.floor(Math.random() * NIGERIAN_PROPERTY_IMAGES[imageSet].length)],
      NIGERIAN_PROPERTY_IMAGES.interior[Math.floor(Math.random() * NIGERIAN_PROPERTY_IMAGES.interior.length)]
    ];
    
    // Generate property
    const property = {
      id: `property_${i.toString().padStart(3, '0')}`,
      title: `${bedrooms} Bedroom ${propertyType} in ${location}`,
      price: Math.round(price),
      priceDisplay: `₦${Math.round(price).toLocaleString()}/year`,
      location: `${location}, Lagos ${areaType === 'island' ? 'Island' : 'Mainland'}`,
      areaType: areaType,
      bedrooms: bedrooms,
      bathrooms: Math.max(1, bedrooms - (Math.random() > 0.7 ? 0 : 1)), // Usually bedrooms-1 or same
      size: `${Math.round(60 + (bedrooms * 30) + Math.random() * 50)} sqm`,
      propertyType: propertyType,
      managementType: managementType,
      managementName: mgmtConfig.name,
      managementColor: mgmtConfig.badgeColor,
      description: `Beautiful ${bedrooms}-bedroom ${propertyType.toLowerCase()} in prime ${location}. ${mgmtConfig.description}`,
      images: images,
      isVerified: Math.random() > 0.2, // 80% verified
      isFeatured: Math.random() > 0.8, // 20% featured
      isNew: i > 60, // Latest 20 properties are new
      amenities: generateAmenities(bedrooms, managementType),
      features: mgmtConfig.features,
      dateAdded: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000), // Within last 6 months
      // Management-specific data
      maintenanceIncluded: managementType === 'domihive_managed',
      estateAmenities: managementType === 'estate_managed' ? generateEstateAmenities() : [],
      landlordPresence: managementType === 'landlord_managed' && Math.random() > 0.5
    };
    
    properties.push(property);
  }
  
  return properties;
};

// Generate realistic amenities
const generateAmenities = (bedrooms, managementType) => {
  const baseAmenities = ['24/7 Security', 'Constant Water Supply', 'Parking Space'];
  
  if (bedrooms >= 3) {
    baseAmenities.push('Air Conditioning', 'Generator');
  }
  
  if (managementType === 'domihive_managed') {
    baseAmenities.push('DomiHive Maintenance', 'Online Rent Payment', 'Tenant Support Portal');
  } else if (managementType === 'estate_managed') {
    baseAmenities.push('Gated Estate', 'Estate Maintenance', 'Common Area');
  }
  
  // Add random additional amenities
  const additional = ['WiFi Ready', 'CCTV', 'Waste Disposal', 'Fire Safety'];
  if (Math.random() > 0.5) baseAmenities.push(additional[Math.floor(Math.random() * additional.length)]);
  
  return baseAmenities;
};

// Generate estate-specific amenities
const generateEstateAmenities = () => {
  const estateAmenities = ['Swimming Pool', 'Gym', 'Children Playground', 'Clubhouse'];
  return estateAmenities.slice(0, 1 + Math.floor(Math.random() * 2)); // 1-2 amenities
};

// Constants for filters
const FILTER_OPTIONS = {
  areaTypes: [
    { value: 'all', label: 'All Areas' },
    { value: 'island', label: 'Lagos Island' },
    { value: 'mainland', label: 'Lagos Mainland' }
  ],
  
  managementTypes: [
    { value: 'all', label: 'All Management Types' },
    { value: 'domihive_managed', label: 'DomiHive Managed' },
    { value: 'estate_managed', label: 'Estate Managed' },
    { value: 'landlord_managed', label: 'Landlord Managed' }
  ],
  
  bedrooms: [
    { value: 'all', label: 'Any Bedrooms' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4+ Bedrooms' }
  ],
  
  priceRanges: [
    { value: 'all', label: 'Any Price' },
    { value: '0-1000000', label: 'Under ₦1M/year' },
    { value: '1000000-3000000', label: '₦1M - ₦3M/year' },
    { value: '3000000-5000000', label: '₦3M - ₦5M/year' },
    { value: '5000000-10000000', label: '₦5M - ₦10M/year' },
    { value: '10000000+', label: 'Over ₦10M/year' }
  ]
};

// Export everything
export {
  generateNigerianProperties,
  FILTER_OPTIONS,
  LAGOS_AREAS,
  MANAGEMENT_TYPES,
  NIGERIAN_PROPERTY_IMAGES
};