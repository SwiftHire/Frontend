import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, Image, PDFViewer} from '@react-pdf/renderer';
import Rubik from '../../../assets/fonts/Rubik.ttf';
import RubikBold from '../../../assets/fonts/Rubik-Medium.ttf';
import Inter from '../../../assets/fonts/Inter.ttf';
import InterMedium from '../../../assets/fonts/Inter-Medium.otf';
import telephone from '../../../assets/png/phone-call.png';
import maps from '../../../assets/png/location.png';
import email from '../../../assets/png/email.png';
import globe from '../../../assets/png/globe.png';
import userAvatar from '../../../assets/png/user-avatar.png';

import userIcon from '../../../assets/png/user-icon.png';


const ResumeDoc3 = ({ data }) => {

    Font.register({
        family: 'Rubik',
        fonts: [
            { src: RubikBold, fontWeight: 'bold' },
            { src: Rubik, fontWeight: 'normal' }
        ],
    });

    Font.register({
        family: 'Inter',
        fonts: [
            { src: InterMedium, fontWeight: 'medium' },
            { src: Inter, fontWeight: 'normal' },
        ],
    });

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: 70,
            fontFamily: 'Rubik',
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
        },

        leftContainer: {
            flexBasis: 66.6666666667 + '%',
            paddingHorizontal: 37.5,
        },
        rightContainer: {
            flexBasis: 33.3333333333 + '%',
            backgroundColor: '#1d2e3c',
        },
        topSection: {
            paddingVertical: 18
        },
        contentSection: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        innerSection: {
            marginTop: 5
        },
        title: {
            fontSize: 29.25,
            fontWeight: 'medium',
            textTransform: 'capitalize',
        },
        subtitle: {
            fontSize: 13.5,
            fontWeight: 'normal',
            color: '#06B6D4',
        },
        section: {
            marginTop: 26
        },
        infoSection: {
            display: 'flex',
            flexDirection: 'row',
            gap: 15
        },
        image: {
            width: 127.5,
            height: 127.5,
            objectFit: 'cover',
            objectPosition: 'top',
            borderRadius: 50 + '%',
            marginHorizontal: 'auto'
        },
        icons: {
            width: 13,
            height: 13,
            objectFit: 'contain'
        },
        textBbody: {
            fontSize: 11.5
        },
        heading: {
            fontSize: 16,
            textAlign: 'left',
            fontWeight: 'normal',
            borderBottom: 1,
            borderBottomColor: '#E5E7EB',
            paddingBottom: 12
        },
        subHeading: {
            fontSize: 13.5,
            fontWeight: 'normal',
        },
        text: {
            fontSize: 12.5,
            fontWeight: 'normal',
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'black',
        },

    });

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

    const Doc = () => (
        <Document pageMode='useNone' pageLayout='twoColumnLeft'>
            <Page size="A3" style={styles.page}>
            <View fixed style={{backgroundColor: '#1d2e3c', width:304, top:0, bottom:0, position:'absolute', right:0}}></View>
                <View style={styles.container} className=' grid grid-cols-3'>
                    <View style={styles.leftContainer} className=' col-span-2 px-[50px] py-[40px]'>
                        <View>
                            <Text style={styles.title} className=' text-[35px] font-medium'>{data?.name}</Text>
                            {data?.position && (<Text style={[styles.subtitle, {marginTop: 18}]} className=' text-sm text-cyan-500 font-normal'>{data.position}</Text>)}
                            <View style={styles.section} className=' mt-8'>
                                {data?.phone && (<View style={styles.infoSection} className=' flex gap-5'>
                                    <Image style={styles.icons} src={telephone} />
                                    <Text style={styles.text}>{data.phone}</Text>
                                </View>)}
                                {data?.address && (<View style={[styles.infoSection, { marginTop: 20 }]} className=' flex gap-5 mt-3'>
                                    <Image style={styles.icons} src={maps} />
                                    <Text style={styles.text}>{data.address}</Text>
                                </View>)}
                                {data?.email && (<View style={[styles.infoSection, { marginTop: 20 }]} className=' flex gap-5 mt-3'>
                                    <Image style={styles.icons} src={email} />
                                    <Text style={styles.text}>{data.email}</Text>
                                </View>)}
                                {data?.linkedin && (<View style={[styles.infoSection, { marginTop: 20 }]} className=' flex gap-5 mt-3'>
                                    <Image style={styles.icons} src={globe} />
                                    <Text style={styles.text}>{data.linkedin}</Text>
                                </View>)}
                            </View>

                            {data?.summary && (<View style={styles.section} className=' mt-8'>
                                <Text style={styles.heading} className=' text-[20px] font-normal border-b border-gray-200 pb-4'>SUMMARY</Text>
                                <Text style={[styles.text, { marginTop: 12 }]} className=' mt-4'>{data.summary}</Text>
                            </View>)}

                            {data?.workExperience?.length > 0 && (<View style={styles.section} className=' mt-8'>
                                <Text style={styles.heading} className=' text-[20px] font-normal border-b border-gray-200 pb-4'>EXPERIENCE</Text>
                                {data.workExperience.map(experience => (
                                    <View style={styles.section} className=' mt-4'>
                                        <View style={styles.contentSection} className=' flex justify-between'>
                                            <View className=''>
                                                <Text style={styles.subHeading} className=' text-sm font-normal '>{experience.title}</Text>
                                                <Text style={[styles.subtitle, { marginTop: 8 }]} className=' text-sm font-normal mt-1 text-cyan-500'>{experience.company}</Text>
                                            </View>
                                            <View style={[styles.section, styles.textBbody]} className=' mt-8 text-xsm'>
                                                <Text style={styles.text}>{`${experience.dateStart} - ${experience.dateEnd}`}</Text>
                                                <Text style={[styles.text, { marginTop: 8 }]} className=' mt-1'>{experience.location}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.innerSection} className=' mt-4'>
                                            <View style={[styles.text, { color: '#4b5563' }]} className=' text-gray-600'>
                                                {experience.bulletPoints.map(points => (
                                                    <Text style={[styles.text, { marginTop: 8 }]}>{points}.</Text>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>)}


                            {data?.projects?.length > 0 && (<View style={styles.section} className=' mt-8'>
                                <Text style={styles.heading} className=' text-[20px] font-normal border-b border-gray-200 pb-4'>PROJECTS</Text>
                                {data.projects.map(project => (
                                    <View style={styles.section} className=' mt-4'>
                                        <View style={styles.contentSection} className=' flex justify-between'>
                                            <View className=''>
                                                <Text style={styles.subHeading} className=' text-sm font-normal '>{project.title}</Text>
                                            </View>
                                            <View style={[styles.section, styles.textBbody]} className=' mt-8 text-xsm'>
                                                <Text style={styles.text}>{`${dateFomatted(project.startDate)} - ${dateFomatted(project.endDate)}`}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.innerSection} className=' mt-4'>
                                            <View style={[styles.text, { color: '#4b5563' }]} className=' text-gray-600'>
                                                    <Text style={[styles.text, { marginTop: 8 }]}>{project.description}.</Text>
                                            </View>
                                        </View>
                                        
                                        <View style={styles.innerSection} className=' mt-4'>
                                            <View style={[styles.text, { color: '#4b5563' }]} className=' text-gray-600'>
                                                    <Text style={[styles.subHeading, { marginTop: 8 }]}>Link</Text>
                                                    <Text style={[styles.text, { marginTop: 8 }]}>{project.link}.</Text>
                                            </View>
                                        </View>
                                        <View style={styles.innerSection} className=' mt-4'>
                                        <Text style={[styles.subHeading, { marginTop: 8 }]}>Technologies</Text>
                                            <View style={[styles.text, { color: '#4b5563', display: 'flex', flexDirection: 'row', gap: 22 }]} className=' text-gray-600'>
                                                {project.technologies.map(tech => (
                                                    <Text style={[styles.text, { marginTop: 10 }]}>{tech}.</Text>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>)}

                            {data?.education?.length > 0 && (<View style={styles.section} className=' mt-8'>
                                <Text style={styles.heading} className=' text-[20px] font-normal border-b border-gray-200 pb-4'>EDUCATION</Text>
                                {data.education.map(edu => (
                                    <View style={styles.section} className=' mt-4'>
                                        <View style={styles.contentSection} className=' flex justify-between'>
                                            <View className=''>
                                                <Text style={styles.subHeading} className=' text-sm font-normal '>
                                                    {/* {`${edu.fieldOfStudy}, ${edu.degree}`} */}
                                                    {edu.fieldOfStudy !==undefined ? edu.fieldOfStudy + ', ' : ''}
                                                    {edu.degree !==undefined ? edu.degree : ''}
                                                </Text>
                                                <Text style={[styles.subtitle, { marginTop: 15 }]} className=' text-sm font-normal mt-1 text-cyan-500'>
                                                    {/* {`${edu.institution}, ${edu.location}`} */}
                                                    {`${edu.institution !== undefined ? edu.institution :''} 
                                                    ${edu.location !==undefined ? ',' + edu.location : ''}`}
                                                </Text>
                                            </View>
                                            <View style={styles.textBbody} className=' text-xsm'>
                                                <Text style={styles.text}>{edu.year}</Text>
                                                <Text style={[styles.text, { marginTop: 15 }]} className=' mt-1'>{edu.location}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>)}

                        </View>
                    </View>
                    <View style={styles.rightContainer} className=' col-span-1 bg-[#1d2e3c]'> 
                        <View style={{ paddingVertical: 30, paddingHorizontal: 26.25, color: 'white' }} className=' py-[40px] px-[35px] text-white'>
                            {data?.imageUrl ? <Image 
                                style={styles.image}
                                className='w-[170px] h-[170px] object-cover object-top rounded-full mx-auto'
                                src={{ uri: data?.imageUrl, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }}
                             />
                             : <Image 
                             style={styles.image}
                             className='w-[170px] h-[170px] object-cover object-top rounded-full mx-auto'
                             src={userIcon}
                          />
                            }
                            {data?.skill?.length > 0 && (<View style={{ marginTop: 30 }} className=' mt-10'>
                                <Text style={{ fontSize: 16, textAlign: 'left', fontWeight: 'normal', paddingBottom: 12 }} className=' text-[20px] font-normal pb-4'>Skills</Text>
                                <View>
                                    {data?.skill.map(skill => (
                                        <View style={styles.innerSection} className=' mt-4'>
                                            <View style={styles.innerSection} className=' font-light mt-4'>
                                                <Text style={styles.text}>{skill.skill}</Text>
                                                <View style={{ width: 100 + '%', backgroundColor: '#344350', marginTop: 8, borderRadius: 50 + '%', height: 4.5 }} class="w-full bg-[#f2f2f2] mt-2 rounded-full h-1.5">
                                                    <View style={{ width: 80 + '%', backgroundColor: 'white', borderRadius: 50 + '%', height: 4.5 }} class="bg-[#585858] h-1.5 rounded-full w-[80%]"></View>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>)}

                            {data?.certifications?.length > 0 && (<View style={{ marginTop: 30 }} className=' mt-10'>
                                <Text style={{ fontSize: 15, textAlign: 'left', fontWeight: 'normal', paddingBottom: 12 }} className=' text-[20px] font-normal pb-4'>Certifications</Text>
                                <View>
                                    {data.certifications.map(certificate => (
                                        <View style={{ marginTop: 10 }} className=' font-light mt-2'>
                                            <View style={[styles.contentSection, styles.textBbody]} className=' text-xsm flex justify-between'>
                                                <Text style={[styles.text, { flexBasis: 60 + '%' }]}>{certificate.title}</Text>
                                                <Text style={[styles.text, { flexBasis: 40 + '%' }]}>{`${dateFomatted(certificate.startDate)} - ${dateFomatted(certificate.endDate)}`}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>)}

                        </View>
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
    )
    return (
        // <PDFViewer className=' w-full h-[856px]'>
            <Doc />
        // </PDFViewer>
    )
}

export default ResumeDoc3