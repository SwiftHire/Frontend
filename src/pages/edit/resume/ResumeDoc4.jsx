import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, Image, PDFViewer } from '@react-pdf/renderer';
import Inter from '../../../assets/fonts/Inter.ttf';
import InterMedium from '../../../assets/fonts/Inter-Medium.otf';
import telephone from '../../../assets/png/phone-call.png';
import maps from '../../../assets/png/location.png';
import email from '../../../assets/png/email.png';
import userIcon from '../../../assets/png/user-icon.png';

const ResumeDoc4 = ({ data }) => {

    const dateFomatted = (date) => {
        // let year = date.slice(0, 4);
        // let month = date.slice(5, 7)
        // return `${month}/${year}`

        let year = "";
        let month = "";
        if (date ==='' || date === undefined) {
          return '';
        }else{
            year = date.slice(0, 4);
            month = date.slice(5, 7);
            return `${month}/${year}`
        }
    }


    // Font.register({
    //     family: 'Rubik',
    //     fonts: [
    //         { src: RubikBold, fontWeight: 'bold' },
    //         { src: Rubik, fontWeight: 'normal' }
    //     ],
    // });

    Font.register({
        family: 'Inter',
        fonts: [
            { src: Inter, fontWeight: 'normal' },
            { src: InterMedium, fontWeight: 'medium' },
        ],
    });

    // SVGs
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>


    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: 50,
            fontFamily: 'Inter',
        },
        topContainer: {
            color: 'white',
            paddingBottom: 23,
        },
        botContainer: {
            display: 'flex',
            flexDirection: 'row',
        },
        rightContainer: {
            flexBasis: 66.6666666667 + '%',
            paddingLeft: 25
        },
        leftContainer: {
            flexBasis: 33.3333333333 + '%',
        },
        leftInnerContainer: {
            paddingRight: 8
        },
        topSection: {
            width: 100 + '%',
            marginLeft: 211
        },
        contentSection: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        topContentSection: {

            display: 'flex',
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
        },
        leftInnerSection: {
            marginTop: 49
        },
        title: {
            fontSize: 45,
            textTransform: 'uppercase',
            fontWeight: 'medium',
        },
        subtitle: {
            fontSize: 17,
            fontWeight: 'medium',
        },
        rightSection: {
            marginTop: 31
        },
        infoSection: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10
        },
        list: {
            marginTop: 13,
            display: 'flex',
            flexDirection: 'row',
            gap: 8
        },
        image: {
            top: 70,
            left: 45,
            width: 151,
            height: 188,
            objectFit: 'cover',
            objectPosition: 'top',
            overflow: 'visible',
            position: 'absolute'
        },
        icons: {
            width: 14,
            height: 14,
            objectFit: 'contain'
        },
        textBbody: {
            fontSize: 11.5
        },
        heading: {
            fontSize: 14.5,
            fontWeight: 'medium',
        },
        subHeading: {
            fontSize: 13.5,
            fontWeight: 'medium',
        },
        text: {
            fontSize: 12,
            fontWeight: 'normal',
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

    // const Doc = () => (
    //     <Document>
    //         <Page size="A3" style={styles.page}>
    //             <View fixed style={{ position: 'absolute', width: 280, top: 0, left: 0, bottom: 0, backgroundColor: '#e0e5ea' }}></View>
    //             <View style={{ position: 'absolute', backgroundColor: '#1d2e3c', width: window.innerWidth, height: 150, top: 0 }}></View>

    //             <View style={styles.topContainer} className=' relative bg-[#1d2e3c] text-white pt-[55px] pb-[30px] px-[50px] flex gap-20'>
    //                 <View style={styles.topSection} className=' w-full ml-[280px]'>
    //                     <Text style={styles.title} className=' text-[55px] uppercase font-medium'>{data?.name}</Text>
    //                     <Text style={[styles.subtitle, { textTransform: 'uppercase    ' }]} className=' text-[22px] uppercase font-bold'>{data.position}</Text>
    //                 </View>
    //             </View>
    //             <View style={styles.botContainer} className=' flex'>
    //                 <View style={styles.leftContainer} className=' basis-4/12 bg-[#e0e5ea]'>

    //                     <View style={styles.leftInnerContainer} className=' px-[20px] pb-[40px]'>

    //                         <View style={{ marginTop: 180 }} className=' mt-44'>
    //                             <Text style={styles.subtitle} className='text-[22px] uppercase font-bold'>CONTACT DETAILS</Text>
    //                             <View style={{ marginTop: 13 }} className=' mt-4'>

    //                                 <View style={styles.infoSection} className=' flex gap-5 mt-3'>
    //                                     <Image style={styles.icons} src={email} />
    //                                     <Text style={styles.text}>{data.email}</Text>
    //                                 </View>
    //                                 <View style={[styles.infoSection, { marginTop: 8 }]} className=' flex gap-5 mt-3'>
    //                                     <Image style={styles.icons} src={maps} />
    //                                     <Text style={styles.text}>{data.address}</Text>
    //                                 </View>
    //                                 <View style={[styles.infoSection, { marginTop: 8 }]} className=' flex gap-5'>
    //                                     <Image style={styles.icons} src={telephone} />
    //                                     <Text style={styles.text}>{data.phone}</Text>
    //                                 </View>

    //                             </View>
    //                         </View>

    //                         <View style={styles.leftInnerSection} className=' mt-16'>
    //                             <Text style={styles.subtitle} className=' text-[22px] uppercase font-bold'>SKILLS</Text>

    //                             <View className=' mt-4 list-disc list-inside'>
    //                                 {data.skills.map(skill => (
    //                                     <View style={styles.list} className=' mt-4 list-disc list-inside'>
    //                                         <Text style={[styles.text, { marginTop: 13 }]} className=' font-light mt-4'>•</Text>
    //                                         <Text style={[styles.text, { marginTop: 13 }]} className=' font-light mt-4'>{skill}</Text>
    //                                     </View>
    //                                 ))}
    //                             </View>
    //                         </View>

    //                         <View style={styles.leftInnerSection} className=' mt-16'>
    //                             <Text className=' text-[22px] uppercase font-bold'>HOBBIES</Text>
    //                             <View>
    //                                 {data.skills.map(skill => (
    //                                     <View style={styles.list} className=' mt-4 list-disc list-inside'>
    //                                         <Text style={[styles.text, { marginTop: 13 }]} className=' font-light mt-4'>•</Text>
    //                                         <Text style={[styles.text, { marginTop: 13 }]} className=' font-light mt-4'>{skill}</Text>
    //                                     </View>
    //                                 ))}
    //                             </View>
    //                         </View>
    //                     </View>

    //                 </View>


    //                 <View style={styles.rightContainer} className=' basis-4/6 px-[50px]'>

    //                     <View style={styles.rightSection} className=' mt-10'>
    //                         <Text style={styles.heading} className=' text-[18px] font-bold'>PROFESSIONAL PROFILE</Text>
    //                         <Text style={[styles.text, { marginTop: 13 }]} className=' mt-4'>{data.summary}</Text>
    //                     </View>

    //                     <View style={styles.rightSection} className=' mt-10'>
    //                         <Text style={styles.heading} className=' text-[18px] font-bold'>PROFESSIONAL CAREER</Text>
    //                         {data.workExperience.map(experience => (
    //                             <View style={{ marginTop: 25 }} className=' mt-4'>
    //                                 <View style={styles.topContentSection} className=' flex items-center gap-5'>
    //                                     <Text style={styles.subHeading} className=' text-[17px] font-bold '>{experience.title}</Text>
    //                                     <Text style={styles.text}>{`${experience.dateStart} - ${experience.dateEnd}`}</Text>
    //                                 </View>
    //                                 <View style={[styles.topContentSection, { marginTop: 8 }]} className=' flex items-center gap-5'>
    //                                     <Text style={styles.subHeading} className=' text-[17px] font-bold mt-1'>{experience.company}</Text>
    //                                     <Text style={styles.text} className=' mt-1'>{experience.location}</Text>
    //                                 </View>
    //                                 <View style={{ marginTop: 13 }} className=' mt-4'>
    //                                     <View>
    //                                         {experience.bulletPoints.map(points => (
    //                                             <View style={{
    //                                                 marginTop: 8,
    //                                                 display: 'flex',
    //                                                 flexDirection: 'row',
    //                                                 gap: 8
    //                                             }} className=' mt-4 list-disc list-inside'>
    //                                                 <Text style={styles.text} className=' font-light mt-4'>•</Text>
    //                                                 <Text style={styles.text} className=' font-light mt-4'>{points}</Text>
    //                                             </View>
    //                                         ))}
    //                                     </View>
    //                                 </View>
    //                             </View>
    //                         ))}
    //                     </View>

    //                     <View style={styles.rightSection} className=' mt-10'>
    //                         <Text style={styles.heading} className=' text-[18px] font-bold'>EDUCATION</Text>
    //                         {data.education.map(edu => (
    //                             <View style={{ marginTop: 25 }} className=' mt-4'>
    //                                 <View style={styles.contentSection} className=' flex justify-between'>
    //                                     <View className=''>
    //                                         <Text style={styles.subHeading} className=' text-[17px] font-bold'>{`${edu.fieldOfStudy}, ${edu.degree}`}</Text>
    //                                         <Text style={[styles.text, { marginTop: 8 }]} className='mt-1'>{`${edu.institution}, ${edu.location}`}</Text>
    //                                     </View>
    //                                     <View className=''>
    //                                         <Text style={styles.text}>{edu.year}</Text>
    //                                         <Text style={[styles.text, { marginTop: 8 }]} className=' mt-1'>{edu.location}</Text>
    //                                     </View>
    //                                 </View>
    //                             </View>
    //                         ))}
    //                     </View>

    //                 </View>
    //             </View>
    //             <Image style={styles.image} className=' absolute top-20 w-[200px] h-[250px] object-cover object-top' src="https://images.unsplash.com/photo-1584940120743-8981ca35b012?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" />


    //             <Text
    //                 style={styles.pageNumber}
    //                 render={({ pageNumber, totalPages }) =>
    //                     `${pageNumber} / ${totalPages}`
    //                 }
    //             />
    //         </Page>
    //     </Document>
    // )

    return (
        // <PDFViewer className=' w-full h-[856px]'>

            <Document>
                <Page size="A3" style={styles.page}>
                    <View fixed style={{ position: 'absolute', width: 280, top: 0, left: 0, bottom: 0, backgroundColor: '#e0e5ea' }}></View>
                    <View style={{ position: 'absolute', backgroundColor: '#1d2e3c', width: window.innerWidth, height: 150, top: 0 }}></View>

                    <View style={styles.topContainer} className=' relative bg-[#1d2e3c] text-white pt-[55px] pb-[30px] px-[50px] flex gap-20'>
                        <View style={styles.topSection} className=' w-full ml-[280px]'>
                            <Text style={styles.title} className=' text-[55px] uppercase font-medium'>{data?.name}</Text>
                            {data?.position && (<Text style={[styles.subtitle, { textTransform: 'uppercase' }]} className=' text-[22px] uppercase font-bold'>{data.position}</Text>)}
                        </View>
                    </View>
                    <View style={styles.botContainer} className=' flex'>
                        <View style={styles.leftContainer} className=' basis-4/12 bg-[#e0e5ea]'>

                            <View style={styles.leftInnerContainer} className=' px-[20px] pb-[40px]'>

                                <View style={{ marginTop: 180 }} className=' mt-44'>
                                    <Text style={styles.subtitle} className='text-[22px] uppercase font-bold'>CONTACT DETAILS</Text>
                                    <View style={{ marginTop: 13 }} className=' mt-4'>

                                        {data?.email && (<View style={styles.infoSection} className=' flex gap-5 mt-3'>
                                            <Image style={styles.icons} src={email} />
                                            <Text style={styles.text}>{data.email}</Text>
                                        </View>)}
                                        {data?.address && (<View style={[styles.infoSection, { marginTop: 8 }]} className=' flex gap-5 mt-3'>
                                            <Image style={styles.icons} src={maps} />
                                            <Text style={styles.text}>{data.address}</Text>
                                        </View>)}
                                        {data?.phone && (<View style={[styles.infoSection, { marginTop: 8 }]} className=' flex gap-5'>
                                            <Image style={styles.icons} src={telephone} />
                                            <Text style={styles.text}>{data.phone}</Text>
                                        </View>)}

                                    </View>
                                </View>

                                {data?.skill?.length > 0 && (<View style={styles.leftInnerSection} className=' mt-16'>
                                    <Text style={styles.subtitle} className=' text-[22px] uppercase font-bold'>SKILLS</Text>

                                    <View className=' mt-4 list-disc list-inside'>
                                        {data?.skill?.map(skill => (
                                            <View style={styles.list} className=' mt-4 list-disc list-inside'>
                                                <Text style={[styles.text, { marginTop: 13 }]} className=' font-light mt-4'>•</Text>
                                                <Text style={[styles.text, { marginTop: 13 }]} className=' font-light mt-4'>{skill.skill}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>)}
                            </View>

                        </View>


                        <View style={styles.rightContainer} className=' basis-4/6 px-[50px]'>

                            {data?.summary && (<View style={styles.rightSection} className=' mt-10'>
                                <Text style={styles.heading} className=' text-[18px] font-bold'>PROFESSIONAL PROFILE</Text>
                                <Text style={[styles.text, { marginTop: 13 }]} className=' mt-4'>{data.summary}</Text>
                            </View>)}

                            {data?.workExperience?.length > 0 && (<View style={styles.rightSection} className=' mt-10'>
                                <Text style={styles.heading} className=' text-[18px] font-bold'>PROFESSIONAL CAREER</Text>
                                {data.workExperience.map(experience => (
                                    <View style={{ marginTop: 25 }} className=' mt-4'>
                                        <View style={styles.topContentSection} className=' flex items-center gap-5'>
                                            <Text style={styles.subHeading} className=' text-[17px] font-bold '>{experience.title}</Text>
                                            <Text style={styles.text}>{`${experience.dateStart} - ${experience.dateEnd}`}</Text>
                                        </View>
                                        <View style={[styles.topContentSection, { marginTop: 8 }]} className=' flex items-center gap-5'>
                                            <Text style={styles.subHeading} className=' text-[17px] font-bold mt-1'>{experience.company}</Text>
                                            <Text style={styles.text} className=' mt-1'>{experience.location}</Text>
                                        </View>
                                        <View style={{ marginTop: 13 }} className=' mt-4'>
                                            <View>
                                                {experience.bulletPoints.map(points => (
                                                    <View style={{
                                                        marginTop: 8,
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 8
                                                    }} className=' mt-4 list-disc list-inside'>
                                                        {/* <Text style={styles.text} className=' font-light mt-4'>•</Text> */}
                                                        <Text style={styles.text} className=' font-light mt-4'>{points}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>)}

                            {data?.education?.length > 0 && (<View style={styles.rightSection} className=' mt-10'>
                                <Text style={styles.heading} className=' text-[18px] font-bold'>EDUCATION</Text>
                                {data.education.map(edu => (
                                    <View style={{ marginTop: 25 }} className=' mt-4'>
                                        <View style={styles.contentSection} className=' flex justify-between'>
                                            <View className=''>
                                                <Text style={styles.subHeading} className=' text-[17px] font-bold'>
                                                    {/* {`${edu.fieldOfStudy}, ${edu.degree}`} */}
                                                    {edu.fieldOfStudy !==undefined ? edu.fieldOfStudy + ', ' : ''}
                                                    {edu.degree !==undefined ? edu.degree : ''}
                                                </Text>
                                                <Text style={[styles.text, { marginTop: 8 }]} className='mt-1'>
                                                {`${edu.institution !== undefined ? edu.institution :''} 
                                                    ${edu.location !==undefined ? ',' + edu.location : ''}`}
                                                </Text>
                                            </View>
                                            <View className=''>
                                                <Text style={styles.text}>{edu.year}</Text>
                                                <Text style={[styles.text, { marginTop: 8 }]} className=' mt-1'>{edu.location}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>)}

                            {data?.projects?.length > 0 && (<View style={styles.rightSection} className=' mt-10'>
                                <Text style={styles.heading} className=' text-[18px] font-bold'>PROJECTS</Text>
                                {data.projects.map(project => (
                                    <View style={{ marginTop: 25 }} className=' mt-4'>
                                        <View style={styles.topContentSection} className=' flex items-center gap-5'>
                                            <Text style={styles.subHeading} className=' text-[17px] font-bold '>{project.title}</Text>
                                            <Text style={styles.text}>{`${dateFomatted(project.startDate)} - ${dateFomatted(project.endDate)}`}</Text>
                                        </View>
                                        <View style={{ marginTop: 13 }} className=' mt-4'>
                                            <Text style={[styles.text, { marginTop: 10 }]} className=' font-light mt-4'>{project.description}.</Text>
                                        </View>
                                        <View style={{ marginTop: 13 }} className=' mt-4'>
                                            <Text style={styles.subHeading} className=' font-light mt-4'>Link</Text>
                                            <Text style={[styles.text, { marginTop: 10 }]}>{project.link}</Text>
                                        </View>
                                        <View style={{ marginTop: 13 }} className=' mt-4'>
                                            <Text style={styles.subHeading} className=' font-light mt-4'>Technologies</Text>
                                            <View>
                                                {project.technologies.map(tech => (
                                                    <View style={{
                                                        marginTop: 8,
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 8
                                                    }} className=' mt-4 list-disc list-inside'>
                                                        <Text style={styles.text} className=' font-light mt-4'>•</Text>
                                                        <Text style={styles.text} className=' font-light mt-4'>{tech}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>)}
                             

                            {data?.certifications?.length > 0 && (<View style={styles.rightSection} className=' mt-10'>
                                <Text style={styles.heading} className=' text-[18px] font-bold'>CERTIFICATIONS</Text>
                                {data.certifications.map(certificate => (
                                    <View style={{ marginTop: 25 }} className=' mt-4'>
                                        <View style={styles.topContentSection} className=' flex items-center gap-5'>
                                            <Text style={styles.subHeading} className=' text-[17px] font-bold '>{certificate.title}</Text>
                                            <Text style={styles.text}>{`${dateFomatted(certificate.startDate)} - ${dateFomatted(certificate.endDate)}`}</Text>
                                        </View>
                                        <View style={{ marginTop: 13 }} className=' mt-4'>
                                            <Text style={[styles.text, { marginTop: 10 }]} className=' font-light mt-4'>{certificate.description}.</Text>
                                        </View>
                                        <View style={{ marginTop: 13 }} className=' mt-4'>
                                            <Text style={styles.subHeading} className=' font-light mt-4'>Link</Text>
                                            <Text style={[styles.text, { marginTop: 10 }]}>{certificate.link}</Text>
                                        </View>
                                        <View style={{ marginTop: 13 }} className=' mt-4'>
                                            <Text style={styles.subHeading} className=' font-light mt-4'>Technologies</Text>
                                            <View>
                                                {certificate.technologies.map(tech => (
                                                    <View style={{
                                                        marginTop: 8,
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: 8
                                                    }} className=' mt-4 list-disc list-inside'>
                                                        <Text style={styles.text} className=' font-light mt-4'>•</Text>
                                                        <Text style={styles.text} className=' font-light mt-4'>{tech}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>)}

                        </View>
                    </View>
                     {data?.imageUrl ? <Image 
                        style={styles.image}
                        className='absolute top-20 w-[200px] h-[250px] object-cover object-top'
                        src={{ uri: data?.imageUrl, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }}
                        />
                        : <Image 
                        style={styles.image}
                        className='absolute top-20 w-[200px] h-[250px] object-cover object-top'
                        src={userIcon}
                        />
                     }
                    <Text
                        style={styles.pageNumber}
                        render={({ pageNumber, totalPages }) =>
                            `${pageNumber} / ${totalPages}`
                        }
                    />
                </Page>
            </Document>

        // </PDFViewer>
    )
}

export default ResumeDoc4