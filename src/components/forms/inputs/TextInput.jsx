import React, { useField } from 'formik';

export default function TextInput ({ label, icon, passwordIcon, handleTogglePassword, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div className="grid grid-cols-1 relative my-1">
            <label htmlFor={props.id || props.name} className="text-sm font-light mb-1 ml-1 capitalize">{label}</label>
            {icon && <span className="absolute bottom-[2.4rem] left-2">{<img src={icon} alt='' />}</span>}
            <div className='relative'>
                <input 
                    className={`${icon && 'pl-7'} w-full text-[#989093] text-sm font-light py-2 px-2 outline-0 
                    rounded-[8px] border border-[#E4E6F1] pl-4`} 
                    {...field} 
                    {...props} 
                />
                <span 
                    onClick={handleTogglePassword}
                    className='absolute bottom-3 right-3 cursor-pointer'>{passwordIcon}</span>
            </div>
            {meta.touched && meta.error ? (
                <p className="text-red-500">{meta.error}</p>
            ) : null}
        </div>
    );
}
  