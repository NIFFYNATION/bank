import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import LabeledField from '../LabeledField';
import { Button } from '../Button';

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    console.log('Logging in with:', formData);
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back! Please enter your details."
      linkLabel="Don't have an account?"
      linkText="Sign up"
      linkTo="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Enter your password"
          required
        />
        <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-text-secondary cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                Remember me
            </label>
            <a href="#" className="font-semibold text-primary hover:text-primary-light">Forgot password?</a>
        </div>
        <Button type="submit" variant="primary" fullWidth size="lg">Sign In</Button>
      </form>
    </AuthLayout>
  );
};

export default Signin;
