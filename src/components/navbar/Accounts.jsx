import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import tokenService from '../../services/token.service';
import { UserContext } from '../../contexts/UserContext';

const Accounts = () => {
    // const [showNavItems, setShowNavItems] = React.useState(false);
    const user = tokenService.getUser();
    const navigateTo = useNavigate();
    const { setUserContext } = useContext(UserContext);

    const handleSignOut = (e) => {
        e.preventDefault();
        tokenService.removeUser();
        setUserContext({});
        navigateTo('/');
        return;
    };

    // function displayMenuItems(){
    //     setShowNavItems(!showNavItems);
    // }

    return (
        <ul className='flex flex-col lg:flex-row items-center gap-5'>
            {user?.name ? <li onClick={handleSignOut} 
                className='cursor-pointer border-b border-danger'>Sign out</li> : <Link to='/sign-in'><li>Sign in</li></Link>}
            {user?.name ? <Link to='resumai/start-crafting'>
                <li className='bg-primary text-body px-10 py-2 rounded-[0.5rem] hover:bg-darkText'>create</li>
            </Link>
                : <Link to='/sign-up'>
                    <li className='bg-primary text-body px-10 py-2 rounded-[0.5rem] hover:bg-darkText'>sign up</li>
                </Link>    
            }
        </ul>
    );
};

export default Accounts;