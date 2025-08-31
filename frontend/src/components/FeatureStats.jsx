import React from "react";

const FeatureStats = () => {
  const stats = [
    {
      value: "100%",
      label: "Secure & Private",
    },
    {
      value: "10MB",
      label: "Max File Size",
    },
    {
      value: "AI",
      label: "Powered",
    },
    {
      value: "Fast",
      label: "Processing",
    },
  ];

  return (
    <div className="mt-16 text-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureStats;
