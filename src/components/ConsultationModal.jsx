import React from 'react';
import { X, AlertTriangle, CheckCircle, Target } from 'lucide-react';

const ConsultationModal = ({ darkMode, setShowConsultationModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-2xl my-8`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Konsultasi Keuangan AI</h3>
          <button onClick={() => setShowConsultationModal(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className={`rounded-lg p-4 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <h4 className="font-semibold mb-2">Analisis Keuangan Anda</h4>
            <p className="text-sm">Berdasarkan data transaksi 3 bulan terakhir:</p>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h5 className="font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Pengeluaran Makan Meningkat
              </h5>
              <p className="text-sm mt-1">
                Pengeluaran untuk kategori makanan meningkat 20% (Rp 2.5jt → Rp 3jt) dibanding bulan lalu.
              </p>
              <div className="mt-3 space-y-2">
                <p className="font-medium text-sm">Rekomendasi:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Pertimbangkan meal prep di akhir pekan (hemat 30-40%)</li>
                  <li>• Manfaatkan promo/diskon aplikasi food delivery</li>
                  <li>• Batasi makan di luar maksimal 2x seminggu</li>
                  <li>• Alokasikan budget harian Rp 100rb untuk makan</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h5 className="font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Cashflow Positif
              </h5>
              <p className="text-sm mt-1">
                Saldo bulanan Anda positif Rp 2.5jt. Ini adalah kesempatan bagus untuk investasi!
              </p>
              <div className="mt-3 space-y-2">
                <p className="font-medium text-sm">Rekomendasi:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Alokasikan 20% (Rp 500rb) ke reksadana pasar uang</li>
                  <li>• Sisihkan 30% (Rp 750rb) untuk dana darurat</li>
                  <li>• Pertimbangkan deposito untuk dana jangka menengah</li>
                  <li>• Pelajari investasi saham dengan modal kecil dulu</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h5 className="font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Progress Target Tabungan
              </h5>
              <p className="text-sm mt-1">
                Target tabungan Rp 5jt tercapai 30% (Rp 1.5jt). Dengan pola saat ini, target tercapai dalam 4 bulan.
              </p>
              <div className="mt-3 space-y-2">
                <p className="font-medium text-sm">Rekomendasi:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Naikkan alokasi tabungan jadi Rp 1jt/bulan</li>
                  <li>• Otomatisasi transfer di awal bulan</li>
                  <li>• Cari side income untuk percepat target</li>
                  <li>• Review dan kurangi pengeluaran tidak penting</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h4 className="font-semibold mb-2">Action Plan Bulan Ini</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Kurangi makan di luar</p>
                  <p className="text-xs text-gray-500">Target: Max 2x/minggu</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Mulai investasi</p>
                  <p className="text-xs text-gray-500">Rp 500rb ke reksadana</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Tambah dana darurat</p>
                  <p className="text-xs text-gray-500">Target: Rp 750rb</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Review subscription</p>
                  <p className="text-xs text-gray-500">Cancel yang tidak perlu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold">
              Terapkan Rekomendasi
            </button>
            <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;
