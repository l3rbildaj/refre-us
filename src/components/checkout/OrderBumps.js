'use client';

import React from 'react';

const BUMPS = [
  {
    id: 'lavazza',
    title: 'Yes! Add Lavazza Super Crema whole coffee beans to my order',
    description: 'Perfectly matched to the 5500’s integrated ceramic grinders. Add this to your order to enjoy rich, velvety espresso shots from the moment you unbox.',
    price: 9.99,
    image: 'https://m.media-amazon.com/images/I/61dSjp-nZvL._SX522_.jpg',
  },
  {
    id: 'warranty',
    title: 'Yes! Add 1-Year Warranty Extension to my order',
    description: 'Seamless protection for your investment. This extends your standard warranty by an additional 12 months, ensuring uninterrupted daily enjoyment and priority hardware support.',
    price: 12.50,
    image: 'https://m.media-amazon.com/images/I/21Nhi1uEkrL.jpg',
  },
  {
    id: 'filter',
    title: 'Yes! Add AquaClean Original limescale and water filter to my order',
    description: 'Essential for optimal extraction. Purifies your water for a better coffee aroma while protecting the 5500’s internal components – eliminating the need to descale for up to 5,000 cups.',
    price: 14.99,
    image: 'https://m.media-amazon.com/images/I/61vhr9Ff32L._AC_SX679_.jpg',
  }
];

export default function OrderBumps({ addons, onChange }) {
  // addons is an object mapping id to qty, e.g. { lavazza: 1, warranty: 0 }

  const handleToggle = (id) => {
    const currentQty = addons[id] || 0;
    if (currentQty > 0) {
      onChange({ ...addons, [id]: 0 });
    } else {
      onChange({ ...addons, [id]: 1 });
    }
  };

  const updateQty = (id, delta) => {
    const currentQty = addons[id] || 0;
    const newQty = Math.max(1, currentQty + delta);
    onChange({ ...addons, [id]: newQty });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-gray-900">Special Offers</h2>
      {BUMPS.map((bump) => {
        const isSelected = (addons[bump.id] || 0) > 0;
        const qty = addons[bump.id] || 0;

        return (
          <div key={bump.id} className={`border rounded-lg p-3 transition-all ${isSelected ? 'border-[#2563EB] bg-blue-50/30' : 'border-dashed border-gray-300 bg-white hover:border-gray-400'}`}>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <input 
                  type="checkbox" 
                  checked={isSelected}
                  onChange={() => handleToggle(bump.id)}
                  className="w-5 h-5 text-[#2563EB] rounded border-gray-300 focus:ring-[#2563EB] cursor-pointer"
                />
              </div>
              
              <div className="w-16 h-16 relative flex-shrink-0 bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm cursor-pointer" onClick={() => handleToggle(bump.id)}>
                <img src={bump.image} alt="Product Image" className={`w-full h-full ${bump.id === 'warranty' ? 'object-cover' : 'object-contain p-1'}`} />
              </div>
              
              <div className="flex-1 cursor-pointer" onClick={() => handleToggle(bump.id)}>
                <h4 className="font-bold text-gray-900 leading-tight text-[13px] sm:text-sm">
                  {bump.title.replace('Yes! ', '')}
                </h4>
                <div className="text-[#2563EB] font-bold text-[13px] mt-0.5">
                  + £{bump.price.toFixed(2)}
                </div>
              </div>
            </div>

            {isSelected && bump.id !== 'warranty' && (
              <div className="mt-3 ml-8 flex items-center gap-3 border-t border-gray-200/60 pt-3">
                <span className="text-xs font-medium text-gray-700">Qty:</span>
                <div className="flex items-center border border-gray-300 rounded-md bg-white">
                  <button type="button" onClick={() => updateQty(bump.id, -1)} className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 rounded-l-md font-medium transition-colors">-</button>
                  <span className="px-3 py-0.5 font-semibold text-gray-900 border-x border-gray-300 min-w-[2rem] text-center text-sm">{qty}</span>
                  <button type="button" onClick={() => updateQty(bump.id, 1)} className="px-2 py-0.5 text-gray-600 hover:bg-gray-100 rounded-r-md font-medium transition-colors">+</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
