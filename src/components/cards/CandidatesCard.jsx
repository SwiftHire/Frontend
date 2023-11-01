import React from 'react';
import { AiFillEye } from 'react-icons/ai'

const CandidatesCard = () => {
  return (
    <div className='mt-10'>
        <ul className='bg-white shadow-lg px-5 py-2 flex items-center justify-between gap-5 rounde-[0.5rem]'>
            <li>
                <div>
                    <h3 className='font-medium text-sm'>Michael Uganda</h3>
                    <span className='text-xsm'>Backend Developer</span>
                </div>
            </li>
            <li>2days ago</li>
            <li>Michael@gmail.com</li>
            <li>pending</li>
            <li><AiFillEye className='text-primary'/></li>
        </ul>
    </div>
  )
}

export default CandidatesCard