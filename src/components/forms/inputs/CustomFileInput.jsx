import React from 'react';
import { useField } from 'formik';

export default function  CustomFileInput ({ label, ...props }){
    const [field, meta] = useField(props);
  
    return (
      <div className="mb-4">
        <label htmlFor={props.id || props.name} className="block text-gray-700 font-bold mb-2">
          {label}
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${meta.touched && meta.error && 'border-red-500'}`}
          type="file"
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-red-500 text-sm mt-1">{meta.error}</div>
        ) : null}
      </div>
    );
  };
  