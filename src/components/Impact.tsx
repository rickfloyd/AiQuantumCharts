import React from 'react';
import { useEducationalImpact } from '../hooks/useEducationalImpact';

const Impact: React.FC = () => {
  const { getTotalStats } = useEducationalImpact();
  const liveStats = getTotalStats();

  const impactMetrics = [
    {
      label: "Students Helped",
      value: liveStats.studentsHelped.toLocaleString(),
      description: "Number of students in our free and sponsored programs."
    },
    {
      label: "Scholarships Awarded",
      value: liveStats.scholarshipsAwarded.toLocaleString(),
      description: "Full scholarships provided to students."
    },
    {
      label: "Free Tools Released",
      value: liveStats.freeToolsReleased,
      description: "Open-source trading tools and educational resources."
    }
  ];

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6 text-purple-400">Live Impact Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {impactMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">{metric.value}</div>
            <h3 className="text-xl font-semibold mb-2">{metric.label}</h3>
            <p className="text-gray-400">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Impact;
