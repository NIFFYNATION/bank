import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from "../../common/Button";
import {
  CurrencyDollarIcon,
  CreditCardIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';
import { useBankStore } from '../../../store/useBankStore';

const Cards = () => {
  const { cards = [], transactions = [], monthlyOutgoing = 0 } = useBankStore();
  const [activeCard, setActiveCard] = useState(0);
  const controls = useAnimation();

  const cardFeatures = [
    { icon: '🔒', title: 'Security', description: 'Enable/disable card for extra security' },
    { icon: '💳', title: 'Virtual Card', description: 'Create virtual card for online purchases' },
    { icon: '📊', title: 'Spending Limits', description: 'Set daily/monthly spending limits' },
    { icon: '🌍', title: 'Travel Notice', description: 'Notify us about your travel plans' }
  ];

  const handleDragEnd = (_, info) => {
    const threshold = 50;
    if (info.offset.x > threshold && activeCard > 0) {
      setActiveCard(activeCard - 1);
    } else if (info.offset.x < -threshold && activeCard < cards.length - 1) {
      setActiveCard(activeCard + 1);
    }
  };

  return (
    <div className="p-2 space-y-8">

      <h1 className="text-2xl mt-4 font-bold text-text-primary">My Cards</h1>




      {/* Card Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Balance</p>
              <p className="text-xl md:text-2xl font-bold text-text-primary mt-1">
                ${(cards || []).reduce((sum, card) => sum + (card.balance || 0), 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <CurrencyDollarIcon className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Cards</p>
              <p className="text-xl md:text-2xl font-bold text-text-primary mt-1">{cards.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CreditCardIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Spending</p>
              <p className="text-xl md:text-2xl font-bold text-text-primary mt-1">${(monthlyOutgoing || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards Display */}
      <div className="relative h-72 flex items-center justify-center gap-6 mb-8">

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
            onClick={() => setActiveCard(index)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <div className={`w-full h-full rounded-xl bg-gradient-to-r ${card.color} p-6 relative overflow-hidden shadow-2xl`}>
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white opacity-5"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white opacity-5"></div>

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

        {/* Card indicator dots */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${index === activeCard ? 'bg-indigo-600' : 'bg-gray-300'}`}
              onClick={() => setActiveCard(index)}
            ></div>
          ))}
        </div>

        {/* Swipe indicator */}
        {cards.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 flex items-center">
            <ArrowsRightLeftIcon className="h-4 w-4 mr-1" />
            Swipe to change cards
          </div>
        )}
        {cards.length === 0 && (
          <div className="flex items-center justify-center w-full h-full text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
            No active cards.
          </div>
        )}
      </div>

      {/* Card Details */}
      {cards.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between  mb-6">
            <div className="flex  justify-between items-center gap-4 mb-3">
              <h2 className="text-xl font-semibold text-text-primary">Card Balance:</h2>
              <p className="text-2xl  font-bold text-primary">
                ${cards[activeCard]?.balance.toLocaleString() || '0.00'}
              </p>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <Button variant='outline' size='md' shape='roundedMd'>
                Block Card
              </Button>
              <Button variant='primary' size='md' shape='roundedMd'>
                Card Settings
              </Button>
            </div>
          </div>

          {/* Card Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {cardFeatures.map((feature, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="font-semibold text-text-primary mt-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-2 shadow-lg">
        <h2 className="text-xl font-semibold text-text-primary mb- p-4">Recent Card Transactions</h2>
        <div className="">
          {transactions.filter(tx => tx.channel === 'Card').slice(0, 8).length > 0 ? (
            transactions
              .filter(tx => tx.channel === 'Card')
              .slice(0, 8)
              .map(tx => (
                <div key={tx.id} className=" p-2 py-4 border-t last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-11 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                      {tx.type === 'Debit' ? '🛍️' : '📥'}
                    </div>
                    <div className='flex flex-col md:flex-row w-full justify-between '>
                      <div className=" ">
                        <p className="font-medium text-text-primary truncate md:whitespace-normal max-w-[300px]">{tx.description || tx.name}</p>
                        <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                      <p className={`mt-2 sm:mt-0 font-semibold ${tx.type === 'Debit' ? 'text-red-500' : 'text-green-600'}`}>
                        {tx.type === 'Debit' ? '-' : '+'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                </div>
              ))
          ) : (
            <p className="text-gray-500 text-sm py-4 text-center border border-dashed border-gray-200 rounded-lg">No recent card activity.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;