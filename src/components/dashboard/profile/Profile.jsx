import React from 'react';
import SectionCard from '../../common/SectionCard';
import LabeledField from '../../common/LabeledField';
import { Button } from '../../common/Button';
import { useBankStore } from '../../../store/useBankStore';

const Profile = () => {
    const store = useBankStore();

    const user = {
        name: store.userName || 'Unknown User',
        email: store.email || 'No email provided',
        phone: store.phoneNumber || 'No phone provided',
        address: `${store.address || ''}, ${store.city || ''}, ${store.zipCode || ''}, ${store.country || ''}`.replace(/^[,\s]+|[,\s]+$/g, ''),
        id: store.accountNumber || 'N/A',
        status: store.accountStatus || 'Pending',
        spendStatus: store.spendStatus || 'Standard',
        memberSince: store.accountAge ? `${new Date().getFullYear() - parseInt(store.accountAge)}` : 'Recently',
    };
    const [showPasswordMessage, setShowPasswordMessage] = React.useState(false);

    const handleChangePassword = () => {
        setShowPasswordMessage(true);
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

                        </div>
                        <div className="mt-6 pt-4">
                            <div className="flex justify-between py-2 text-sm">
                                <span className="text-text-secondary">Account Number</span>
                                <span className="text-text-primary font-medium">{user.id}</span>
                            </div>
                            <div className="flex justify-between py-2 text-sm">
                                <span className="text-text-secondary">Account Status</span>
                                <span className={`font-medium ${user.status.toLowerCase() === 'active' ? 'text-success' : 'text-warning'}`}>{user.status}</span>
                            </div>
                            <div className="flex justify-between py-2 text-sm">
                                <span className="text-text-secondary">Spend Status</span>
                                <span className="text-text-primary font-medium">{user.spendStatus}</span>
                            </div>
                            <div className="flex justify-between py-2 text-sm">
                                <span className="text-text-secondary">Member Since</span>
                                <span className="text-text-primary font-medium">{user.memberSince}</span>
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
                                <LabeledField disabled label="Full Name" value={user.name} readOnly />
                                <LabeledField disabled label="Email Address" value={user.email} readOnly />
                                <LabeledField disabled label="Phone Number" value={user.phone} readOnly />
                                <LabeledField disabled label="Address" value={user.address} readOnly />
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button variant="primary">Save Changes</Button>
                            </div>
                        </form>
                    </SectionCard>

                    <div className="mt-6">
                        <SectionCard title="Security" subtitle="Manage your password and security settings.">
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="py-4 md:py-0">
                                        <h3 className="font-medium text-text-primary">Password</h3>
                                        <p className="text-sm text-text-secondary">Last changed 13 days ago</p>
                                        {showPasswordMessage && (
                                            <p className="text-sm text-text-secondary mt-1" style={{ color: 'red' }}>
                                                You cannot change your password until after 20 days.
                                            </p>
                                        )}
                                    </div>
                                    <Button variant="outline" onClick={handleChangePassword} size="sm">Change Password</Button>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="py-4 md:py-0">
                                        <h3 className="font-medium text-text-primary">Two-Factor Authentication</h3>
                                        <p className="text-sm text-text-secondary">Add an extra layer of security</p>
                                    </div>
                                    <Button variant="primary" size="sm">Enabled</Button>
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
