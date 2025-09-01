import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Budget = ({ darkMode }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pengaturan Budget</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Simulasi Goal Keuangan</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pilih Goal</label>
              <select className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <option>Dana Darurat (6x pengeluaran)</option>
                <option>DP Rumah</option>
                <option>Liburan Impian</option>
                <option>Pendidikan Anak</option>
                <option>Pensiun Dini</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Target Amount</label>
              <input
                type="number"
                placeholder="50000000"
                className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              />
            </div>
            <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
              Hitung Simulasi
            </button>
          </div>
        </div>

        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-lg font-semibold mb-4">Financial Health Check</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Rasio Income/Expense</span>
              </div>
              <span className="font-semibold text-green-600">Baik</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <span>Dana Darurat</span>
              </div>
              <span className="font-semibold text-yellow-600">Perlu Ditingkatkan</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Tingkat Tabungan</span>
              </div>
              <span className="font-semibold text-green-600">Sangat Baik</span>
            </div>
            <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4">
              Lihat Detail Analisis
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Riwayat Konsultasi</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-medium">Strategi Menabung untuk DP Rumah</p>
            <p className="text-sm text-gray-500">20 Jan 2025 • 15 rekomendasi</p>
            <button className="text-purple-500 text-sm mt-1">Lihat Detail →</button>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-medium">Optimasi Pengeluaran Bulanan</p>
            <p className="text-sm text-gray-500">15 Jan 2025 • 8 rekomendasi</p>
            <button className="text-blue-500 text-sm mt-1">Lihat Detail →</button>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-medium">Rencana Investasi Pemula</p>
            <p className="text-sm text-gray-500">10 Jan 2025 • 12 rekomendasi</p>
            <button className="text-green-500 text-sm mt-1">Lihat Detail →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;
