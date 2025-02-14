import React from 'react';

// Simple Card components for layout
export const Card = ({ children, className }) => (
  <div className={`border rounded shadow-sm p-4 ${className || ''}`}>{children}</div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`mb-2 ${className || ''}`}>{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-bold ${className || ''}`}>{children}</h2>
);

export const CardContent = ({ children, className }) => (
  <div className={`mt-2 ${className || ''}`}>{children}</div>
);
