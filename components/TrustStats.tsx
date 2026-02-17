
import React from 'react';

const TrustStats: React.FC = () => {
  const stats = [
    { value: '142', label: 'Exclusive Listings', icon: 'home' },
    { value: '$4.2M', label: 'Avg. Market Value', icon: 'chart' },
    { value: '98%', label: 'Client Satisfaction', icon: 'star' },
    { value: '24h', label: 'Avg. Response Time', icon: 'clock' },
  ];

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'home':
        return <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>;
      case 'chart':
        return <><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></>;
      case 'star':
        return <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>;
      case 'clock':
        return <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>;
      default:
        return null;
    }
  };

  return (
    <section className="relative -mt-16 z-10 container mx-auto px-6">
      <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center group-hover:bg-[#0071E3] transition-colors">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#0071E3] group-hover:text-white transition-colors"
                >
                  {renderIcon(stat.icon)}
                </svg>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-[#6B7280] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
