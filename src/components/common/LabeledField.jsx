import React from 'react';

export default function LabeledField({
  label,
  type = 'text',
  value,
  onChange,
  name,
  placeholder,
  required = false,
  options,
  textarea = false,
  min,
  max,
  step,
  disabled,
  readOnly,
  ...rest
}) {
  const common = {
    name,
    value,
    onChange,
    required,
    placeholder,
    disabled,
    readOnly,
    ...rest,
    className: `w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 shadow-sm focus:outline-none ${disabled || readOnly
        ? 'bg-gray-50 cursor-not-allowed text-gray-500'
        : 'bg-white focus:ring-2 focus:ring-primary focus:border-primary'
      }`,
  };

  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>}
      {options && Array.isArray(options) ? (
        <select {...common}>
          <option value="">Select…</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea {...common} rows={4} />
      ) : (
        <input {...common} type={type} min={min} max={max} step={step} />
      )}
    </label>
  );
}

