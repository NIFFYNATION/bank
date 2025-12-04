import React, { useState } from 'react';
import { Cog6ToothIcon, BellIcon, ShieldCheckIcon, UserIcon } from '@heroicons/react/24/outline';
import SectionCard from '../../common/SectionCard';
import LabeledField from '../../common/LabeledField';

export default function Settings() {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [prefs, setPrefs] = useState({ marketing: true, productUpdates: true });
  const [security, setSecurity] = useState({ twoFactor: false });

  return (
    <div className="space-y-8">
      <SectionCard title="Profile" subtitle="Manage your personal information" icon={UserIcon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabeledField label="Full Name" name="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Jane Doe" />
          <LabeledField label="Email" type="email" name="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="jane@example.com" />
          <LabeledField label="Phone" name="phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="(555) 123-4567" />
        </div>
        <div className="mt-6">
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-sm font-semibold text-white">
            <Cog6ToothIcon className="w-4 h-4" /> Save Profile
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Notifications" subtitle="Choose how you want to stay informed" icon={BellIcon}>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded" checked={prefs.productUpdates} onChange={(e) => setPrefs({ ...prefs, productUpdates: e.target.checked })} />
            <span className="text-sm text-gray-700">Product updates</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="rounded" checked={prefs.marketing} onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })} />
            <span className="text-sm text-gray-700">Marketing and promotions</span>
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Security" subtitle="Enhance account protection" icon={ShieldCheckIcon}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Two-factor authentication</p>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only" checked={security.twoFactor} onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })} />
            <span className="relative inline-block w-11 h-6 bg-gray-200 rounded-full transition">
              <span className={`absolute top-0.5 left-0.5 inline-block w-5 h-5 rounded-full bg-white shadow transition ${security.twoFactor ? 'translate-x-5 bg-indigo-600' : ''}`}></span>
            </span>
          </label>
        </div>
      </SectionCard>
    </div>
  );
}

