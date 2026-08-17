'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CheckoutForm from './CheckoutForm';
import { Wordmark } from '@/components/Logo';

const STRIPE_PK = 'pk_live_lBUjAPXg364KwzUBnOdoejeM';
const stripePromise = loadStripe(STRIPE_PK);

const BUNDLES = {
  '1': { title: '1x LatteGo Series 5500', price: 69.00, image: '/images/philips-5500/philips-5500-hero.webp' },
  '2': { title: '2x LatteGo Series 5500', price: 110.99, image: '/images/philips-5500/philips-5500-hero.webp' },
  '3': { title: '3x LatteGo Series 5500', price: 149.99, image: '/images/philips-5500/philips-5500-hero.webp' },
};

function CheckoutContentInner({ bundleOverride }) {
  const searchParams = useSearchParams();
  const [cartData, setCartData] = useState(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  useEffect(() => {
    const bundleParam = bundleOverride || searchParams.get('bundle');
    const bundleKey = (bundleParam === 'x1' ? '1' : bundleParam === 'x2' ? '2' : bundleParam === 'x3' ? '3' : bundleParam) || '1';
    
    setCartData({ bundle: bundleKey, qty: 1, addons: {}, protection: false });
    
    // Fire TikTok InitiateCheckout event
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('InitiateCheckout', {
        contents: [{
          content_id: bundleKey,
          content_name: BUNDLES[bundleKey]?.title || 'Bundle',
          quantity: 1,
          price: BUNDLES[bundleKey]?.price || 0
        }],
        content_type: 'product',
        value: BUNDLES[bundleKey]?.price || 0,
        currency: 'EUR'
      });
    }
  }, [searchParams, bundleOverride]);

  const createIntent = async (formData) => {
    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...cartData, customerData: formData }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error || 'Fehler bei der Zahlungsinitialisierung.');
    return data.clientSecret;
  };

  if (!cartData) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Warenkorb wird geladen...</div>;
  }

  const { bundle = '1', qty = 1, addons = {} } = cartData;
  const safeAddons = typeof addons === 'object' && addons !== null && !Array.isArray(addons) ? addons : {};

  const selectedBundle = BUNDLES[bundle] || BUNDLES['1'];
  const hasFreeGift = bundle === '2' || bundle === '3';

  let subtotal = (selectedBundle.price * qty);
  
  const BUMP_PRICES = {
    lavazza: 9.99,
    warranty: 12.50,
    filter: 14.99,
  };
  Object.entries(safeAddons).forEach(([id, addonQty]) => {
    if (BUMP_PRICES[id]) {
      subtotal += BUMP_PRICES[id] * addonQty;
    }
  });
  
  const appearance = {
    theme: 'flat',
  };
  
  const options = {
    mode: 'payment',
    amount: Math.round(subtotal * 100) || 100,
    currency: 'eur',
    // Must match payment_method_types on the PaymentIntent exactly.
    // Explicit list is required in deferred mode to guarantee Klarna,
    // Bancontact and iDEAL render in the PaymentElement.
    paymentMethodTypes: ['card', 'bancontact', 'ideal'],
    appearance,
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full h-full bg-gray-50 relative">
      {/* Mobile Header (Visible only on lg-) */}
      <div className="lg:hidden bg-white border-b border-gray-200">
        <div className="p-4 flex items-center justify-center">
            <Link href="/">
              <Wordmark size="lg" />
            </Link>
        </div>
        <div className="bg-gray-50 border-t border-b border-gray-200 p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsSummaryOpen(!isSummaryOpen)}>
            <div className="flex items-center gap-2 text-sm text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span>{isSummaryOpen ? 'Bestellzusammenfassung ausblenden' : 'Bestellzusammenfassung anzeigen'}</span>
                <svg className={`w-4 h-4 transition-transform ${isSummaryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            <span className="font-medium text-lg text-gray-900">£{subtotal.toFixed(2)}</span>
        </div>
        
        {/* Mobile Expanded Summary */}
        {isSummaryOpen && (
          <div className="bg-gray-50 p-4 border-b border-gray-200 space-y-4">
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                    <div className="w-full h-full bg-white border border-gray-200 rounded-md overflow-hidden relative">
                        <Image src={selectedBundle.image} alt={selectedBundle.title} fill className="object-cover" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10">{qty}</span>
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{selectedBundle.title}</h3>
                </div>
                <span className="text-sm font-medium text-gray-900">£{(selectedBundle.price * qty).toFixed(2)}</span>
            </div>
            {Object.entries(safeAddons).map(([id, addonQty]) => {
                if (!addonQty || !BUMP_PRICES[id]) return null;
                const BUMP_TITLES = { lavazza: 'Lavazza Super Crema', warranty: '1-Jahres-Garantieverlängerung', filter: 'AquaClean Wasserfilter' };
                const BUMP_IMAGES = { lavazza: 'https://m.media-amazon.com/images/I/61dSjp-nZvL._SX522_.jpg', warranty: 'https://m.media-amazon.com/images/I/21Nhi1uEkrL.jpg', filter: 'https://m.media-amazon.com/images/I/61vhr9Ff32L._AC_SX679_.jpg' };
                return (
                  <div key={id} className="flex items-center gap-4 mt-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                          <div className="w-full h-full bg-white border border-gray-200 rounded-md overflow-hidden relative">
                              <img src={BUMP_IMAGES[id]} alt={BUMP_TITLES[id]} className={`w-full h-full ${id === 'warranty' ? 'object-cover' : 'object-contain p-2'}`} />
                          </div>
                          <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10">{addonQty}</span>
                      </div>
                      <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{BUMP_TITLES[id]}</h3>
                      </div>
                      <span className="text-sm font-medium text-gray-900">£{(BUMP_PRICES[id] * addonQty).toFixed(2)}</span>
                  </div>
                );
            })}
            
            {/* Free Gift UI (Mobile Accordion) */}
            {hasFreeGift && (
              <div className="flex items-center gap-4 mt-4 relative">
                  <div className="relative w-16 h-16 flex-shrink-0">
                      <div className="w-full h-full bg-[#EAF3DE] border border-[#3B6D11]/30 rounded-md overflow-hidden relative">
                          <img src="https://m.media-amazon.com/images/I/61dSjp-nZvL._SX522_.jpg" alt="Gratis Lavazza" className="w-full h-full object-contain p-2 mix-blend-multiply" />
                      </div>
                      <span className="absolute -top-2 -right-2 bg-[#3B6D11] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10">3</span>
                  </div>
                  <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">Lavazza Super Crema</h3>
                      <p className="text-xs text-[#3B6D11] font-bold uppercase tracking-widest mt-0.5">Gratis-Zugabe</p>
                  </div>
                  <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-400 line-through">$29.97</span>
                      <span className="text-sm font-black text-[#3B6D11]">Kostenlos</span>
                  </div>
              </div>
            )}
            <div className="border-t border-gray-200 pt-4 flex items-center justify-between font-medium text-lg">
                <span className="text-gray-900">Gesamt</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-normal">EUR</span>
                    <span className="text-gray-900">£{subtotal.toFixed(2)}</span>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Left Column (Checkout Form) */}
      <div className="flex-1 bg-white flex justify-center lg:justify-end">
        <div className="w-full max-w-[600px] p-4 lg:p-10 xl:pr-16">
          <div className="hidden lg:flex mb-8 justify-center">
            <Link href="/">
              <Wordmark size="xl" />
            </Link>
          </div>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm 
              amount={subtotal} 
              createIntent={createIntent} 
              addons={safeAddons} 
              setAddons={(newAddons) => setCartData({ ...cartData, addons: newAddons })} 
              cartData={cartData}
              selectedBundle={selectedBundle}
            />
          </Elements>
        </div>
      </div>

      {/* Right Column (Order Summary - Desktop) */}
      <div className="hidden lg:block w-[45%] xl:w-[50%] bg-gray-50 border-l border-gray-200">
        <div className="w-full max-w-[500px] p-10 xl:pl-16 sticky top-0">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                    <div className="w-full h-full bg-white border border-gray-200 rounded-md overflow-hidden relative">
                        <Image src={selectedBundle.image} alt={selectedBundle.title} fill className="object-cover p-1" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10">{qty}</span>
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{selectedBundle.title}</h3>
                </div>
                <span className="text-sm font-medium text-gray-900">£{(selectedBundle.price * qty).toFixed(2)}</span>
            </div>
            
            {Object.entries(safeAddons).map(([id, addonQty]) => {
                if (!addonQty || !BUMP_PRICES[id]) return null;
                const BUMP_TITLES = { lavazza: 'Lavazza Super Crema', warranty: '1-Jahres-Garantieverlängerung', filter: 'AquaClean Wasserfilter' };
                const BUMP_IMAGES = { lavazza: 'https://m.media-amazon.com/images/I/61dSjp-nZvL._SX522_.jpg', warranty: 'https://m.media-amazon.com/images/I/21Nhi1uEkrL.jpg', filter: 'https://m.media-amazon.com/images/I/61vhr9Ff32L._AC_SX679_.jpg' };
                return (
                  <div key={id} className="flex items-center gap-4 mt-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                          <div className="w-full h-full bg-white border border-gray-200 rounded-md overflow-hidden relative">
                              <img src={BUMP_IMAGES[id]} alt={BUMP_TITLES[id]} className={`w-full h-full ${id === 'warranty' ? 'object-cover' : 'object-contain p-2'}`} />
                          </div>
                          <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10">{addonQty}</span>
                      </div>
                      <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{BUMP_TITLES[id]}</h3>
                      </div>
                      <span className="text-sm font-medium text-gray-900">£{(BUMP_PRICES[id] * addonQty).toFixed(2)}</span>
                  </div>
                );
            })}

            {/* Free Gift UI (Desktop) */}
            {hasFreeGift && (
              <div className="flex items-center gap-4 mt-4 relative">
                  <div className="relative w-16 h-16 flex-shrink-0">
                      <div className="w-full h-full bg-[#EAF3DE] border border-[#3B6D11]/30 rounded-md overflow-hidden relative">
                          <img src="https://m.media-amazon.com/images/I/61dSjp-nZvL._SX522_.jpg" alt="Gratis Lavazza" className="w-full h-full object-contain p-2 mix-blend-multiply" />
                      </div>
                      <span className="absolute -top-2 -right-2 bg-[#3B6D11] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10">3</span>
                  </div>
                  <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900">Lavazza Super Crema</h3>
                      <p className="text-xs text-[#3B6D11] font-bold uppercase tracking-widest mt-0.5">Gratis-Zugabe</p>
                  </div>
                  <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-400 line-through">$29.97</span>
                      <span className="text-sm font-black text-[#3B6D11]">Kostenlos</span>
                  </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 space-y-3 mt-6">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Zwischensumme</span>
                    <span className="font-medium text-gray-900">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Versand</span>
                    <span className="font-medium text-gray-900">Kostenlos</span>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex items-center justify-between font-medium text-xl">
                <span className="text-gray-900">Gesamt</span>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-normal mt-1">EUR</span>
                    <span className="text-gray-900">£{subtotal.toFixed(2)}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutContent({ bundleOverride }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Laden...</div>}>
      <CheckoutContentInner bundleOverride={bundleOverride} />
    </Suspense>
  );
}
