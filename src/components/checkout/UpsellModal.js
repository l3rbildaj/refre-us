'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import OrderBumps from './OrderBumps';

export default function UpsellModal({ isOpen, onClose, addons, setAddons, onConfirm, isSubmitting }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex flex-col bg-white overflow-hidden animate-in fade-in duration-200">
      <div className="w-full h-full max-w-3xl mx-auto flex flex-col relative shadow-xl">
        
        {/* Header */}
        <div className="p-6 bg-[#FEF2F2] border-b border-[#2563EB]/20 text-center shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-[#2563EB] leading-snug">
            Bevor wir Ihre Bestellung bestätigen...
          </h2>
          <p className="text-gray-700 mt-2 text-sm md:text-base font-medium">
            Hier sind einige Must-have-Artikel, um sicherzustellen, dass Ihre Maschine immer einsatzbereit ist.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <OrderBumps addons={addons} onChange={setAddons} />
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 shrink-0 flex flex-col gap-3">
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="w-full bg-[#2563EB] text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-md"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Wird verarbeitet...
              </>
            ) : (
              'Bestellung abschließen'
            )}
          </button>
          
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            Zurück zum Checkout
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
