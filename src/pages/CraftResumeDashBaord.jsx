import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
// import Button from '../components/button/Button';
import { useCreditsCalculator } from '../contexts/CreditsCalculator';
import useResumeContext from '../contexts/resumeContext';

import coreClient from '../services/coreApi';
//import { DataStateContext, DataDispatchContext } from '../contexts/dataContext';
import { AlertBox } from '../components/alert-box/AlertBox';

import { PersonalForm, JobDetailsForm, SkillsForm, SummaryForm, Finalise, CoverLetter, ResumeSectionList } from './edit';
//import { PageLoader } from '../components/loaders';
// import { PaymentPlans, OnDemandPlans } from './plan';
import DeleteModal from '../components/modals/DeleteModal';

const CraftResumeDashBaord = () => {
    const [loading,  setLoading] = useState(false);
    const [isLoading,  setIsLoading] = useState(false);
    const [isDeleteLoading,  setIsDeleteLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [tab, setTab] = useState(0);
    const { resumeList } = useResumeContext();
    const { updateUserCredits, userCredits } = useCreditsCalculator();


    const [formData, setFormData] = useState(null);
    const componentRef = useRef();

    const { resumeId } = useParams();
    const navigateTo = useNavigate();
    
    const resumeTabs = [
        'Personal',
        'Job details',
        'Experience',
        'Education',
        'Projects',
        'Skills',
        'Certification',
        'Summary',
        'Finalise',
        'Cover Letter',
    ];

    const activeReqId = resumeList?.requestId ? resumeList?.requestId : resumeId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await coreClient.get(`/resume/${activeReqId}`);
                if(response?.data?.resume === undefined){
                    console.log('something went wrong')
                }else{
                    setFormData(response?.data?.resume); 
                } 
            } catch (err) {
                alert(err);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [resumeId]);

    async function handleSaveToArray(value){
        setIsLoading(true);
        setTimeout(async()=>{
            try {
                const response = await coreClient.put(`/resume/${activeReqId}/update`, value);
                setFormData({ ...formData, ...response.data.data });
                setIsSuccess(true);
                setMessage(response.data.message);
            } catch (err) {
                console.log(err);
                setIsSuccess(false);
                setMessage('an error occured, pls try again');
            }finally{
                setIsLoading(false);
            }
        },3000);
    }

    async function handleDeleteProperty(value){
        setIsDeleteLoading(true)
        setTimeout(async()=>{
            try {
                const response = await coreClient.delete(`/resume/${activeReqId}/delete-property`, { data: value });
                console.log('response data', response.data.data);
                setFormData({ ...formData, ...response.data.data });
                setIsSuccess(true);
                setMessage(response.data.message);
            } catch (err) {
                console.log(err);
                setIsSuccess(false);
                setMessage('an error occured, pls try again');
            }finally{
                setIsDeleteLoading(false)
            }
        },500);
    }

    async function handleSaveImage(payload){
       
        setIsLoading(true);
        setTimeout(async()=>{
            try {
                const response = await coreClient.post(`${resumeId}/send-image`, payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                })
                setFormData({ ...formData, ...response.data.data });
                setIsSuccess(true);
                setMessage(response.data.message);
            } catch (err) {
                console.log(err);
                setIsSuccess(false);
                setMessage('an error occured, pls try again');
            }finally{
                setIsLoading(false);
            }
        },3000);
    }
    

    useEffect(()=>{
        updateUserCredits()
    },[userCredits])


    const handleTabSwitch = (event, newValue) => {
        setTab(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
        };
    };

    const TabPanel = ({ children, value, index, ...other }) => {
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
                {...other}
            >
                {value === index && <>{children}</>}
            </div>
        );
    };

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
    return (
        <div className='mt-[7rem] md:mt-[1.5rem] z-0'>
            <div className='w-11/12 flex items-center justify-between'>
                <span className='bg-[#F5F3FF] text-primary md:px-5 py-1 md:ml-10 rounded-sm mb-5'>
                    { 'Resume-' + formData?.requestId.substring(0,3)}
                </span>
                <aside className='bg-[#F5F3FF] pl-5 py-2 rounded-[0.5rem] text-primary'>
                    remaining credits - <span className='text-body font-bold bg-primary py-3 rounded-r-lg px-2'>{ userCredits }</span> </aside>
            </div>
            <div className='mt-5'>
                <Tabs
                    value={tab}
                    onChange={handleTabSwitch}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    sx={{
                        '& button:hover': {
                            background: '#f6f5ff',
                            borderRadius: '5px 5px 0 0',
                        },
                        '& button.Mui-selected': { color: '#9061f9' },
                    }}
                    TabIndicatorProps={{
                        style: {
                            color: '#9061f9',
                            border: '1px solid #9061f9',
                        },
                    }}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobilescrollButtons="auto"
                >
                    {resumeTabs.map((tab, index) => (
                        <Tab
                            key={index}
                            value={index}
                            label={tab}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
                <div>
                    <TabPanel value={tab} index={0}>
                        <PersonalForm
                            formData={formData}
                            handleSaveToArray={handleSaveToArray}
                            isLoading={isLoading}

                            handleSaveImage={handleSaveImage}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <JobDetailsForm 
                            formData={formData}
                            handleSaveToArray={handleSaveToArray}
                            isLoading={isLoading}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <ResumeSectionList
                            form={formData}
                            formFieldName="workExperience"
                            handleSaveToArray={handleSaveToArray}
                            handleDeleteProperty={handleDeleteProperty}
                            isLoading={isLoading}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={3}>
                        <ResumeSectionList
                            form={formData}
                            formFieldName="education"
                            handleSaveToArray={handleSaveToArray}
                            handleDeleteProperty={handleDeleteProperty}
                            isLoading={isLoading}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={4}>
                        <ResumeSectionList
                            form={formData}
                            formFieldName="projects"
                            handleSaveToArray={handleSaveToArray}
                            handleDeleteProperty={handleDeleteProperty}
                            isLoading={isLoading}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={5}>
                        <SkillsForm
                            formData={formData}
                            handleSaveToArray={handleSaveToArray}
                            handleDeleteProperty={handleDeleteProperty}
                            loader={isLoading}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={6}>
                        <ResumeSectionList 
                            form={formData}
                            formFieldName="certifications"
                            handleSaveToArray={handleSaveToArray}
                            handleDeleteProperty={handleDeleteProperty}
                            isLoading={isLoading}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={7}>
                        <SummaryForm 
                            formData={formData}
                            handleSaveToArray={handleSaveToArray}
                            loader={isLoading}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={8}>
                        <Finalise 
                            data={formData} ref={componentRef}
                        />
                        {/* <DownloadButton
                    componentRef={componentRef}
                    docTitle={`resume_${form.name?.split(' ').join('_')}`}
                /> */}
                    </TabPanel>
                    <TabPanel value={tab} index={9}>
                        <CoverLetter 
                            formData={formData}
                            handleSaveToArray={handleSaveToArray}
                            loader={isLoading}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={10}>
                        <CoverLetter data={formData} ref={componentRef} />
                        {/* <DownloadButton
                    componentRef={componentRef}
                    docTitle={`coverLetter_${form.name?.split(' ').join('_')}`}
                /> */}
                    </TabPanel>
                    {/* <Button type="submit" onClick={handleSubmit}>Update Data</Button> */}
                </div>
            </div>
            <div>
                {/* <OnDemandPlans toggleOnDemandModal={toggleOnDemandModal} onDemandModal={onDemandModal} /> */}
            </div>
            <AlertBox
                isSuccess={isSuccess}
                message={message}
                setIsSuccess={setIsSuccess}
                setMessage={setMessage}
            />
            {isDeleteLoading &&  <DeleteModal/>}
        </div>
    );
};

export default CraftResumeDashBaord;