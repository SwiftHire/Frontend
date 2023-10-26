import React, { useContext, useState } from 'react'
import { templateContext } from '../../contexts/templateContext';

function TemplateDropdown() {

    const { template, selectTemplate } = useContext(templateContext);
    const [openMenu, setOpenMenu] = useState(false);
    const showMenu = () => {
        setOpenMenu(!openMenu)
    }
    return (
        <div>
            <button onClick={showMenu} className=' bg-white border border-gray-300 flex gap-32 text-black justify-between items-center rounded-xl py-3 px-4 text-[15px]'>
                <span className=' flex gap-3 justify-center items-center'>
                    <span>
                        <svg width="16" height="7" viewBox="0 0 16 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M15.305 6.08H0.5V3.815C0.5 1.985 1.985 0.5 3.815 0.5H5.5625C6.785 0.5 7.1675 0.8975 7.655 1.55L8.705 2.945C8.9375 3.2525 8.9675 3.2975 9.4025 3.2975H11.495C13.2725 3.29 14.7875 4.46 15.305 6.08Z" fill="#7E3AF2" />
                        </svg>

                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.4925 1.13008C15.4775 0.762578 15.4175 0.417578 15.305 0.0800781H0.5V5.48758C0.5 7.70008 2.3 9.50008 4.5125 9.50008H11.4875C13.7 9.50008 15.5 7.70008 15.5 5.48758V1.30258C15.5 1.25008 15.5 1.18258 15.4925 1.13008ZM9.8225 5.22508H6.0725C5.765 5.22508 5.51 4.97008 5.51 4.66258C5.51 4.35508 5.765 4.10008 6.0725 4.10008H9.8225C10.13 4.10008 10.385 4.35508 10.385 4.66258C10.385 4.97008 10.13 5.22508 9.8225 5.22508Z" fill="#7E3AF2" />
                        </svg>
                    </span>
                    {template === 0 ? 'Simple' : template === 1 ? 'Elegant' : template === 2 ? 'Eager' : template === 4 ? 'Splendid' : template === 5 ? 'Distinct' : template === 6 ? 'Diligent' : template === 7 ? 'Minimal' : template === 8 ? 'Lucid' : 'Stylistic'}
                </span>
                <span>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.41706 0.999687L4.00372 3.58635L6.59039 0.999687C6.85039 0.739688 7.27039 0.739688 7.53039 0.999687C7.79039 1.25969 7.79039 1.67969 7.53039 1.93969L4.47039 4.99969C4.21039 5.25969 3.79039 5.25969 3.53039 4.99969L0.470391 1.93969C0.210391 1.67969 0.210391 1.25969 0.470391 0.999687C0.730391 0.746354 1.15706 0.739688 1.41706 0.999687Z" fill="#3F3F46" />
                    </svg>
                </span>
            </button>
            <div class={" absolute w-64 bg-white rounded-xl text-base z-50 list-none divide-y divide-gray-100 shadow my-4 transition-all duration-300" + (openMenu ? " block" : " hidden")} id="dropdown">
                <ul class="py-1" aria-labelledby="dropdown">
                    <li onClick={()=>{
                        selectTemplate(0);
                        showMenu();
                    }}  className=' cursor-pointer border-b border-b-gray-100'>
                        <p class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Simple</p>
                    </li>
                    <li onClick={()=>{
                        selectTemplate(1);
                        showMenu();
                    }} id='1' className=' cursor-pointer border-b border-b-gray-100'>
                        <p class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Elegant</p>
                    </li>
                    <li onClick={()=>{
                        selectTemplate(2);
                        showMenu();
                    }} id='2' className=' cursor-pointer border-b border-b-gray-100'>
                        <p class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Eager</p>
                    </li>
                    <li onClick={()=>{
                        selectTemplate(3);
                        showMenu();
                    }} id='3' className=' cursor-pointer border-b border-b-gray-100'>
                        <p class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Splendid</p>
                    </li>
                    <li onClick={()=>{
                        selectTemplate(4);
                        showMenu();
                    }} className=' cursor-pointer'>
                        <p class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Distinct</p>
                    </li>
                    <li onClick={()=>{
                        selectTemplate(5);
                        showMenu();
                    }} className=' cursor-pointer'>
                        <p class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Diligent</p>
                    </li>
                    <li onClick={()=>{
                        selectTemplate(6);
                        showMenu();
                    }} className=' cursor-pointer'>
                        <p class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Minimal</p>
                    </li>
                    <li onClick={()=>{
                        selectTemplate(7);
                        showMenu();
                    }} className=' cursor-pointer'>
                        <p class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Lucid</p>
                    </li>
                    <li onClick={()=>{
                        selectTemplate(8);
                        showMenu();
                    }} className=' cursor-pointer'>
                        <p class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Stylistic</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TemplateDropdown