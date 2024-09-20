"use client";

import React, { useState } from 'react';

const FAQItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        className="flex justify-between items-center w-full p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg">{question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          FAQ
        </span>
      </div>
      <h2 className="text-4xl font-bold text-center mb-4">We're here to answer all your questions.</h2>
      <p className="text-center text-gray-600 mb-12">
        If you're new to validation or looking to earn more with your current stack, this section will help you learn more about the platform and its features.
      </p>
      <div className="space-y-4">
        <FAQItem question="Who can become a validator ?">
          <p>Anyone can become a validator for as little as USD 10.</p>
        </FAQItem>
        <FAQItem question="What are the advantages of becoming a validator?">
          <p>Becoming a validator provides stable, long-term income. What's more, your daily earnings are secure, as your cryptocurrencies remain stored in your wallet, which is as safe as your bank account.</p>
        </FAQItem>
        <FAQItem question="What are the risks of becoming a validator?">
          <p>Cryptocurrency depreciation is the only risk. To minimize this risk as much as possible, we recommend being a validator of several different cryptocurrencies in particular.</p>
        </FAQItem>
        <FAQItem question="What is the interest rate?">
          <p>Interest rates range from 0.5% to 6%.</p>
        </FAQItem>
        <FAQItem question="Why does the interest rate vary?">
        <p>The interest rate is based on 2 factors:</p>
          <div className="space-y-4"> {/* Ajout de l'espacement vertical */}
            <p>- The amount available in your validator wallet, which changes you from a pooled validator to a solo validator.</p>
            <p>- The choice of cryptocurrency because some reward validators more generously due to the large number of transactions.</p>
            </div>
        </FAQItem>
        
      </div>
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">Got any more questions? 24/7 Support</p>
        <button className="bg-purple-100 text-purple-700 font-semibold py-2 px-4 rounded-full hover:bg-purple-200 transition duration-300">
          Whatsapp quand on clique ou num
        </button>
      </div>
    </div>
  );
};

export default FAQ;