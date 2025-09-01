import React from 'react';
import { X, Shield, CheckCircle } from 'lucide-react';

const UpgradeModal = ({
  darkMode,
  setShowUpgradeModal,
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Upgrade ke Premium</h3>
          <button onClick={() => setShowUpgradeModal(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <p className="text-lg font-medium mb-2">Limit Transaksi Tercapai!</p>
            <p className="text-sm text-gray-500">
              Anda telah mencapai limit 500 transaksi untuk akun gratis.
            </p>
          </div>

          <div className="space-y-3">
            <div className={`border-2 border-blue-500 rounded-lg p-4 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Premium Bulanan</h4>
                <span className="text-2xl font-bold">Rp 20rb</span>
              </div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  500 transaksi tambahan/bulan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Konsultasi AI unlimited
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Export data Excel/PDF
                </li>
              </ul>
            </div>

            <div className={`border rounded-lg p-4 relative ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
              <div className="absolute -top-3 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                BEST VALUE
              </div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Premium Lifetime</h4>
                <span className="text-2xl font-bold">Rp 85rb</span>
              </div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Unlimited transaksi selamanya
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Semua fitur premium
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Priority support
                </li>
              </ul>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Pilih Metode Pembayaran:</p>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`p-3 rounded-lg border-2 ${
                    selectedPaymentMethod === method.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-600'
                  } hover:border-blue-500 flex flex-col items-center gap-1`}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-xs">{method.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold disabled:opacity-50"
            disabled={!selectedPaymentMethod}
          >
            Lanjutkan Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
