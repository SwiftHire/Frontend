import React from 'react';
import { Link } from 'react-router-dom';
import facebook from '../../assets/svg/facebook-icon.svg';
import twitter from '../../assets/svg/twitter-icon.svg';
import instagram from '../../assets/svg/instagram-icon.svg';

const socialIcons = [
    {
        name: 'instagram',
        url: '',
        image: <img src={instagram} alt="" />
    },
    {
        name: 'facebook',
        url: '',
        image: <img src={facebook} alt="" />
    },
    {
        name: 'twitter',
        url: '',
        image: <img src={twitter} alt="" />
    },
];

export const Social = () => {
    return (
        <div>
            <ul className="flex items-center gap-5">
                {socialIcons.map((socialIcon) => (
                    <li
                        key={socialIcon.name}
                        className="cursor-pointer rounded-full"
                    >
                        <Link to={socialIcon.url}>{socialIcon.image}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
