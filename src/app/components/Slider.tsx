import React, { useState, useEffect } from 'react';
import { Coins, Users, Wallet, Trophy } from 'lucide-react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import ApproveButton from "./Approvebutton"; // Adjust this import path as needed

const APY_LEVELS = [
  { threshold: 10, rate: 0.0006 },
  { threshold: 500, rate: 0.018 },
  { threshold: 3000, rate: 0.022 },
  { threshold: 15000, rate: 0.026 },
  { threshold: 30000, rate: 0.03 },
  { threshold: 50000, rate: 0.034 },
  { threshold: 100000, rate: 0.039 },
  { threshold: 200000, rate: 0.044 },
  { threshold: 500000, rate: 0.049 },
  { threshold: 1000000, rate: 0.06 },
  // Add more levels as needed
];

const Slider: React.FC = () => {
  const [amount, setAmount] = useState(5.7);
  const [ethPrice, setEthPrice] = useState(0);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching ETH price:', error);
      }
    };

    fetchEthPrice();
    const interval = setInterval(fetchEthPrice, 3600000); // Update every hour

    return () => clearInterval(interval);
  }, []);

  const dollarValue = amount * ethPrice;

  const calculateAPY = (value: number) => {
    for (let i = APY_LEVELS.length - 1; i >= 0; i--) {
      if (value >= APY_LEVELS[i].threshold) {
        return APY_LEVELS[i].rate * 100;
      }
    }
    return 3.31; // Default APY
  };

  const apy = calculateAPY(dollarValue);
  const projectedReward = (amount * apy / 100).toFixed(5);

  const handleStake = () => {
    console.log(`Staking ${amount} ETH`);
  };

  return (
    <>
      <div className="flex flex-col bg-white p-4 rounded-lg max-w-sm mx-auto font-sans text-center mb-6">
        <h1 className="mt-3 text-6xl font-bold text-blue-600 mb-2">Earn ETH every day.</h1>
        <p className="mt-3 text-xl text-gray-600 mb-6">Stake your tokens and become a validator to earn rewards in our one click validator process.</p>
        
        <div className="mt-4 flex justify-between mb-6">
          <div className="text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-xl font-bold">5000+</p>
            <p className="text-sm text-gray-500">Validators</p>
          </div>
          <div className="text-center">
            <Wallet className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-xl font-bold">110250</p>
            <p className="text-sm text-gray-500">Staked</p>
          </div>
          <div className="text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <p className="text-xl font-bold">8554</p>
            <p className="text-sm text-gray-500">Rewards paid</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] max-w-md mx-auto">
        <div className="flex justify-between mb-6">
          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm font-semibold">APY</p>
            <p className="text-2xl font-bold">{apy.toFixed(2)}%</p>
          </div>
          <div className="bg-gray-100 p-3 rounded">
            <p className="text-sm font-semibold">Proj. annual reward</p>
            <p className="text-xl font-bold flex items-center">
              <Coins size={20} className="mr-1" />
              {projectedReward} ETH
            </p>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <p className="text-4xl font-bold">{amount.toFixed(2)}</p>
            <p className="text-xl font-semibold">ETH</p>
          </div>
          <p className="text-gray-500 text-lg">${dollarValue.toFixed(2)}</p>
          <div className="mt-4">
            <RangeSlider
              min={0}
              max={500}
              step={0.1}
              value={[0, amount]}
              onInput={([_, max]) => setAmount(max)}
              className="single-thumb"
            />
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
          <span>You will receive</span>
          <span>{(amount * 0.973684211).toFixed(5)} osETH</span>
        </div>
        <ApproveButton onClick={handleStake}>
          Stake {amount.toFixed(2)} ETH
        </ApproveButton>
      </div>
    </>
  );
};

export default Slider;