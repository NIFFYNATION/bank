import React from 'react';

export default function SectionCard({ title, subtitle, icon: Icon, actions, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {(title || actions) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-5 h-5 text-indigo-600" />}
              {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
            </div>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

