import React, { useState } from 'react';
import { useGenerateData } from '../../hooks/useGenerateData';

import { GenerateDataActions } from '../../components/generate/GenerateDataActions';
import Button from '../../components/button/Button';
import { GenerateLoadingIcon } from '../../components/generate/GenerateDataStyled';

import { PdfDownloadButton } from '../../components/pdf/PdfDownloadButton';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font} from '@react-pdf/renderer';
import MerriweatherRegular from '../../assets/fonts/Merriweather-Regular.ttf';
import MerriweatherItalic from '../../assets/fonts/Merriweather-Italic.ttf';
import MerriweatherBold from '../../assets/fonts/Merriweather-Bold.ttf';
import MerriweatherBoldItalic from '../../assets/fonts/Merriweather-BoldItalic.ttf';
import { BsSend } from 'react-icons/bs';

import { JobDetailsForm, PersonalForm } from './';
const CoverLetter = ({ formData, handleSaveToArray, loader }) => {

    const { coverLetter, position, jobDescription, language, name, email, requestId, address, phone } = formData || {};
    const coverFormatted = `${name}, ${address} ${phone} ${email} ${coverLetter} ${name}`

    const [coverLetterForm, setCoverLetterForm] = useState(Object.assign({}, { coverLetter }));
    const { generateNewdata, loading } = useGenerateData();


    const handleChange = (event) => {
        const { name, value: val } = event.target;
        setCoverLetterForm({ ...coverLetterForm, [name]: val });
    };

    const generatePayload = {
        type: 'coverLetter',
        position,
        name,
        email,
        language,
        requestId,
        jobDescription
    };

    function createTextContent(generatedData) {
        setCoverLetterForm({ ...coverLetter, coverLetter: generatedData });
    }

    function handleCreate() {
        generateNewdata(generatePayload, createTextContent);
    }

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
            paddingBottom: 7,
            color: '#283d56',
            lineHeight: 3,
            fontWeight: "light"
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
            fontWeight: 'normal',
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

    const CoverLetterDoc = () => (
        <Document>
            <Page size="A3" style={styles.page}>
                <View style={styles.section}>
                    <View style={styles.textHeader}>
                        <Text>{name}</Text>
                        <Text>{address}</Text>
                        <Text>{phone}</Text>
                        <Text>{email}</Text>
                    </View>
                    <View style={styles.textBbody}>
                    <Text style={{marginVertical:10}}>{coverLetter}</Text>
                    {/* <Text style={styles.textHeader}>{name}</Text> */}
                    </View>
                </View>
            </Page>
        </Document>
    )

    if((jobDescription==='' && position==='') 
    || (jobDescription === undefined && position===undefined)){
        return <>
            <div className='w-full h-screen  absolute top-0 left-0 bg-body/90'>
                <div className='h-full w-10/12 m-auto py-3 flex flex-col items-center justify-center'>
                    <div className='w-6/12 text-left'>
                    <h1 className='text-[0.9rem] lg:text-[2rem] text-primary font-bold capitalize'>Unlock the Perfect Resume with SwiftHire! 🚀</h1>
                        <p className='text-sm'>Simply provide your desired position and job description, and let our powerful AI create an eye-catching, professional resume and cover letter tailored just for you!🌟📄💼</p>
                    </div>
                <JobDetailsForm formData={formData} handleSaveToArray={handleSaveToArray} isLoading={loader}/>
                </div>
            </div>
        </>
    }

    if((name==='' && email==='') || (name === undefined && email===undefined)){
        return <>
            <div className='w-full h-screen  absolute top-0 left-0 bg-body/90'>
                <div className='h-full w-8/12 m-auto py-3 flex flex-col items-center justify-center'>
                    <div className='w-9/12 text-left'>
                    <h1 className='text-[0.9rem] lg:text-[2rem] text-primary font-bold capitalize'>Looks like your the personal information form is empty! 🚀</h1>
                        <p className='text-sm'>Kindly complete the contact form, and let our powerful AI create an eye-catching, professional resume and cover letter tailored just for you!🌟📄💼</p>
                    </div>
                <PersonalForm formData={formData} handleSaveToArray={handleSaveToArray} isLoading={loader}/>
                </div>
            </div>
        </>
    }

    return (
        <>
            <div className='w-full mt-5 shadow-secondary px-5 py-5'>
                <div className="w-full grid grid-cols-1 relative my-1">
                    <div className=''>
                        {/* <label htmlFor='jobDescription' className="text-sm font-normal mb-2 ml-1">Job Description</label> */}
                        <div className='mb-3'>
                            <GenerateDataActions
                                loading={loading}
                                handleCreate={handleCreate}
                            />
                        </div>
                    </div>
                    <div className=' grid grid-cols-3 w-full'>
                        <div className=' col-span-2 shadow-secondary p-7'>
                            <textarea
                                rows={12}
                                name="coverLetter"
                                maxLength='1000'
                                value={coverLetterForm.coverLetter}
                                onChange={handleChange}
                                placeholder="edit your coverLetter"
                                className='text-placeholder leading-8 font-light py-2 px-2 
                        outline-0 rounded-[8px] border border-[#E4E6F1] pl-4 w-full' />
                            <Button onClick={() => handleSaveToArray(coverLetterForm)}>
                                {loader ? 'Saving' : 'Save to Cover Letter'} {loader && <GenerateLoadingIcon />}</Button>
                                {/* <PDFViewer className=' w-full h-[700px]'>
                                    <CoverLetterDoc />
                                </PDFViewer> */}
                        </div>
                        <div className=' col-span-1 px-5'>
                            <div className=' flex gap-3 rounded bg-[#F4F4F6] p-3'>
                                <PDFDownloadLink document={<CoverLetterDoc />} fileName={`${name}-cover-letter.pdf`} style={{ textDecoration: 'none' }}>
                                    {({ loading }) =>
                                        loading ? 'Loading document...' : <PdfDownloadButton />
                                    }
                                </PDFDownloadLink>
                                <button className=' bg-white flex gap-1 items-center rounded-md px-3'> <BsSend /> Share</button>
                            </div>
                            <div className=' border border-gray-300 rounded-lg mt-8 py-6 px-3'>
                                <h3 className=' font-normal'>AI cover letter</h3>
                                <p className=' mt-4 text-xsm'>Excellent! <span className=' font-normal'>SwiftHire</span> has crafted for you a cover letter with most of the keywords and technical skills that we found in the job description.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoverLetter;