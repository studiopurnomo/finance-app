import React from 'react';
import { Gift, Share2, Users, Award } from 'lucide-react';

const Referral = ({ darkMode }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Program Referral</h2>

      <div className={`rounded-xl p-8 text-center ${darkMode ? 'bg-gradient-to-br from-yellow-900 to-orange-900' : 'bg-gradient-to-br from-yellow-400 to-orange-500'} text-white shadow-lg`}>
        <Gift className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Ajak Teman, Dapat Reward!</h3>
        <p className="mb-6">Dapatkan 1 bulan gratis untuk setiap teman yang upgrade ke premium</p>
        <div className={`inline-block px-6 py-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} text-gray-800 rounded-lg font-mono`}>
          KODE: FINANCE2025
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-xl p-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <Share2 className="w-12 h-12 mx-auto mb-3 text-blue-500" />
          <h4 className="font-semibold mb-2">Bagikan Kode</h4>
          <p className="text-sm text-gray-500">Share kode referral ke teman-teman Anda</p>
        </div>

        <div className={`rounded-xl p-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <Users className="w-12 h-12 mx-auto mb-3 text-green-500" />
          <h4 className="font-semibold mb-2">Teman Daftar</h4>
          <p className="text-sm text-gray-500">Teman daftar dan upgrade ke premium</p>
        </div>

        <div className={`rounded-xl p-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <Award className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
          <h4 className="font-semibold mb-2">Dapat Reward</h4>
          <p className="text-sm text-gray-500">Nikmati 1 bulan premium gratis</p>
        </div>
      </div>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Statistik Referral</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-500">5</p>
            <p className="text-sm text-gray-500">Total Referral</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-500">3</p>
            <p className="text-sm text-gray-500">Berhasil Upgrade</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-500">3</p>
            <p className="text-sm text-gray-500">Bulan Gratis</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Referral;
