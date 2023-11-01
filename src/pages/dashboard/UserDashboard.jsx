import React from 'react';
import tokenService from '../../services/token.service';
import EmployerDashboard from './EmployerDashboard';
import ApplicantsDashBoard from './ApplicantsDashBoard';

const UserDashboard = () => {
    const user = tokenService.getUser();

    const renderUserType = ()=>{
        switch (user.userType) {
            case 'applicant':
                return <ApplicantsDashBoard />
            case 'employer':
                return <EmployerDashboard />
            default:
                return null;
        }
    }
  return (
    <div className='w-full'>{renderUserType()}</div>
  )
}

export default UserDashboard