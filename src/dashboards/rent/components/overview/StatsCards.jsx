// src/dashboards/rent/components/overview/StatsCards.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StatsCards = () => {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    activeProperties: 2,
    daysUntilPayment: 15,
    propertiesManaged: 1,
    occupancyRate: '85%',
    nextPaymentAmount: '₦100,000',
    tenantRating: '4.7'
  });

  const statsCards = [
    {
      id: 1,
      title: 'Active Properties',
      value: stats.activeProperties,
      description: 'Currently renting',
      icon: 'home',
      color: 'from-[#0e1f42] to-[#1a2d5f]',
      badge: stats.occupancyRate,
      badgeColor: 'bg-[#0e1f42]',
      onClick: () => navigate('/dashboard/rent/my-properties'),
      progress: 85,
      progressColor: 'bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f]'
    },
    {
      id: 2,
      title: 'Next Payment',
      value: `₦${stats.nextPaymentAmount}`,
      description: `Due in ${stats.daysUntilPayment} days`,
      icon: 'credit-card',
      color: 'from-[#9f7539] to-[#b58a4a]',
      badge: 'On Track',
      badgeColor: 'bg-green-500',
      onClick: () => navigate('/dashboard/rent/payments'),
      status: 'positive'
    },
    {
      id: 3,
      title: 'Properties Managed',
      value: `${stats.propertiesManaged}/${stats.activeProperties}`,
      description: 'By DomiHive',
      icon: 'user-tie',
      color: 'from-green-500 to-green-600',
      badge: `${stats.tenantRating}/5.0`,
      badgeColor: 'bg-green-500',
      onClick: () => navigate('/dashboard/rent/my-properties?managed=true'),
      rating: 4.7
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Property Statistics</h2>
        <button 
          onClick={() => navigate('/dashboard/rent/analytics')}
          className="text-sm text-[#0e1f42] hover:text-[#9f7539] font-medium flex items-center gap-1"
        >
          View Details
          <i className="fas fa-arrow-right text-xs"></i>
        </button>
      </div>
      
      <div className="space-y-4">
        {statsCards.map((card) => (
          <div 
            key={card.id}
            onClick={card.onClick}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 cursor-pointer transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                  <i className={`fas fa-${card.icon} text-white`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#0e1f42]">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              </div>
              
              <div className={`${card.badgeColor} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
                {card.badge}
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                {card.rating && (
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <i 
                        key={star}
                        className={`fas fa-star text-sm ${star <= Math.floor(card.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      ></i>
                    ))}
                  </div>
                )}
              </div>
              
              {card.progress && (
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Occupancy Rate</div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${card.progressColor}`}
                      style={{ width: card.progress }}
                    ></div>
                  </div>
                </div>
              )}
              
              {card.status === 'positive' && (
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <i className="fas fa-check-circle"></i>
                    <span>All payments on track</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;