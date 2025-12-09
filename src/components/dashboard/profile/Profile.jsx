import React from 'react';
import SectionCard from '../../common/SectionCard';
import LabeledField from '../../common/LabeledField';
import { Button } from '../../common/Button';

const Profile = () => {
  const user = {
    name: 'real real',
    email: 'real@example.com',
    phone: '+1 234 567 890',
    address: '123 Bank Street, Finance City',
    id: '77990250980',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Profile Summary Card */}
        <div className="w-full md:w-1/3">
            <SectionCard>
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-xl font-bold text-text-primary">{user.name}</h2>
                    <p className="text-text-secondary text-sm mb-4">{user.email}</p>
                    <div className="flex gap-2 w-full">
                        <Button variant="outline" fullWidth size="sm">Change Avatar</Button>
                    </div>
                </div>
                <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between py-2 text-sm">
                        <span className="text-text-secondary">Account Status</span>
                        <span className="text-success font-medium">Active</span>
                    </div>
                    <div className="flex justify-between py-2 text-sm">
                        <span className="text-text-secondary">Member Since</span>
                        <span className="text-text-primary font-medium">Jan 2024</span>
                    </div>
                     <div className="flex justify-between py-2 text-sm">
                        <span className="text-text-secondary">KYC Status</span>
                        <span className="text-success font-medium">Verified</span>
                    </div>
                </div>
            </SectionCard>
        </div>

        {/* Edit Details Form */}
        <div className="w-full md:w-2/3">
            <SectionCard title="Personal Information" subtitle="Update your personal details here.">
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <LabeledField label="Full Name" value={user.name} readOnly />
                        <LabeledField label="Email Address" value={user.email} readOnly />
                        <LabeledField label="Phone Number" value={user.phone} />
                        <LabeledField label="Date of Birth" type="date" />
                    </div>
                    <LabeledField label="Address" value={user.address} />
                    <div className="flex justify-end pt-4">
                        <Button variant="primary">Save Changes</Button>
                    </div>
                </form>
            </SectionCard>

             <div className="mt-6">
                <SectionCard title="Security" subtitle="Manage your password and security settings.">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-medium text-text-primary">Password</h3>
                                <p className="text-sm text-text-secondary">Last changed 3 months ago</p>
                            </div>
                            <Button variant="outline" size="sm">Change Password</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h3 className="font-medium text-text-primary">Two-Factor Authentication</h3>
                                <p className="text-sm text-text-secondary">Add an extra layer of security</p>
                            </div>
                            <Button variant="outline" size="sm">Enable</Button>
                        </div>
                    </div>
                </SectionCard>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
