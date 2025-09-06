import React from 'react';

const Settings = ({ darkMode, setDarkMode, userProfile }) => {
  // A local state could be used here to manage form inputs before saving
  // For now, just displaying the passed userProfile
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pengaturan</h2>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Profil</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nama</label>
            <input
              type="text"
              defaultValue={userProfile.name}
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              defaultValue={userProfile.email}
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Preferensi</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mode Gelap</p>
              <p className="text-sm text-gray-500">Gunakan tema gelap</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifikasi Push</p>
              <p className="text-sm text-gray-500">Terima notifikasi saran keuangan</p>
            </div>
            <button className="w-12 h-6 rounded-full bg-blue-500 relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Mingguan</p>
              <p className="text-sm text-gray-500">Ringkasan keuangan mingguan</p>
            </div>
            <button className="w-12 h-6 rounded-full bg-blue-500 relative">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6" />
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Keamanan</h3>
        <div className="space-y-4">
          <button className="w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
            Ubah Password
          </button>
          <button className="w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
            Aktifkan 2FA
          </button>
          <button className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
