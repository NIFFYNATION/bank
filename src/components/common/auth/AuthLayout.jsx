import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, linkText, linkTo, linkLabel }) => {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left Side - Brand/Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90"></div>
        <div className="relative z-10 text-white p-12 max-w-lg">
          <h1 className="text-4xl font-bold mb-6">Welcome to Our Bank</h1>
          <p className="text-lg text-blue-100">
            Experience the next generation of banking with our secure and easy-to-use platform.
            Manage your finances, transfer money, and track your expenses all in one place.
          </p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white opacity-10 rounded-full"></div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-background">
        <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-text-primary mb-2">{title}</h2>
                <p className="text-text-secondary">{subtitle}</p>
            </div>
            
            {children}

            <div className="mt-6 text-center text-sm text-text-secondary">
                {linkLabel} <Link to={linkTo} className="font-semibold text-primary hover:text-primary-light transition-colors ml-1">{linkText}</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
