/* eslint-disable no-unused-vars */
import React, { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { SignUp, Login, LoginAdmin, EmailConfirmation } from './pages/accounts';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import { Profile, TemplateLibrary, CraftResumeDashBaord, ResumeTemplates, CraftingPage,
    ResumeCraftingTemplates, CraftingTemplate, CraftResumeTemplatePage } from './pages';
import ChatLibrary  from './pages/chat-library/ChatLibrary';
import NewUserCraftResume from './pages/no-resume/NewUserCraftResume';
import { SubscriptionPlans, OnDemandPlansPage } from './pages/plan';
import NotFound from './pages/error/NotFound';
import { ForgotPassword } from './pages/forgot-password/ForgotPassword';
import { ResetPassword } from './pages/reset-password/ResetPassword';
import { AuthorizedPage } from './components/middlewares/sign-in-middleware/AuthorizedPage';
import { ResumeContextProvider } from './contexts/resumeContext';
import { CreditsCalculatorProvider } from './contexts/CreditsCalculator';
import { UserPlansContextProvider } from './contexts/UserPlansContext';
import { GetAllPlansContextProvider } from './contexts/GetAllPlansContext';
import { TemplateProvider } from './contexts/templateContext';
import { Checkout } from './pages/checkout/Checkout';
import { EmailValidationPage } from './pages/email-validation/EmailValidationPage';

import { Doc } from './components/document/Doc';

import termsDoc from './docs/terms-of-service.pdf';
import privacyDoc from './docs/privacy-policy.pdf';
function App() {
    return (
        <UserProvider>
            <TemplateProvider>
                <ResumeContextProvider>
                    <UserPlansContextProvider>
                    <CreditsCalculatorProvider>
                        <GetAllPlansContextProvider>
                                <Router>
                                    <Routes>
                                        <Route path="/" element={<Home/>} />
                                        <Route path="/sign-up" element={<SignUp/>} />
                                        <Route path="/sign-in" element={<Login/>} />
                                        <Route path="/log-in-admin" element={<LoginAdmin/>} />
                                        <Route exact path='/validate-email' element={<EmailValidationPage/>} />
                                        <Route exact path='/email-confirmation' element={<EmailConfirmation/>} />
                                        <Route exact path='/forgot-password' element={<ForgotPassword/>} />
                                        <Route exact path='/reset-password' element={<ResetPassword/>} />
                                        <Route element={<Dashboard/>}>
                                            <Route index path="resumai/craft-template/dashboard/:resumeId"
                                                element={<CraftResumeDashBaord/>}/>
                                            <Route path="resumai/start-crafting"
                                                element={<CraftingPage/>}/>
                                            <Route path="resumai/initial-crafting-template" element={
                                                <NewUserCraftResume/>
                                            }/>
                                            <Route path="resumai/resume-crafting-template" element={
                                                <ResumeCraftingTemplates/>
                                      }/>
                                            <Route exact path='resumai/craft-template'
                                                element={<CraftingTemplate/>} />
                                            <Route exact path='resumai/craft-template-page'
                                                element={<CraftResumeTemplatePage/>} />
                                            <Route path="resumai/profile" element={<Profile/>}/>
                                            <Route path="resumai/templates" element={<TemplateLibrary/>}/>


                                            <Route path="chat" element={<ChatLibrary/>}/>


                                            <Route path="resumes" element={<ResumeTemplates/>}/>



                                            <Route path="resumai/on-demand-plans" element={<OnDemandPlansPage/>}/>






                                            <Route path="resumai/subscription-plans" element={<SubscriptionPlans/>}/>


                                            <Route path='/checkout' element={<Checkout/>}/>
                                        </Route>
                                        <Route exact path='/terms-of-service' element={<Doc file={termsDoc}/>} />
                                        <Route exact path='/privacy-policy' element={<Doc file={privacyDoc}/>} />
                                        <Route path='*' element={<NotFound/>}/>
                                    </Routes>
                                </Router>
                            </GetAllPlansContextProvider>
                    </CreditsCalculatorProvider>
                    </UserPlansContextProvider>
                </ResumeContextProvider>
                </TemplateProvider>
        </UserProvider>

    );
}

export default App;
