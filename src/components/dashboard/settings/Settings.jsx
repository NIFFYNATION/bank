import React, { useState } from 'react';
import { Cog6ToothIcon, BellIcon, ShieldCheckIcon, PaintBrushIcon, GlobeAltIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import SectionCard from '../../common/SectionCard';

export default function Settings() {
  const [prefs, setPrefs] = useState({
    marketing: true,
    productUpdates: true,
    theme: 'light',
    language: 'en',
    currency: 'USD'
  });
  const [security, setSecurity] = useState({ twoFactor: false, loginAlerts: true });

  return (
    <div className="space-y-8">

      {/* Application Settings replacing the old Profile block */}
      <SectionCard title="Preferences" subtitle="Customize your app experience" icon={Cog6ToothIcon}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <PaintBrushIcon className="w-4 h-4 text-gray-400" />
              Appearance
            </label>
            <select
              value={prefs.theme}
              onChange={(e) => setPrefs({ ...prefs, theme: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:primary focus:ring-1 focus:ring-primary"
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
              <option value="system">System Default</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <GlobeAltIcon className="w-4 h-4 text-gray-400" />
              Language
            </label>
            <select
              value={prefs.language}
              onChange={(e) => setPrefs({ ...prefs, language: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:primary focus:ring-1 focus:ring-primary"
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
              Display Currency
            </label>
            <select
              value={prefs.currency}
              onChange={(e) => setPrefs({ ...prefs, currency: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:primary focus:ring-1 focus:ring-primary"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/80 px-4 py-2 text-sm font-semibold text-white transition-colors">
            Save Preferences
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Notifications" subtitle="Choose how you want to stay informed" icon={BellIcon}>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" checked={prefs.productUpdates} onChange={(e) => setPrefs({ ...prefs, productUpdates: e.target.checked })} />
            <span className="text-sm text-gray-700">Product updates & newsletters</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" checked={prefs.marketing} onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })} />
            <span className="text-sm text-gray-700">Marketing and promotional offers</span>
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Security Preferences" subtitle="Enhance your application security" icon={ShieldCheckIcon}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Two-factor authentication</p>
              <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account login</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only" checked={security.twoFactor} onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })} />
              <span className={`relative inline-block w-11 h-6 rounded-full transition-colors ${security.twoFactor ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                <span className={`absolute top-0.5 left-0.5 inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${security.twoFactor ? 'translate-x-5' : ''}`}></span>
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Unrecognized login alerts</p>
              <p className="text-sm text-gray-500 mt-1">Get notified if anyone logs into your account from a new device</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only" checked={security.loginAlerts} onChange={(e) => setSecurity({ ...security, loginAlerts: e.target.checked })} />
              <span className={`relative inline-block w-11 h-6 rounded-full transition-colors ${security.loginAlerts ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                <span className={`absolute top-0.5 left-0.5 inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform ${security.loginAlerts ? 'translate-x-5' : ''}`}></span>
              </span>
            </label>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
