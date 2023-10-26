import React, { useField } from 'formik';

export default function TextInput ({ label, icon, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div className="grid grid-cols-1 relative my-1">
            <label htmlFor={props.id || props.name} className="text-sm font-light mb-1 ml-1">{label}</label>
            {icon && <span className="absolute bottom-[2.4rem] left-2">{<img src={icon} alt='' />}</span>}
            <input className={`${icon && 'pl-7'} text-[#989093] text-sm font-light py-2 px-2 outline-0 rounded-[8px] border border-[#E4E6F1] pl-4`} {...field} {...props} />
            {meta.touched && meta.error ? (
                <p className="text-red-500">{meta.error}</p>
            ) : null}
        </div>
    );
}
  