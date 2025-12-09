import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import LabeledField from '../LabeledField';
import { Button } from '../Button';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate signup
    console.log('Signing up with:', formData);
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      title="Sign Up"
      subtitle="Create your account to get started."
      linkLabel="Already have an account?"
      linkText="Sign in"
      linkTo="/signin"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <LabeledField
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
        <LabeledField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <LabeledField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
        />
         <LabeledField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />
        <Button type="submit" variant="primary" fullWidth size="lg">Create Account</Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
