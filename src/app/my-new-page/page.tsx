"use client";

import React from 'react';
import StakingProcess from '../components/StakingProcess';
import FAQ from '../components/Faq';
import StakingInfo from '../components/StakingInfo';
import PoolTable from '../components/PoolTable';
import UnlockPotentialSection from '../components/UnlockPotentialSection';
import Slider from '../components/Slider';

export default function MyNewPage() {
  return (
    <div className="min-h-screen bg-white text-black md:hidden flex flex-col"> {/* Added flex and flex-col */}
      <div className="p-4 space-y-40 flex-grow"> {/* Added flex-grow to push footer down */}
        <div>
<Slider />

        </div>
        
        <div className="mb-8">
          <StakingInfo />
        </div>
        <div className="mb-8">
          <PoolTable />
        </div>
      
        <div className="mb-8">
          <StakingProcess />
        </div>
        <div>
          <FAQ />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-4 px-6 mt-8"> {/* Added margin-top for spacing */}
        <div className="max-w-md mx-auto">
          <p className="text-center text-gray-600 text-sm">
            © 2024 Superwebsite. Stake on your terms.
          </p>
        </div>
      </footer>

      {/* Message for non-mobile devices */}
      <div className="hidden md:flex md:items-center md:justify-center md:h-screen md:text-center md:p-4">
        <h1 className="text-xl font-bold">
          This website is only available on mobile devices. Please access it from a phone.
        </h1>
      </div>
    </div>
  );
}