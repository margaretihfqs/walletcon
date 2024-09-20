import React from 'react';

const PoolTable = () => {
  const poolData = [
    { name: 'Pool 1', range: '10-499 USDT', revenue: 'from 0,5% to 0,6%' },
    { name: 'Pool 2', range: '500-2\'999 USDT', revenue: 'from 1,6% to 1,8%' },
    { name: 'Pool 3', range: '3\'000-14\'999 USDT', revenue: 'from 1,9% to 2,2%' },
    { name: 'Pool 4', range: '15\'000-29\'999 USDT', revenue: 'from 2,3% to 2,6%' },
    { name: 'Pool 5', range: '30\'000-49\'999 USDT', revenue: 'from 2,7% to 3%' },
    { name: 'Pool 6', range: '50\'000-99\'999 USDT', revenue: 'from 3,1% to 3,4%' },
    { name: 'VIP 1', range: '100\'000-199\'999 USDT', revenue: 'from 3,5% to 3,9%' },
    { name: 'VIP 2', range: '200\'000-199\'999 USDT', revenue: 'from 4,0% to 4,4%' },
    { name: 'VIP 3', range: '500\'000-199\'999 USDT', revenue: 'from 4,5% to 4,9%' },
    { name: 'VIP 4', range: 'From 1\'000\'000 USDT', revenue: 'from 5% to 6%' },
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] overflow-hidden md:max-w-2xl">
      <div className="rounded-3xl overflow-hidden border border-gray-300">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left text-sm font-medium text-gray-800 uppercase tracking-wider py-4 px-4">Stake</th>
              <th className="text-left text-sm font-medium text-gray-800 uppercase tracking-wider py-4 px-4">Daily income</th>
            </tr>
          </thead>
          <tbody>
            {poolData.map((pool, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{pool.name}</div>
                  <div className="text-sm text-gray-500">{pool.range}</div>
                </td>
                <td className="py-4 px-4 align-bottom">
                  <div className="text-sm text-gray-500">{pool.revenue}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoolTable;