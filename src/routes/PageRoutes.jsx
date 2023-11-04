import React, { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Home } from '../pages/landing';
import { Dashboard, UserDashboard } from '../pages/dashboard';
import { Login } from '../pages/auth/login';
import { Register, RegisterApplicant, RegisterEmployee } from '../pages/auth/register';
import { EmailConfirmation } from '../pages/auth/confirm-email';
import { ViewApplicants, JobDetails, CreateProfile, UpdateProfile } from '../pages/applicants';



const PageRoutes = () => {
  return (
    <>
      <ToastContainer />
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
                <Route path='dashboard/create-profile/applicant' element={<CreateProfile />}/>
                <Route path='dashboard/update-profile/applicant' element={<UpdateProfile />}/>
                <Route path='dashboard/job-applicants/:jobId' element={<ViewApplicants />}/>
                <Route path='dashboard/job-details/:jobId' element={<JobDetails />}/>
              </Route>
          </Routes>
      </Router>
    </>
  )
}

export default PageRoutes