/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React, { forwardRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserPlanContext } from '../../contexts/UserPlansContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Stack from '@mui/material/Stack';
import { FaLinkedin } from 'react-icons/fa';
import { BsPhoneVibrateFill, BsSend } from 'react-icons/bs';
import { MdLocationOn, MdEmail } from 'react-icons/md';
import { PdfDownloadButton } from '../../components/pdf/PdfDownloadButton';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Image, PDFViewer } from '@react-pdf/renderer';
import { wordFormatter } from '../../utils/wordFormatter';
import { dateFomatted } from '../../utils/dateFomatted';

import emailIcon from '../../assets/png/icon-letter.png';
import phoneIcon from '../../assets/png/icon-phone.png';
import locationIcon from '../../assets/png/icon-location.png';
import linkedinIcon from '../../assets/png/icon-linkedin.png';

// Import the Merriweather font
import MerriweatherRegular from '../../assets/fonts/Merriweather-Regular.ttf';
import MerriweatherItalic from '../../assets/fonts/Merriweather-Italic.ttf';
import MerriweatherBold from '../../assets/fonts/Merriweather-Bold.ttf';
import MerriweatherBoldItalic from '../../assets/fonts/Merriweather-BoldItalic.ttf';
import Resume from './resume/Resume';
import Resume1 from './resume/Resume1';
import Resume2 from './resume/Resume2';
import Resume3 from './resume/Resume3';
import Resume4 from './resume/Resume4';
import Resume5 from './resume/Resume5';
import Resume6 from './resume/Resume6';
import Resume7 from './resume/Resume7';
import Resume8 from './resume/Resume8';
import { templateContext } from '../../contexts/templateContext';
import ResumeDoc1 from './resume/ResumeDoc1';
import ResumeDoc2 from './resume/ResumeDoc2';
import ResumeDoc3 from './resume/ResumeDoc3';
import ResumeDoc4 from './resume/ResumeDoc4';
import ResumeDoc5 from './resume/ResumeDoc5';
import ResumeDoc6 from './resume/ResumeDoc6';
import ResumeDoc7 from './resume/ResumeDoc7';
import ResumeDoc8 from './resume/ResumeDoc8';
import RadialProgress from '../../components/pdf/RadialProgress';
import LangDropdown from '../../components/drop-down/LangDropdown';
import TemplateDropdown from '../../components/drop-down/TemplateDropdown';



