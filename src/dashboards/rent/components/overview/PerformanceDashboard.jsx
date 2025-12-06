// src/dashboards/rent/components/overview/PerformanceDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PerformanceDashboard = () => {
  const navigate = useNavigate();
  const [timePeriod, setTimePeriod] = useState('month');
  
  const [metrics, setMetrics] = useState({
    paymentPunctuality: 95,
    occupancyRate: 88,
    maintenanceScore: 92,
    ruleCompliance: 87,
    tenantSatisfaction: 4.7,
    rentCollection: 98,
    upcomingPayments: 2,
    pendingMaintenance: 3
  });

  const performanceCards = [
    {
      title: 'Payment Punctuality',
      value: `${metrics.paymentPunctuality}%`,
      description: 'On-time payments',
      icon: 'credit-card',
      color: 'from-blue-500 to-blue-600',
      status: metrics.paymentPunctuality >= 90 ? 'Excellent' : 'Good',
      trend: '+2.5%'
    },
    {
      title: 'Occupancy Rate',
      value: `${metrics.occupancyRate}%`,
      description: 'Properties occupied',
      icon: 'home',
      color: 'from-green-500 to-green-600',
      status: 'High',
      trend: '+3.2%'
    },
    {
      title: 'Tenant Rating',
      value: `${metrics.tenantSatisfaction}/5.0`,
      description: 'Satisfaction score',
      icon: 'star',
      color: 'from-amber-500 to-amber-600',
      status: 'Excellent',
      rating: metrics.tenantSatisfaction
    }
  ];

  const insights = [
    {
      title: 'Payment Performance',
      description: 'Your payment collection rate is excellent. Keep it up!',
      icon: 'trophy',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Occupancy Growth',
      description: 'Up 3% this month. Great job on property management!',
      icon: 'chart-line',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Attention Needed',
      description: 'Consider reviewing property rules with tenants.',
      icon: 'exclamation-triangle',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Performance Dashboard</h2>
          <p className="text-gray-600 text-sm">Live property performance metrics</p>
        </div>
        
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['week', 'month', 'quarter'].map(period => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`px-3 py-1 text-xs font-medium rounded-md capitalize ${
                  timePeriod === period 
                    ? 'bg-white text-[#0e1f42] shadow-sm' 
                    : 'text-gray-600 hover:text-[#0e1f42]'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {performanceCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <i className={`fas fa-${card.icon} text-white`}></i>
              </div>
              <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                {card.status}
              </span>
            </div>
            
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <div className="text-sm text-gray-600">{card.description}</div>
            </div>
            
            {card.rating ? (
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <i 
                    key={star}
                    className={`fas fa-star text-sm ${star <= Math.floor(card.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  ></i>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600 font-medium">{card.trend}</span>
                <span className="text-gray-500">this month</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Payment Chart */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Payment History</h3>
            <span className="text-sm text-gray-600">{metrics.rentCollection}% collected</span>
          </div>
          
          <div className="h-32 flex items-end gap-1">
            {[65, 75, 80, 85, 90, 95, 98].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-400 to-blue-500 rounded-t"
                  style={{ height: `${value}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Upcoming payments: <span className="font-semibold text-gray-800">{metrics.upcomingPayments}</span></span>
              <button 
                onClick={() => navigate('/dashboard/rent/payments')}
                className="text-[#0e1f42] hover:text-[#9f7539] font-medium flex items-center gap-1"
              >
                View all
                <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Maintenance Chart */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Maintenance Performance</h3>
            <span className="text-sm text-gray-600">Score: {metrics.maintenanceScore}%</span>
          </div>
          
          <div className="h-32 flex items-end gap-1">
            {[3, 2, 4, 1, 3, 2, 1].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-green-400 to-green-500 rounded-t"
                  style={{ height: `${value * 20}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Pending requests: <span className="font-semibold text-gray-800">{metrics.pendingMaintenance}</span></span>
              <button 
                onClick={() => navigate('/dashboard/rent/maintenance')}
                className="text-[#0e1f42] hover:text-[#9f7539] font-medium flex items-center gap-1"
              >
                Manage
                <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Insights */}
      <div className="bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f] rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-4">Performance Insights</h3>
        
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg ${insight.bgColor} flex items-center justify-center flex-shrink-0`}>
                <i className={`fas fa-${insight.icon} ${insight.color}`}></i>
              </div>
              <div>
                <div className="font-medium mb-1">{insight.title}</div>
                <div className="text-sm text-white/70">{insight.description}</div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => navigate('/dashboard/rent/analytics')}
          className="mt-6 w-full py-3 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <i className="fas fa-chart-bar"></i>
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
};

export default PerformanceDashboard;