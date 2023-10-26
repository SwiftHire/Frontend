import React from 'react';
import { Loader } from '../shared/loader/Loader';
import deletePropertyIcon from '../../assets/png/delete-property-icon.png';

const DeleteModal = () => {
  return (
    <div className='h-screen w-full top-0 left-0 grid place-items-center fixed bg-body/60'>
        <div className='w-3/12 h-[6rem] flex justify-center items-center'>
            <img src={deletePropertyIcon} alt="" className='animate-bounce' />
            <Loader/>
        </div>
    </div>
  )
}

export default DeleteModal