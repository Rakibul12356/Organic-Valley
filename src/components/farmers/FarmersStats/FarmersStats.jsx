import { FARMER_STATS } from '@data/farmers';

const FarmersStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
      {FARMER_STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {stat.value}
          </div>
          <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default FarmersStats;
