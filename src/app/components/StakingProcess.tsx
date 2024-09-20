import React from 'react';

const StakingStep = ({ imageUrl, title, description, number }) => (
  <div className="flex flex-col items-center text-center p-4 w-full md:w-1/2 mx-auto">
    <div className="relative mb-4">
      <div className="bg-white rounded-full p-6 w-32 h-32 flex items-center justify-center">
        <img src={imageUrl} alt={title} className="w-16 h-16" />
      </div>
      <div className="absolute -top-4 -left-4 bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-2xl">
        {number}
      </div>
    </div>
    <h3 className="font-semibold mb-2 text-3xl">{title}</h3>
    <p className="text-lg text-gray-200">{description}</p>
  </div>
);

const StakingProcess = () => {
  const steps = [
    { imageUrl: "/briefcase.png", title: "Prepare Funds", description: "Convert assets required for staking" },
    { imageUrl: "/profits.png", title: "Stake Assets", description: "Invest assets into staking pools" },
    { imageUrl: "/growth.png", title: "Earn Yield", description: "Earn returns from increased value" },
    { imageUrl: "/salary.png", title: "Collect Proceeds", description: "Withdraw accumulated yield" },
  ];

  return (
    <div className="bg-blue-500 text-white p-8 rounded-lg max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Staking Process</h2>
      <p className="text-center mb-8 text-lg">Earn rewards by participating in our straightforward and rewarding staking process.</p>
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch">
        {steps.map((step, index) => (
          <StakingStep key={index} {...step} number={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default StakingProcess;