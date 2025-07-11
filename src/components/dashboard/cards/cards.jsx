import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from "../../common/Button";

const Cards = () => {
  const [activeCard, setActiveCard] = useState(0);
  const controls = useAnimation();
  
  const cards = [
    {
      id: 1,
      type: 'Visa Platinum',
      number: '**** **** **** 4589',
      holder: 'Real Real',
      expires: '12/25',
      balance: 5420.50,
      color: 'from-purple-500 to-indigo-600',
      logo: '/icons/cards.svg'
    },
    {
      id: 2,
      type: 'Mastercard Gold',
      number: '**** **** **** 7823',
      holder: 'Real Real',
      expires: '09/24',
      balance: 3150.75,
      color: 'from-amber-500 to-orange-600',
      logo: '/icons/cards.svg'
    }
  ];

  const cardFeatures = [
    { icon: '🔒', title: 'Security', description: 'Enable/disable card for extra security' },
    { icon: '💳', title: 'Virtual Card', description: 'Create virtual card for online purchases' },
    { icon: '📊', title: 'Spending Limits', description: 'Set daily/monthly spending limits' },
    { icon: '🌍', title: 'Travel Notice', description: 'Notify us about your travel plans' }
  ];

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0 && activeCard > 0) {
        setActiveCard(activeCard - 1);
      } else if (info.offset.x < 0 && activeCard < cards.length - 1) {
        setActiveCard(activeCard + 1);
      }
    }
    controls.start({ x: 0 });
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
     

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Cards</h1>
            <div className="text-xs text-gray-400 font-medium mb-1">
              Dashboard <span className="mx-1">&gt;</span> <span className="text-gray-700">Transactions</span>
            </div>
          </div>
          <div className=" mt-2 sm:mt-0">
          
            <Button variant='primary' size='md' shape='roundedMd' >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
               Add New Card
            </Button>
          </div>
        </div>
      {/* Cards Display */}
      <div className="relative h-64 flex items-center justify-center gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`absolute w-96 h-56 rounded-2xl p-6 md:p-0 cursor-pointer ${index === activeCard ? 'z-10' : 'z-0'}`}
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{
              scale: index === activeCard ? 1 : 0.9,
              opacity: index === activeCard ? 1 : 0.7,
              x: (index - activeCard) * 40
            }}
            drag={index === activeCard ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onClick={() => setActiveCard(index)}
          >
            <div className={`w-full h-full rounded-xl bg-gradient-to-r ${card.color} p-6 relative overflow-hidden`}>
              <div className="flex justify-between items-start">
                <img src={card.logo} alt="card logo" className="w-12 h-12" />
                <span className="text-white font-medium">{card.type}</span>
              </div>
              <div className="mt-8">
                <p className="text-white text-xl tracking-wider">{card.number}</p>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <div className="text-white">
                  <p className="text-sm opacity-80 my-6">Card Holder</p>
                  <p className="font-medium">{card.holder}</p>
                </div>
                <div className="text-white">
                  <p className="text-sm opacity-80">Expires</p>
                  <p className="font-medium">{card.expires}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Card Details */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Card Balance</h2>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-600 mt-2">
              ${cards[activeCard].balance.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
              Block Card
            </button>
            <button className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
              Card Settings
            </button>
          </div>
        </div>

        {/* Card Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {cardFeatures.map((feature, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="font-semibold text-gray-900 mt-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Card Transactions</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  🛍️
                </div>
                <div>
                  <p className="font-medium text-gray-900">Online Purchase</p>
                  <p className="text-sm text-gray-500">Amazon.com</p>
                </div>
              </div>
              <p className="font-semibold text-red-500">-$99.99</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;