import React from 'react';
import { User, MessageSquare, Heart } from 'lucide-react';

const Community = ({ darkMode }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Komunitas</h2>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Forum Diskusi</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Tips Hemat Belanja Bulanan</p>
                  <p className="text-sm text-gray-500">oleh Sarah • 2 jam lalu</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" /> 24
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> 156
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm">Hai semua! Mau share tips hemat belanja bulanan yang berhasil ngurangin pengeluaran sampe 30%...</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Pengalaman Investasi Reksadana Pertama</p>
                  <p className="text-sm text-gray-500">oleh Budi • 5 jam lalu</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" /> 45
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> 289
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm">Setelah 6 bulan invest di reksadana, ini hasil dan pembelajaran saya...</p>
            </div>
          </div>
        </div>

        <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Lihat Semua Diskusi
        </button>
      </div>
    </div>
  );
}

export default Community;
