import React, { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/landing';
import { Dashboard, UserDashboard } from '../pages/dashboard';
import { Login } from '../pages/auth/login';
import { Register, RegisterApplicant, RegisterEmployee } from '../pages/auth/register';
import { EmailConfirmation } from '../pages/auth/confirm-email';


const PageRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}  />
            <Route path='/login' element={<Login/>}  />
            <Route path='/register' element={<Register />} />
            <Route path='/register/applicant' element={<RegisterApplicant/>}  />
            <Route path='/register/employer' element={<RegisterEmployee/>}  />
            <Route path='/email-confirmation' element={<EmailConfirmation/>}  />
            <Route element={<Dashboard />}>
              <Route path='dashboard/user' element={<UserDashboard />}/>
            </Route>
        </Routes>
    </Router>
  )
}

export default PageRoutes