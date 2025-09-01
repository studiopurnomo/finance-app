import React from 'react';
import { ChevronRight, Film } from 'lucide-react';

const Education = ({ darkMode }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Edukasi Keuangan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600"></div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Investasi untuk Pemula</h3>
            <p className="text-sm text-gray-500 mb-3">Pelajari dasar-dasar investasi yang aman dan menguntungkan</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-500">10 menit baca</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="h-40 bg-gradient-to-br from-green-400 to-green-600"></div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Budgeting 50/30/20</h3>
            <p className="text-sm text-gray-500 mb-3">Metode efektif mengatur keuangan bulanan Anda</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-500">8 menit baca</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="h-40 bg-gradient-to-br from-purple-400 to-purple-600"></div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Dana Darurat</h3>
            <p className="text-sm text-gray-500 mb-3">Pentingnya memiliki dana darurat dan cara memulainya</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-500">12 menit baca</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Video Tutorial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-4">
            <div className="w-32 h-20 bg-red-100 rounded-lg flex items-center justify-center">
              <Film className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h4 className="font-medium">Cara Menabung Efektif</h4>
              <p className="text-sm text-gray-500">15 menit • 2.3k views</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-32 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
              <Film className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h4 className="font-medium">Memahami Reksadana</h4>
              <p className="text-sm text-gray-500">20 menit • 1.8k views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
