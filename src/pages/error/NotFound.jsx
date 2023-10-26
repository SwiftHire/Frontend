import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  
    return (
  
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className='text-[2rem] lg:text-lg font-bold'>
                    <br className='hidden md:block' /> <span className='text-danger'>Error!</span></h1>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link to='/'>Visit Dashboard</Link>
                    <Link to='/' class="text-sm font-semibold text-gray-900">
                      Contact support <span aria-hidden="true">&rarr;</span></Link>
                </div>
            </div>
        </main>

    );
};

export default NotFound;