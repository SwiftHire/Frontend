import React from 'react';

export const Button = ({ children, disabled, ...props }) => {
    const className = disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary';
    return (
        <button
            className={`w-full py-3 text-body mt-4 rounded-[0.5rem] 
            font-bold text-sm flex items-center justify-center gap-5 hover:bg-darkText ease-in-out duration-300 ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
