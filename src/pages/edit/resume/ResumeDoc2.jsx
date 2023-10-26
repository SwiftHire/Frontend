import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const ResumeDoc = ({ data }) => {

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: 70,
            fontFamily: 'Times-Roman',
        },
        headSection: {
            paddingBottom: 30
        },
        container: {
            width: 100 + '%',
            display: 'flex',
            flexDirection: 'row',
        },
        leftContainer: {
            flexBasis: 70 + '%',
            paddingRight: 36,
        },
        rightContainer: {
            flexBasis: 30 + '%',
            paddingLeft: 36,
        },
        title: {
            fontFamily: 'Times-Bold',
            fontSize: 45,
            textTransform: 'capitalize',
            lineHeight: 1.25
        },
        subtitle: {
            fontSize: 13.5,
            fontWeight: 'normal',
            color: 'grey',
        },
        topSection: {
            paddingVertical: 18
        },
        botSection: {
            paddingTop: 18
        },
        innerSection: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 4
        },
        textBbody: {
            fontWeight: 'normal',
            fontSize: 10.5,
            marginBottom: 5,
            color: 'grey',
        },
        heading: {
            fontSize: 17,
            fontFamily: 'Times-Bold',
        },
        subHeading: {
            fontSize: 14.5,
            fontFamily: 'Times-Bold',
        },
        text: {
            fontSize: 13.5,
            fontWeight: 'normal',
            color: 'grey',
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

    const dateFomatted = (date) => {
        let year = "";
        let month = "";
        if (date ==='' || date === undefined) {
          return '';
        }else{
            year = date.slice(0, 4);
            month = date.slice(5, 7);
        }
        if (month === '01') {
          month = 'Jan';
        } else if (month === '02') {
          month = 'Feb';
        } else if (month === '03') {
          month = 'Mar';
        } else if (month === '04') {
          month = 'Apr';
        } else if (month === '05') {
          month = 'May';
        } else if (month === '06') {
          month = 'Jun';
        } else if (month === '07') {
          month = 'Jul';
        } else if (month === '08') {
          month = 'Aug';
        } else if (month === '09') {
          month = 'Sep';
        } else if (month === '10') {
          month = 'Oct';
        } else if (month === '11') {
          month = 'Nov';
        } else if (month === '12') {
          month = 'Dec';
        }
        return `${month} ${year}`;
      };
      

    return (
        // <PDFViewer className=' w-full h-[846px]'>
        <Document>
            <Page size="A3" style={styles.page}>
                <View fixed style={{ position: 'absolute', width: 280, top: 0, right: 0, bottom: 0, borderLeft: 1, borderLeftColor: '#E5E7EB' }}></View>
                <View style={{ position: 'absolute', borderBottom: 1, borderBottomColor: '#E5E7EB', width: window.innerWidth, height: 160, top: 0, backgroundColor: 'white' }}></View>
                <View style={styles.headSection} className=' px-[60px] pt-[50px] border-b-[1px] border-gray-200 pb-8'>
                    {data?.position && (<Text style={styles.subtitle} className=' text-gray-400 text-sm'>{data.position}</Text>)}
                    <Text style={styles.title} className=' text-[60px] leading-tight font-bold'>{data?.name}</Text>
                </View>
                <View style={styles.container} className=' w-full grid grid-cols-3 px-[60px]'>
                    <View style={styles.leftContainer} className=' col-span-2 pr-12 pb-[50px]'>
                        {data?.summary && (<View style={styles.topSection} className=' py-6'>
                            <Text style={styles.heading} className=' text-[20px] font-bold'>Profile</Text>
                            <Text style={[styles.text, { marginTop: 15 }]} className=' mt-4 text-gray-600'>{data.summary}</Text>
                        </View>)}

                        {data?.education?.length > 0 && (<View style={styles.topSection} className=' py-6'>
                            <Text style={styles.heading} className=' text-[20px] font-bold'>Education</Text>
                            {data.education?.map(edu => (
                                <View style={{ marginTop: 18 }} className=' mt-4'>
                                    <View style={styles.innerSection} className=' flex items-center justify-between'>
                                        <Text style={styles.subHeading} className=' font-bold text-sm'>{edu.institution}</Text>
                                        <Text style={styles.text} className=' text-gray-600'>{edu.year}</Text>
                                    </View>
                                    <Text style={[styles.text, { marginTop: 13 }]} className=' text-gray-600 mt-2'>
                                    {edu.fieldOfStudy}
                                        </Text>
                                </View>
                            ))}
                        </View>)}

                        {data?.workExperience?.length > 0 && (<View style={styles.botSection} className=' pt-6'>
                            <Text style={styles.heading} className=' text-[20px] font-bold'>Employment</Text>
                            {data.workExperience.map(experience => (
                                <View style={{ marginTop: 18 }} className=' mt-4'>
                                    <View style={styles.innerSection} className=' flex items-center justify-between'>
                                        <Text style={styles.subHeading} className=' font-bold text-sm'>{`${experience.title} at ${experience.company !== undefined ? experience.company : ''}`}</Text>
                                        <Text style={styles.text} className=' text-gray-600'>{`${experience.dateStart} - ${experience.dateEnd}`}</Text>
                                    </View>
                                    <View style={{ marginTop: 8 }} className=' mt-2 text-gray-600'>
                                        {experience.bulletPoints.map(points => (
                                            <Text style={[styles.text, { marginTop: 10 }]}>{points}.</Text>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>)}

                        {data?.projects?.length > 0 && (<View style={styles.botSection} className=' pt-6'>
                            <Text style={styles.heading} className=' text-[20px] font-bold'>Projects</Text>
                            {data.projects.map(project => (
                                <View style={{ marginTop: 18 }} className=' mt-4'>
                                    <View style={styles.innerSection} className=' flex items-center justify-between'>
                                        <Text style={styles.subHeading} className=' font-bold text-sm'>{project.title}</Text>
                                        <Text style={styles.text} className=' text-gray-600'>{`${dateFomatted(project.startDate)} - ${dateFomatted(project.endDate)}`}</Text>
                                    </View>
                                    <View style={{ marginTop: 8 }} className=' mt-2 text-gray-600'>
                                        <Text style={[styles.text, { marginTop: 10 }]}>{project.description}.</Text>
                                    </View>
                                    <View style={{ marginTop: 8 }} className=' mt-2 text-gray-600'>
                                        <Text style={[styles.subHeading, { marginTop: 10 }]}>Link</Text>
                                        <Text style={[styles.text, { marginTop: 10 }]}>{project.link}</Text>
                                    </View>
                                    <View style={{ marginTop: 8 }} className=' mt-2 text-gray-600'>
                                        <Text style={[styles.subHeading, { marginTop: 10 }]}>Technologies</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: 22 }}>
                                            {project.technologies.map(tech => (
                                                <Text style={[styles.text, { marginTop: 10 }]}>{tech}</Text>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>)}

                        {data?.certifications?.length > 0 && (<View style={styles.botSection} className=' pt-6'>
                            <Text style={styles.heading} className=' text-[20px] font-bold'>Certifications</Text>
                            {data.certifications.map(certificate => (
                                <View style={{ marginTop: 18 }} className=' mt-4'>
                                    <View style={styles.innerSection} className=' flex items-center justify-between'>
                                        <Text style={styles.subHeading} className=' font-bold text-sm'>{certificate.title}</Text>
                                        <Text style={styles.text} className=' text-gray-600'>{`${dateFomatted(certificate.startDate)} - ${dateFomatted(certificate.endDate)}`}</Text>
                                    </View>
                                    <View style={{ marginTop: 8 }} className=' mt-2 text-gray-600'>
                                        <Text style={[styles.text, { marginTop: 10 }]}>{certificate.description}.</Text>
                                    </View>
                                    <View style={{ marginTop: 8 }} className=' mt-2 text-gray-600'>
                                        <Text style={[styles.subHeading, { marginTop: 10 }]}>Link</Text>
                                        <Text style={[styles.text, { marginTop: 10 }]}>{certificate.link}</Text>
                                    </View>
                                    <View style={{ marginTop: 8 }} className=' mt-2 text-gray-600'>
                                        <Text style={[styles.subHeading, { marginTop: 10 }]}>Technologies</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: 22 }}>
                                            {certificate.technologies.map(tech => (
                                                <Text style={[styles.text, { marginTop: 10 }]}>{tech}</Text>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>)}

                    </View>
                    <View style={styles.rightContainer} className=' col-span-1 border-l-[1px] pb-[50px] border-gray-200 pl-12'>
                        <View style={styles.topSection} className=' py-6'>
                            <Text style={styles.heading} className=' text-[20px] font-bold'>Contacts</Text>
                            {data?.address && (<View style={{ marginTop: 18 }} className=' mt-4'>
                                <Text style={[styles.subHeading, { marginTop: 3 }]} className=' font-bold text-sm'>Address</Text>
                                <Text style={[styles.text, { marginTop: 12 }]} className=' mt-2 text-gray-600'>{data.address}</Text>
                            </View>)}
                            {data?.email && (<View style={{ marginTop: 18 }} className=' mt-4'>
                                <Text style={[styles.subHeading, { marginTop: 3 }]} className=' font-bold text-sm'>Email</Text>
                                <Text style={[styles.text, { marginTop: 12 }]} className=' mt-2 text-gray-600'>{data.email}</Text>
                            </View>)}
                            {data?.phone && (<View style={{ marginTop: 18 }} className=' mt-4'>
                                <Text style={[styles.subHeading, { marginTop: 3 }]} className=' font-bold text-sm'>Phone</Text>
                                <Text style={[styles.text, { marginTop: 12 }]} className=' mt-2 text-gray-600'>{data.phone}</Text>
                            </View>)}
                            {data?.linkedin && (<View style={{ marginTop: 18 }} className=' mt-4'>
                                <Text style={[styles.subHeading, { marginTop: 3 }]} className=' font-bold text-sm'>Portfolio</Text>
                                <Text style={[styles.text, { marginTop: 12 }]} className=' mt-2 text-gray-600'>{data.linkedin}</Text>
                            </View>)}
                        </View>
                        {data?.skill?.length > 0 && (<View style={styles.botSection} className=' pt-6'>
                            <Text style={styles.heading} className=' text-[20px] font-bold'>Skills</Text>
                            <View style={{ marginTop: 12 }} className=' mt-4'>
                                {data?.skill?.map(skill => (
                                    <View style={{ marginTop: 12, fontWeight: 'bold' }} className=' font-bold mt-4'>
                                        <Text style={[styles.text, { marginTop: 12 }]}>{skill.skill}</Text>
                                        <View style={{ width: 100 + '%', backgroundColor: '#f2f2f2', marginTop: 8, borderRadius: 50 + '%', height: 4.5 }} class="w-full bg-[#f2f2f2] mt-2 rounded-full h-1.5">
                                            <View style={{ width: 80 + '%', backgroundColor: '#585858', borderRadius: 50 + '%', height: 4.5 }} class="bg-[#585858] h-1.5 rounded-full w-[80%]"></View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>)}
                    </View>
                </View>
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                />
            </Page>
        </Document>
        // {/* </PDFViewer> */}
    )
}

export default ResumeDoc