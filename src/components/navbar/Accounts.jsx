import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import tokenService from '../../services/token.service';


const Accounts = () => {
    // const [showNavItems, setShowNavItems] = React.useState(false);
    const user = tokenService.getUser();
    const navigateTo = useNavigate();


    const handleSignOut = (e) => {
        e.preventDefault();
        tokenService.removeUser();
        navigateTo('/');
        return;
    };



    return (
        <ul className='flex flex-col lg:flex-row items-center gap-5'>
            {user?.name ? <li onClick={handleSignOut} 
                className='cursor-pointer hover:text-primary'>Sign out</li> : <Link to='/login'><li className='hover:text-primary'>Sign in</li></Link>}
            {user?.name ? <Link to='/dashboard/user'>
                <li className='bg-primary text-body px-10 py-2 rounded-[0.5rem] hover:bg-darkText'>dashboard</li>
            </Link>
                : <Link to='/register'>
                    <li className='bg-primary text-body px-10 py-2 rounded-[0.5rem] hover:bg-darkText'>Sign up</li>
                </Link>    
            }
        </ul>
    );
};

export default Accounts;