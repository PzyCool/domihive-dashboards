// src/dashboards/rent/components/property-details/hooks/usePropertyDetails.js
import { useState, useEffect } from 'react';
import { getMockPropertyData } from '../utils/propertyMockData';

export const usePropertyDetails = (propertyId) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        
        // In real app, you would fetch from API:
        // const response = await fetch(`/api/properties/${propertyId}`);
        // const data = await response.json();
        
        // For now, use mock data
        const mockData = getMockPropertyData(propertyId);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setProperty(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to load property details');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  return { property, loading, error };
};