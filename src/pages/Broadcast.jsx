import React from 'react';

const Broadcast = ({ darkMode }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Broadcast Message</h2>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Target Audience</label>
            <select className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <option>All Users</option>
              <option>Premium Users Only</option>
              <option>Free Users Only</option>
              <option>Inactive Users (30+ days)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message Type</label>
            <select className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <option>Push Notification</option>
              <option>Email</option>
              <option>In-App Message</option>
              <option>All Channels</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              placeholder="Promo Spesial Akhir Bulan!"
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              rows="6"
              placeholder="Tulis pesan Anda di sini..."
              className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send Now
            </button>
            <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
              Schedule
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Recent Broadcasts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Promo Premium 50% Off</p>
              <p className="text-sm text-gray-500">Sent to Free Users • 2 days ago</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>Open Rate: 45%</p>
              <p>Click Rate: 12%</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Tips Keuangan Mingguan</p>
              <p className="text-sm text-gray-500">Sent to All Users • 7 days ago</p>
            </div>
            <div className="text-sm text-gray-500">
              <p>Open Rate: 62%</p>
              <p>Click Rate: 23%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Broadcast;
