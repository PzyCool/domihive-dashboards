// Filter constants
export const VIEW_TYPES = {
  GRID: 'grid',
  LIST: 'list'
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'featured', label: 'Featured First' },
  { value: 'verified', label: 'Verified First' }
];

export const ITEMS_PER_PAGE = 6;

// Property statuses
export const PROPERTY_STATUS = {
  AVAILABLE: 'available',
  PENDING: 'pending',
  RENTED: 'rented'
};

// Nigerian currency formatting
export const formatNaira = (amount) => {
  return `₦${amount.toLocaleString('en-NG')}`;
};

// Management type colors
export const MANAGEMENT_TYPE_COLORS = {
  domihive_managed: '#9f7539',
  estate_managed: '#0e1f42',
  landlord_managed: '#10b981'
};

// Management type labels
export const MANAGEMENT_TYPE_LABELS = {
  domihive_managed: 'DomiHive Managed',
  estate_managed: 'Estate Managed',
  landlord_managed: 'Landlord Managed'
};