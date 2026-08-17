'use client';

import React, { useState } from 'react';
import {
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import CheckoutTimer from './CheckoutTimer';
import OrderBumps from './OrderBumps';

const COUNTRIES = [
  { value: 'US', label: 'United States' }
];

export default function CheckoutForm({ amount, createIntent, addons, setAddons, cartData, selectedBundle }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    shippingCountry: 'US',
    shippingFirstName: '',
    shippingLastName: '',
    shippingAddress: '',
    shippingApt: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    // Save buyer info
    localStorage.setItem('buyerInfo', JSON.stringify(formData));
    localStorage.setItem('billingSameAsShipping', JSON.stringify(billingSameAsShipping));

    // Fire CAPI InitiateCheckout
    try {
        await fetch('/api/capi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventName: 'InitiateCheckout',
                eventSourceUrl: window.location.href,
                user_data: {
                    email: formData.email,
                    firstName: formData.shippingFirstName,
                    lastName: formData.shippingLastName
                },
                custom_data: { currency: 'USD', value: amount }
            })
        });
    } catch(err) {
        console.error("Failed to fire CAPI event:", err);
    }

    try {
      const clientSecret = await createIntent(formData);

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          // return_url is the only thing needed here.
          // Stripe collects billing/shipping details itself for redirect methods
          // (Klarna, Bancontact, iDEAL). Passing payment_method_data here
          // conflicts with those flows and causes silent payment failures.
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        setMessage(error.message);
      }
    } catch (err) {
      setMessage(err.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {message && (
        <div id="payment-message" className="text-red-600 text-[15px] p-4 bg-blue-50 rounded-md border border-red-100 font-medium">
          {message}
        </div>
      )}

      <CheckoutTimer />

      {/* Express Checkout */}
      <div className="space-y-4">
        <ExpressCheckoutElement 
          options={{
            layout: {
              maxRows: 4
            },
            emailRequired: true,
            shippingAddressRequired: true,
            phoneNumberRequired: true,
            buttonType: {
              applePay: 'buy',
              googlePay: 'buy',
            }
          }}
          onConfirm={async (event) => {
            if (!stripe || !elements) return;
            setMessage(null);

            try {
                await fetch('/api/capi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        eventName: 'InitiateCheckout',
                        eventSourceUrl: window.location.href,
                        custom_data: { currency: 'USD', value: amount }
                    })
                });
            } catch(e) {}

            try {
                const clientSecret = await createIntent();
                const { error } = await stripe.confirmPayment({
                  elements,
                  clientSecret,
                  confirmParams: {
                    return_url: `${window.location.origin}/success`,
                  },
                });
                if (error) {
                  setMessage(error.message);
                }
            } catch (err) {
                setMessage(err.message);
            }
          }}
        />
        <div className="relative flex items-center pt-2 pb-1">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>

      <div className="space-y-4">
          <h2 className="text-xl font-medium text-gray-900">Contact</h2>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email or mobile phone number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder-gray-500 text-gray-900" />
          <div className="flex items-center gap-2">
              <input type="checkbox" id="news" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600" />
              <label htmlFor="news" className="text-sm text-gray-600">Email me with news and offers</label>
          </div>
      </div>

      <div className="space-y-4">
          <h2 className="text-xl font-medium text-gray-900">Shipping</h2>
          
          <div className="relative">
              <select name="shippingCountry" value={formData.shippingCountry} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none bg-white text-gray-900 appearance-none pt-6 pb-2">
                  {COUNTRIES.map(country => (
                      <option key={country.value} value={country.value}>{country.label}</option>
                  ))}
              </select>
              <label className="absolute top-2 left-3 text-xs text-gray-500">Country/Region</label>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
              <input required type="text" name="shippingFirstName" value={formData.shippingFirstName} onChange={handleChange} placeholder="First name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none placeholder-gray-500 text-gray-900" />
              <input required type="text" name="shippingLastName" value={formData.shippingLastName} onChange={handleChange} placeholder="Last name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none placeholder-gray-500 text-gray-900" />
          </div>
          <input required type="text" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} placeholder="Address" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none placeholder-gray-500 text-gray-900" />
          <input type="text" name="shippingApt" value={formData.shippingApt} onChange={handleChange} placeholder="Apartment, suite, etc. (optional)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none placeholder-gray-500 text-gray-900" />
          <div className="grid grid-cols-3 gap-4">
              <input required type="text" name="shippingCity" value={formData.shippingCity} onChange={handleChange} placeholder="City" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none placeholder-gray-500 text-gray-900" />
              <input type="text" name="shippingState" value={formData.shippingState} onChange={handleChange} placeholder="State" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none placeholder-gray-500 text-gray-900" />
              <input required type="text" name="shippingZip" value={formData.shippingZip} onChange={handleChange} placeholder="ZIP code" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none placeholder-gray-500 text-gray-900" />
          </div>
      </div>

      {/* Shipping Method */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-gray-900">Shipping method</h2>
        <div className="border-2 border-[#2563EB] rounded-md p-4 flex justify-between items-center cursor-pointer bg-blue-50/30">
            <div className="flex items-center gap-3">
                <input type="radio" checked readOnly className="w-5 h-5 text-[#2563EB] focus:ring-[#2563EB]" />
                <div>
                    <p className="text-[15px] font-medium text-gray-900">Premium Shipping</p>
                    <p className="text-[13px] text-gray-500">2-4 Business days</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-400 line-through">$19.99</span>
                <span className="text-[13px] font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-sm">Free</span>
            </div>
        </div>
      </div>

      {/* Payment */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-gray-900">Payment</h2>
        <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>
        <div className="mt-2">
          <PaymentElement 
            id="payment-element" 
            options={{ 
              defaultValues: {
                billingDetails: {
                  address: {
                    country: 'US'
                  }
                }
              },
              layout: { 
                type: 'accordion', 
                defaultCollapsed: false, 
                radios: 'auto', 
                spacedAccordionItems: false 
              },
              wallets: {
                applePay: 'auto',
                googlePay: 'auto'
              }
            }} 
          />
        </div>
      </div>

      <OrderBumps addons={addons} onChange={setAddons} />

      {/* Mobile Cart Summary (Shopify Style) */}
      {(() => {
        const hasFreeGift = cartData?.bundle === '2' || cartData?.bundle === '3';
        const totalItems = (parseInt(cartData?.bundle || '1') * parseInt(cartData?.qty || 1)) + Object.values(addons).reduce((a, b) => parseInt(a || 0) + parseInt(b || 0), 0) + (hasFreeGift ? 3 : 0);
        const BUMP_IMAGES = { lavazza: 'https://m.media-amazon.com/images/I/61dSjp-nZvL._SX522_.jpg', warranty: 'https://m.media-amazon.com/images/I/21Nhi1uEkrL.jpg', filter: 'https://m.media-amazon.com/images/I/61vhr9Ff32L._AC_SX679_.jpg' };
        
        let addonImage = null;
        if (hasFreeGift) {
            addonImage = BUMP_IMAGES['lavazza'];
        } else {
            for (const [key, qty] of Object.entries(addons)) {
                if (qty > 0 && BUMP_IMAGES[key]) {
                    addonImage = BUMP_IMAGES[key];
                    break;
                }
            }
        }

        return (
          <div className="lg:hidden flex items-center justify-between bg-white py-3 my-4">
            <div className="flex items-center gap-5">
              <div className="relative w-[60px] h-[60px] flex-shrink-0">
                {addonImage && (
                  <div className="absolute inset-0 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center p-1 transform translate-x-2 -translate-y-1 rotate-6">
                    <img src={addonImage} alt="Add-on product" className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="absolute inset-0 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center p-1 z-10">
                  {selectedBundle?.image && <img src={selectedBundle.image} alt="Product" className="w-full h-full object-contain" />}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 leading-tight">Total</span>
                <span className="text-sm text-gray-500 font-medium">
                  {totalItems} items
                </span>
              </div>
            </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">USD</span>
            <span className="text-2xl font-bold text-gray-900 leading-tight">£{amount?.toFixed(2)}</span>
          </div>
          {(() => {
            const bundleUnits = parseInt(cartData?.bundle || '1');
            const bundleQty = parseInt(cartData?.qty || 1);
            const originalBundlePrice = bundleUnits * bundleQty * 69.00;
            const actualBundlePrice = (selectedBundle?.price || 0) * bundleQty;
            const savings = originalBundlePrice - actualBundlePrice;
            if (savings > 0) {
              return (
                <div className="flex items-center gap-1 mt-1 text-[13px] text-gray-500 font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                  You save £{savings.toFixed(2)}
                </div>
              );
            }
            return null;
          })()}
        </div>
      </div>
      );
      })()}

      {/* Submit Button Group */}
      <div className="flex flex-col gap-3">
        <button 
          disabled={isLoading || !stripe || !elements} 
          id="submit" 
          className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-4 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-md"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>Pay Now</>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-gray-500">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium">100% Secure & Encrypted Payment (SSL)</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500 mb-2">
          By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-600">
          <a href="/datenschutz" target="_blank" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="/agb" target="_blank" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          <span>|</span>
          <a href="/widerruf" target="_blank" className="hover:text-blue-600 transition-colors">Refund Policy</a>
        </div>
      </div>
    </form>
  );
}
