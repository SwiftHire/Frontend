import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, PDFViewer } from '@react-pdf/renderer';
import MonoSpaceRegular from '../../../assets/fonts/SpaceMono-Regular.otf';
import MonoSpaceBold from '../../../assets/fonts/SpaceMono-Bold.otf';

const ResumeDoc1 = ({ data }) => {

    Font.register({
        family: 'mono',
        fonts: [
            { src: MonoSpaceBold, fontWeight: 'bold' },
            { src: MonoSpaceRegular, fontWeight: 'normal' },
        ],
    });

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: 70,
            fontFamily: 'mono',
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        title: {
            fontSize: 25,
            fontWeight: 'bold',
            textTransform: 'capitalize',
            textAlign: 'center',
            lineHeight: 1
        },
        subtitle: {
            fontSize: 12,
            fontWeight: 'normal',
            color: 'grey',
            textAlign: 'center',
            paddingTop: 13
        },
        section: {
            borderTop: 1,
            borderTopColor: '#E5E7EB',
            marginHorizontal: 12,
            paddingVertical: 21
        },
        textBbody: {
            fontWeight: 'normal',
            fontSize: 10.5,
            marginBottom: 5,
            color: 'grey',
        },
        heading: {
            fontSize: 15,
            textAlign: 'left',
            fontWeight: 'bold',
        },
        subHeading: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        text: {
            fontSize: 12,
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
        // let year = date?.slice(0, 4);
        // let month = date?.slice(5, 7)
        let year = "";
        let month = "";
        if (date ==='' || date === undefined) {
          return '';
        }else{
            year = date.slice(0, 4);
            month = date.slice(5, 7);
        }
        if (month === '01') {
            month = 'Jan'
        } 
        else if (month === '02'){
            month = 'Feb'
        }
        else if (month === '03'){
            month = 'Mar'
        }
        else if (month === '04'){
            month = 'Apr'
        }
        else if (month === '05'){
            month = 'May'
        }
        else if (month === '06'){
            month = 'Jun'
        }
        else if (month === '07'){
            month = 'Jul'
        }
        else if (month === '08'){
            month = 'Aug'
        }
        else if (month === '09'){
            month = 'Sep'
        }
        else if (month === '10'){
            month = 'Oct'
        }
        else if (month === '11'){
            month = 'Nov'
        }
        else if (month === '12'){
            month = 'Dec'
        }

        return `${month} ${year}`
    }

    const Doc = () => (
        <Document>
            <Page size="A3" style={styles.page}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {`${data?.name}, ${data?.position}`}
                    </Text>
                    {/* {(data?.address || data?.email || data?.phone) && (<Text style={styles.subtitle}>{`${data.address}, ${data.email}, ${data.phone}`}</Text>)} */}
                    <Text style={styles.subtitle}>
                        {/* {`${data.address}, ${data.email}, ${data.phone}`} */}
                        {data?.address !== undefined ? data?.address : ''}
                        {data?.email !== undefined ? ', ' + data?.email : ''}
                        {data?.phone !== undefined ? ', ' + data?.phone : ''}
                    </Text>
                    {data?.summary && (<View style={[styles.section, { marginTop: 48, display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
                        <Text style={[styles.heading, { flexBasis: 25 + '%' }]}>Profile</Text>
                        <Text style={[styles.text, { flexBasis: 75 + '%' }]}>{data.summary}</Text>
                    </View>)}
                    {data?.education?.length > 0 && (<View style={styles.section}>
                        <Text style={styles.heading}>Education</Text>
                        {data.education.map(edu => (
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 18, alignItems: 'flex-start' }} className=' flex mt-6 items-start'>
                                <Text style={[styles.textBbody, { flexBasis: 25 + '%' }]} className=' basis-1/4 text-gray-400 text-xsm'>{edu.year}</Text>
                                <View style={{ flexBasis: 75 + '%' }} className=" basis-3/4">
                                    <Text style={styles.subHeading} className=' font-bold'>{edu.institution}</Text>
                                    <Text style={[styles.text, { marginTop: 10 }]} className=' mt-2 text-gray-400'>{edu.fieldOfStudy}</Text>
                                </View>
                            </View>
                        ))}
                    </View>)}
                    {data?.workExperience?.length > 0 && (<View style={styles.section}>
                        <Text style={styles.heading}>Employment</Text>
                        {data.workExperience.map(experience => (
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 18, alignItems: 'flex-start' }} className=' flex mt-6 items-start'>
                                <Text style={[styles.textBbody, { flexBasis: 25 + '%' }]} className=' basis-1/4 text-gray-400 text-xsm'>{`${experience?.dateStart} - ${experience?.dateEnd}`}</Text>
                                <View style={{ flexBasis: 75 + '%' }} className=" basis-3/4">
                                    <Text style={styles.subHeading} className=' font-bold'>{`${experience.title} at ${experience.company}`}</Text>
                                    <View className=' mt-2 text-gray-400'>
                                        {experience.bulletPoints.map(points => (
                                            <Text style={[styles.text, { marginTop: 10 }]}>{points}.</Text>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>)}
                    {data?.projects?.length > 0 && (<View style={styles.section}>
                        <Text style={styles.heading}>Projects</Text>
                        {data.projects.map(project => (
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 18, alignItems: 'flex-start' }} className=' flex mt-6 items-start'>
                                <Text style={[styles.textBbody, { flexBasis: 25 + '%', height: 100 + '%' }]} className=' basis-1/4 text-gray-400 text-xsm'>{`${dateFomatted(project?.startDate)} - ${dateFomatted(project?.endDate)}`}</Text>
                                <View style={{ flexBasis: 75 + '%' }} className=" basis-3/4">
                                    <Text style={styles.subHeading} className=' font-bold'>{project.title}</Text>
                                    <View className=' mt-2 text-gray-400'>
                                        <Text style={[styles.text, { marginTop: 10 }]}>{project.description}.</Text>
                                    </View>
                                    <View className=' mt-2 text-gray-400'>
                                        <Text style={[styles.subHeading, { marginTop: 10 }]}>Link</Text>
                                        <Text style={[styles.text, { marginTop: 10 }]}>{project.link}</Text>
                                    </View>
                                    <View className=' mt-2 text-gray-400'>
                                        <Text style={[styles.subHeading, { marginTop: 10 }]}>Technologies</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: 22 }}>
                                            {project.technologies.map(tech => (
                                                <Text style={[styles.text, { marginTop: 10 }]}>{tech}</Text>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>)}
                    {data?.certifications?.length > 0 && (<View style={styles.section}>
                        <Text style={styles.heading}>Certifications</Text>
                        {data.certifications.map(certificate => (
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 18, alignItems: 'flex-start' }} className=' flex mt-6 items-start'>
                                <Text style={[styles.textBbody, { flexBasis: 25 + '%' }]} className=' basis-1/4 text-gray-400 text-xsm'>{`${dateFomatted(certificate?.startDate)} - ${dateFomatted(certificate?.endDate)}`}</Text>
                                <View style={{ flexBasis: 75 + '%' }} className=" basis-3/4">
                                    <Text style={styles.subHeading} className=' font-bold'>{certificate.title}</Text>
                                    <View className=' mt-2 text-gray-400'>
                                        <Text style={[styles.text, { marginTop: 10 }]}>{certificate.description}.</Text>
                                    </View>
                                    <View className=' mt-2 text-gray-400'>
                                        <Text style={[styles.subHeading, { marginTop: 10 }]}>Link</Text>
                                        <Text style={[styles.text, { marginTop: 10 }]}>{certificate.link}</Text>
                                    </View>
                                    <View className=' mt-2 text-gray-400'>
                                        <Text style={[styles.subHeading, { marginTop: 10 }]}>Technologies</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: 22 }}>
                                            {certificate.technologies.map(tech => (
                                                <Text style={[styles.text, { marginTop: 10 }]}>{tech}</Text>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>)}
                    {data?.skill?.length > 0 && (<View style={[styles.section, { display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }]}>
                        <Text style={[styles.heading, { flexBasis: 25 + '%' }]}>Skills</Text>
                        <View style={{ display: 'flex', flexWrap: 'wrap', rowGap: 20, flexBasis: 75 + '%', flexDirection: 'row', alignItems: 'flex-start' }} className=' font-bold grid grid-cols-2 gap-6 w-full'>
                            {data?.skill.map(skill => (
                                <Text style={[styles.subHeading, { flexBasis: 50 + '%' }]}>{skill.skill}</Text>
                            ))}
                        </View>
                    </View>)}
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
    return (
        // <PDFViewer className=' w-full h-[856px]'>
            <Doc />
        // {/* </PDFViewer> */}
    )
}

export default ResumeDoc1