const Finalise = forwardRef(({ data }, docReference) => {
    const { template, selectTemplate } = useContext(templateContext);
    const { userPlans } = useUserPlanContext();

    const navigateTo = useNavigate();

    function setActivePlan(userPlans) {
        let hasProPlan = false;
        let hasBasicPlan = false;
      
        for (const plan of userPlans) {
          if (plan.planName === 'Basic On Demand') {
            hasProPlan = true;
            break;
          } else if (plan.planName === 'Basic') {
            hasBasicPlan = true;
          }
        }
      
        if (hasProPlan) {
          return 'Basic On Demand';
        } else if (hasBasicPlan) {
          return 'Basic';
        } else {
          return 'Free';
        }
      }
      
      const activePlan = setActivePlan(userPlans); // Output: Basic On Demand, Basic, or Free based on the conditions



    // data.summary = 'ANY OTHER QUESTION!!!!';
    // Register the fonts with the Font object
    Font.register({
        family: 'Merriweather',
        fonts: [
            { src: MerriweatherRegular },
            { src: MerriweatherItalic, fontStyle: 'italic' },
            { src: MerriweatherBold, fontWeight: 'bold' },
            { src: MerriweatherBoldItalic, fontStyle: 'italic', fontWeight: 'bold' },
        ],
    });

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: 50,

        },
        section: {
            marginBottom: 5,
            borderBottom: '1px solid #CBC7C6',
            paddingBottom: 7,
            color: '#283d56',
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            textTransform: 'capitalize',
            textAlign: 'center',
            marginBottom: 10,
            fontFamily: 'Merriweather'
        },
        subtitle: {
            fontSize: 13,
            fontWeight: 'bold',
            textTransform: 'capitalize',
            textAlign: 'left',
            borderBottom: '1px solid #283d56',
            marginBottom: 8,
            fontFamily: 'Merriweather',
        },
        textHeader: {
            fontWeight: 'bold',
            fontSize: 12,
            marginBottom: 5,
            fontFamily: 'Merriweather',
        },
        textBbody: {
            fontWeight: 'bold',
            fontSize: 10,
            marginBottom: 5,
            fontFamily: 'Merriweather',

        },
        text: {
            fontSize: 10,
            marginBottom: 5,
            fontWeight: 'light',
            fontFamily: 'Merriweather',
            color: '#283d56',

        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },

    });

    const ResumeDoc0 = () => (
        <Document>
            <Page size="A3" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>{data?.name}</Text>
                    {/* {data?.email && (
              <View style={{ flexDirection: 'row', alignItems: 'center',  marginBottom: 10 }}>
                <FiMail style={{ fontSize: 14 }} />
                <Text style={{ fontSize: 12, marginLeft: 5 }}>{data.email}</Text>
              </View>
            )} */}

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>

                        {data?.country && <Image src={locationIcon} alt="" style={{ width: '20px', height: '20px', marginLeft: 3 }} />} {data?.country && <Text style={{ fontSize: 11, marginLeft: 1, fontFamily: 'Times-Roman' }}>{data.city}, {data.country} </Text>}
                        {data?.email && <Image src={emailIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} {data?.email && <Text style={{ fontSize: 11, marginLeft: 1, fontFamily: 'Times-Roman' }}>{data.email} </Text>}
                        {data?.phone && <Image src={phoneIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} {data?.phone && <Text style={{ fontSize: 11, marginLeft: 1, fontFamily: 'Times-Roman' }}>{data.phone} </Text>}
                        {data?.linkedin && <Image src={linkedinIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} {data?.linkedin && <Text style={{ fontSize: 11, marginLeft: 1, fontFamily: 'Times-Roman' }}>{data.linkedin}</Text>}
                    </View>
                    {data?.summary && (
                        <View style={styles.section}>
                            <Text style={{
                                fontSize: 13,
                                fontWeight: 'bold',
                                borderTop: '1px solid #CBC7C6',
                                paddingTop: 6,
                                textTransform: 'capitalize',
                                textAlign: 'left',
                                borderBottom: '1px solid #283d56',
                                marginBottom: 10,
                                fontFamily: 'Merriweather'
                            }}>Summary</Text>
                            <Text style={styles.text}>{data.summary}</Text>
                        </View>
                    )}
                    {data?.workExperience.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.subtitle}>Experience</Text>
                            {data?.workExperience?.map((item, index) => {
                                return (
                                    <View key={index} style={{ marginBottom: 10 }}>
                                        <Text style={styles.textHeader}>
                                        {item?.title !== undefined ? item?.title : '' }
                                        {item.company !== undefined ? ' | ' + item?.company + ' ' : ''}
                                        {item?.location !== undefined ? '| ' + item?.location : ''}
                                        {item?.dateStart !== undefined ? ' | ' + dateFomatted(item?.dateStart) : ''}
                                        {item?.dateEnd !== undefined ? ' - ' + dateFomatted(item?.dateEnd) : ''}
                                        </Text>
                                        {item?.bulletPoints && item?.bulletPoints.map((bulletPoint, index) => (
                                            <Text style={styles.text}>{`${bulletPoint}`}</Text>
                                        ))}
                                    </View>
                                );
                            })}
                        </View>
                    )}
                    {data?.education?.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.subtitle}>Education</Text>
                            {data?.education?.map((education, index) => {
                                return (
                                    <View key={index} style={{ marginBottom: 10 }}>
                                        <Text style={styles.textBbody}>
                                        {education?.degree !== undefined ? education?.degree : ''}
                                        {education?.fieldOfStudy !== undefined ? ' | ' + education?.fieldOfStudy : ''}
                                        {education?.institution !== undefined ? ' | ' + education?.institution : ''}
                                        {education?.location !== undefined ? ' | ' + education?.location : ''}
                                        {education?.country !== undefined ? ' | ' + education?.country : ''}
                                        {education?.year !== undefined ? ' | ' + dateFomatted(education?.year) : ''}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    )}
                    {data?.projects?.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.subtitle}>Projects</Text>
                            {data?.projects?.map((project, index) => {
                                return (
                                    <View key={index} style={{ marginBottom: 10 }}>
                                        <Text style={styles.textBbody}>
                                        {project?.title !== undefined ? project?.title : ''}
                                        {project?.startDate !== undefined ? ' | ' + dateFomatted(project?.startDate) + ' - ' : ''}
                                        {project?.endDate !== undefined ? '  ' + dateFomatted(project?.endDate) : ''}
                                            </Text>
                                    </View>
                                );
                            })}
                        </View>
                    )}
                    {data?.certifications?.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.subtitle}>Certifications</Text>
                            {data?.certifications?.map((certification, index) => {
                                return (
                                    <View key={index} style={{ marginBottom: 10 }}>
                                        <Text style={styles.textBbody}>
                                        {certification?.description !== undefined ? ' | ' + certification?.description : '' }
                                        {certification?.title !== undefined ? certification?.title : ''}
                                        {certification?.link !== undefined ? ' | ' + certification?.link : ''}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    )}
                    {data?.skill?.length > 0 && (
                        <View>
                            <Text style={styles.subtitle}>Skills</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {data?.skill?.map((skill, index)=>(
                                    <Text style={styles.textBbody}>
                                        {index === data?.skill?.length - 1 ? skill.skill + '.' : skill.skill + ', '}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    )}

                </View>
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                />
            </Page>
        </Document>
    )


    const ResumeDoc = () => (
        <>
            {template === 0 ? <ResumeDoc0 data={data} /> : template === 1 ? <ResumeDoc1 data={data} /> : template === 2 ? <ResumeDoc2 data={data} /> : template === 3 ? <ResumeDoc4 data={data} /> : template === 5 ? <ResumeDoc5 data={data} /> : template === 6 ? <ResumeDoc6 data={data} /> : template === 7 ? <ResumeDoc7 data={data} /> : template === 8 ? <ResumeDoc8 data={data} /> : <ResumeDoc3 data={data} />}
        </>
    );


    return (
        <div ref={docReference} className=' bg-white py-5'>
            <div className='flex w-full '>
                <div className=' basis-[75%] w-full'>
                    <div className=' w-full bg-[#F8F9FA] p-3 rounded-xl flex gap-20'>

                        <div>
                        <p>Select a template from the dropdown:</p>
                            <TemplateDropdown />
                        </div>

                        <div>
                        <p>Select a Language from the dropdown:</p>
                            <LangDropdown />
                        </div>

                    </div>
                    <div className=' bg-[#F8F9FA] p-3 rounded-xl mt-10 w-full'>
                        {template === 0 ? <Resume data={data} /> : template === 1 ? <Resume1 data={data} /> : template === 2 ? <Resume2 data={data} /> : template === 3 ? <Resume4 data={data} /> : template === 5 ? <Resume5 data={data} /> : template === 6 ? <Resume6 data={data} /> : template === 7 ? <Resume7 data={data} /> : template === 8 ? <Resume8 data={data} /> : <Resume3 data={data} />}
                    </div>
                </div>
                <div className=' basis-[25%] px-3'>
                    <div className=' flex gap-3 justify-center items-center rounded-xl bg-[#F4F4F6] py-3.5 px-2.5'>
                        <PDFDownloadLink document={ResumeDoc()} fileName={`${data?.name}-resume.pdf`} className='' style={{ textDecoration: 'none' }}>
                            {({ loading }) =>
                                loading ? 'Loading document...' : <PdfDownloadButton />
                            }
                        </PDFDownloadLink>
                        <button className=' bg-white flex gap-1 justify-center items-center rounded-xl py-3 px-3 text-[14px]'> <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.58227 9.23762L9.26727 6.54512M4.54977 3.74012L10.9173 1.61762C13.7748 0.665116 15.3273 2.22512 14.3823 5.08262L12.2598 11.4501C10.8348 15.7326 8.49477 15.7326 7.06977 11.4501L6.43977 9.56012L4.54977 8.93012C0.267266 7.50512 0.267266 5.17262 4.54977 3.74012Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        </span> Share</button>
                    </div>
                    <div className=' border border-gray-300 rounded-lg mt-12 py-6 px-3 relative'>
                        {/* <h3 className=' font-normal'>Relevancy score</h3> */}
                        <p className=' mt-4 text-xsm'>Excellent! You now have a resume that contains most of the keywords and technical skills that we found in the job description.</p>
                        {/* <div className=' w-full flex justify-center mt-12'>
                            <RadialProgress percent={data?.resumeScore} />
                        </div> */}
                        <div className=' mt-10'>
                            {/* <p>untitled Resume 01</p> */}
                            <div className=' mt-8 flex justify-center items-center rounded-xl bg-[#F4F4F6] p-5'>
                                <ul className=' flex flex-col gap-5 w-full'>
                                    <li className=' bg-white px-5 py-2 flex items-center gap-3 rounded-xl'>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.99967 0.333984C3.31967 0.333984 0.333008 3.32065 0.333008 7.00065C0.333008 10.6807 3.31967 13.6673 6.99967 13.6673C10.6797 13.6673 13.6663 10.6807 13.6663 7.00065C13.6663 3.32065 10.6797 0.333984 6.99967 0.333984ZM6.99967 12.334C4.05967 12.334 1.66634 9.94065 1.66634 7.00065C1.66634 4.06065 4.05967 1.66732 6.99967 1.66732C9.93967 1.66732 12.333 4.06065 12.333 7.00065C12.333 9.94065 9.93967 12.334 6.99967 12.334ZM9.58634 4.52732L5.66634 8.44732L4.41301 7.19398C4.15301 6.93398 3.73301 6.93398 3.47301 7.19398C3.21301 7.45398 3.21301 7.87398 3.47301 8.13398L5.19967 9.86065C5.45967 10.1207 5.87967 10.1207 6.13967 9.86065L10.533 5.46732C10.793 5.20732 10.793 4.78732 10.533 4.52732C10.273 4.26732 9.84634 4.26732 9.58634 4.52732Z" fill="#7E3AF2" />
                                        </svg>
                                        <p>Keyword matched</p>
                                    </li>
                                    <li className=' bg-white px-5 py-2 flex items-center gap-3 rounded-xl'>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.99967 0.333984C3.31967 0.333984 0.333008 3.32065 0.333008 7.00065C0.333008 10.6807 3.31967 13.6673 6.99967 13.6673C10.6797 13.6673 13.6663 10.6807 13.6663 7.00065C13.6663 3.32065 10.6797 0.333984 6.99967 0.333984ZM6.99967 12.334C4.05967 12.334 1.66634 9.94065 1.66634 7.00065C1.66634 4.06065 4.05967 1.66732 6.99967 1.66732C9.93967 1.66732 12.333 4.06065 12.333 7.00065C12.333 9.94065 9.93967 12.334 6.99967 12.334ZM9.58634 4.52732L5.66634 8.44732L4.41301 7.19398C4.15301 6.93398 3.73301 6.93398 3.47301 7.19398C3.21301 7.45398 3.21301 7.87398 3.47301 8.13398L5.19967 9.86065C5.45967 10.1207 5.87967 10.1207 6.13967 9.86065L10.533 5.46732C10.793 5.20732 10.793 4.78732 10.533 4.52732C10.273 4.26732 9.84634 4.26732 9.58634 4.52732Z" fill="#7E3AF2" />
                                        </svg>
                                        <p>Job description matched</p>
                                    </li>
                                    <li className=' bg-white px-5 py-2 flex items-center gap-3 rounded-xl'>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.99967 0.333984C3.31967 0.333984 0.333008 3.32065 0.333008 7.00065C0.333008 10.6807 3.31967 13.6673 6.99967 13.6673C10.6797 13.6673 13.6663 10.6807 13.6663 7.00065C13.6663 3.32065 10.6797 0.333984 6.99967 0.333984ZM6.99967 12.334C4.05967 12.334 1.66634 9.94065 1.66634 7.00065C1.66634 4.06065 4.05967 1.66732 6.99967 1.66732C9.93967 1.66732 12.333 4.06065 12.333 7.00065C12.333 9.94065 9.93967 12.334 6.99967 12.334ZM9.58634 4.52732L5.66634 8.44732L4.41301 7.19398C4.15301 6.93398 3.73301 6.93398 3.47301 7.19398C3.21301 7.45398 3.21301 7.87398 3.47301 8.13398L5.19967 9.86065C5.45967 10.1207 5.87967 10.1207 6.13967 9.86065L10.533 5.46732C10.793 5.20732 10.793 4.78732 10.533 4.52732C10.273 4.26732 9.84634 4.26732 9.58634 4.52732Z" fill="#7E3AF2" />
                                        </svg>
                                        <p>Target matched</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* { activePlan === 'Free' && (
                            <div
                                className="absolute inset-0 bg-primary/90
                                flex items-center justify-center transition duration-300
                                opacity-0 hover:opacity-100"
                            >
                                <div className="text-center">
                                    <h1 className='text-body text-lg font-bold'>Oops!</h1>
                                    <h3 className='text-body text-sm px-3'>You need to buy a plan to access this service</h3>
                                    <button onClick={()=>navigateTo('/resumai/profile')} className='w-3/4 bg-lavender px-10 py-3 rounded-[0.5rem] text-primary font-bold mt-4'>Buy a Plan</button>
                                </div>
                            </div>
                        )} */}

                    </div>
                </div>
            </div>
        </div>
    );
});

export default Finalise;
