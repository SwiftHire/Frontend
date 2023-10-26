import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image, PDFViewer } from '@react-pdf/renderer';
import userIcon from '../../../assets/png/user-icon.png';

import linkedinIcon from '../../../assets/png/icon-linkedin.png';
import phoneIcon from '../../../assets/png/phone-call.png';
import locationIcon from '../../../assets/png/location.png';
import emailIcon from '../../../assets/png/email.png';


import MontserratItalic from '../../../assets/fonts/Montserrat-Italic.ttf';
import MontserratLight from '../../../assets/fonts/Montserrat-Light.ttf';
import MontserratRegular from '../../../assets/fonts/Montserrat-Regular.ttf';
import MontserratSemiBold from '../../../assets/fonts/Montserrat-SemiBold.ttf';
import MontserratBold from '../../../assets/fonts/Montserrat-Bold.ttf';

Font.register({
  family: 'Montserrat',
  fonts: [
    { src: MontserratItalic, fontWeight: 'light', fontStyle:'italic' },
    { src: MontserratLight, fontWeight: 'light' },
    // { src: MontserratRegular, fontWeight: 'regular' },
    { src: MontserratSemiBold, fontWeight: 'semiBold' },
    { src: MontserratBold, fontWeight: 'bold' },
  ],
});


const ResumeDoc8 = ({ data }) => {
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

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: 50,
    },
    section: {
      marginBottom: 5,
      marginTop: 5,
    },
    sectionInner:{
      display:'flex',
      flexDirection:'row',
      gap:40,
    },
    sideBarItems:{
      display:'flex',
      flexDirection:'row',
      // alignItems:'center',
      gap:3,
    },
    title:{
      fontSize: 16,
      textTransform:'uppercase',
      fontFamily: 'Times-Roman',
      // fontWeight: 'regular',
      marginBottom:10,
      marginTop:10,
      borderBottom:1,
      paddingBottom:10,
      borderColor:'#dddada',
      letterSpacing:4,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Times-Roman',
      fontWeight: 'semibold',
    },
    text: {
      fontSize: 11,
      marginBottom: 5,
      // fontWeight:'regular',
      fontFamily: 'Times-Roman',
  },
  smallText:{
    fontSize:12,
    fontWeight:'light',
    fontFamily: 'Times-Roman',
    color:'black',
  },
    headerText:{
      marginTop:2,
      fontSize: 30,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: 5,
      fontWeight: 'bold',
    },
    headerTextSmall:{
      marginTop:2,
      fontSize: 18,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: 5,
      fontWeight: 'bold',
      borderBottom:1,
      borderTop:1,
      borderColor:'#dddada',
      paddingTop:15,
      paddingBottom:15,
      fontFamily: 'Times-Roman',
    },
    iconsContainer:{
      display:'flex',
      alignItems:'center',
      flexDirection:'row',
      gap:2,
      marginBottom:10,
      marginTop:5
    },
    iconText:{
      fontSize: 12, 
      marginLeft: 1, 
      fontFamily: 'Times-Roman',
      fontWeight:'light'
    },
    iconImages:{
      width: 10,
      height: 10,
      objectFit: 'cover',
      objectPosition: 'top',
      borderRadius: 50 + '%',
      marginHorizontal: 'auto' 
    },
    image: {
      width: 100,
      height: 100,
      objectFit: 'cover',
      objectPosition: 'top',
      borderRadius: 50 + '%',
      marginHorizontal: 'auto'
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

  return (
    <Document>
      <Page size="A3" style={styles.page}>
        <View style={styles.section}>
            <View style={styles.sectionInner}>
                <View style={{ flexBasis: 75 + '%' }}>
                    <View>
                      <Text style={[styles.headerText, {textTransform:'uppercase', fontFamily: 'Times-Roman',}]}>{data?.name}</Text>
                      <Text style={styles.headerTextSmall}>{ data?.position }</Text>
                    </View>
                </View>
                <View style={[styles.image, { flexBasis: '20%', width: 100, height: 100, overflow: 'hidden' }]} >
                  {/* <Image 
                    source={`${ data?.imageUrl ? data?.imageUrl : userIcon}`} 
                    alt='profile picture' style={{ width: '100%', height: '100%', 
                    borderRadius: 50 }}
                   /> */}
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
                </View>
            </View>
        </View>
        <View style={styles.section}>
            <View style={styles.sectionInner}>
                <View style={{ flexBasis: 22 + '%' }}>
                      <View>
                          <Text style={styles.title}>contact</Text>
                            <View style={{maxWidth:50}}>
                                <View style={styles.sideBarItems}>
                                {data?.phone && <Image src={phoneIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} 
                                {data?.phone && <Text style={styles.iconText}>{data.phone} </Text>}
                                </View>
                                <View style={styles.sideBarItems}>
                                {data?.email && <Image src={emailIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} 
                                {data?.email && <Text style={styles.iconText}>{data.email} </Text>}
                                </View>
                                <View style={styles.sideBarItems}>
                                {data?.linkedin && <Image src={linkedinIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} 
                                {data?.linkedin && <Text style={styles.iconText}>{data.linkedin} </Text>}
                                </View>
                                <View style={styles.sideBarItems}>
                                {data?.country && <Image src={locationIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} 
                                {data?.country && <Text style={styles.iconText}>{data.country} </Text>}
                                </View>
                            </View>
                      </View>
                      {data?.education?.length > 0 && (
                        <View style={styles.section}>
                          <Text style={styles.title}>education</Text>
                          {data?.education && data?.education?.map((education, index)=>(
                            <View>
                              <Text style={[styles.subtitle, {fontWeight:'bold'}]}>{education?.degree !== undefined ? education?.degree  : ''}</Text>
                              <Text style={{fontFamily: 'Times-Roman', fontWeight:'light', fontSize:13}}>{education?.fieldOfStudy !== undefined ? education?.fieldOfStudy : ''}</Text>
                              <Text style={{fontFamily: 'Times-Roman', fontWeight:'light', fontSize:13}}>{education?.institution !== undefined ? education?.institution : ''}</Text>
                              <Text style={{fontFamily: 'Times-Roman', fontWeight:'light', fontSize:13}}>{education?.country !== undefined ? education?.country : ''}</Text>
                              <Text style={{fontFamily: 'Times-Roman', fontWeight:'light', fontSize:11}}>{education?.year !== undefined ? dateFomatted(education?.year) : ''}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                      {data?.skill?.length > 0 && (
                        <View style={styles.section}>
                          <Text style={styles.title}>skills</Text>
                          {data?.skill && data?.skill?.map((skill, index)=>(
                            <View>
                              <Text style={{fontFamily: 'Times-Roman', fontWeight:'light', fontSize:13}}>{skill.skill}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                      
                </View>
                {/* <View style={[{ flexBasis: 2 + '%',  position:'relative' }]} >
                  <View style={{ width:1, height:40, backgroundColor:'#333233', position:'absolute', top:8, left:2 }}></View>
                </View> */}
                <View style={[ { flexBasis: 75 + '%', borderLeft:1, borderColor:'#d3ced3', paddingLeft:15}]} >
                  {data?.summary && (
                    <View>
                      <Text style={styles.title}>summary</Text>
                      <Text style={{fontFamily: 'Times-Roman', fontWeight:'light', fontSize:13}}>{data?.summary}</Text>
                    </View>
                  )}
                  {data?.workExperience.length > 0 && (
                    <View>
                        <Text style={styles.title}>EXPERIENCE</Text>
                        {data.workExperience.map(experience =>(
                            <View style={{marginTop:10, marginBottom:10}}> 
                              <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                  <View>
                                    <Text style={styles.subtitle}>{ experience?.title !== undefined ? experience?.title : '' }</Text>
                                    <Text  style={{ marginTop:5, marginBottom:5, fontFamily: 'Times-Roman', fontWeight:'light', fontSize:11 }}>
                                        {experience.company !== undefined ? experience?.company + ' ' : ''} 
                                        {experience?.location !== undefined ? ' , ' + experience?.location : ''} 
                                    </Text>
                                  </View>
                                  <View>
                                      <Text style={{ marginTop:5, marginBottom:5, fontFamily: 'Times-Roman', fontWeight:'light', fontSize:11 }}>
                                          {experience?.dateStart !== undefined ? experience?.dateStart : ''}
                                          {experience?.dateEnd !== undefined ? ' - ' + experience?.dateEnd : ''}
                                      </Text>
                                  </View>
                              </View>
                              {experience?.bulletPoints && experience?.bulletPoints?.map((bulletPoint)=>(
                                <Text style={{ marginTop:5, marginBottom:5, fontFamily: 'Times-Roman', fontWeight:'light', fontSize:13 }}>{bulletPoint}</Text>
                              ))}
                            </View>
                        ))}
                    </View>
                  )}
                  {data?.projects.length > 0 && (
                    <View>
                        <Text style={styles.title}>accademic projects</Text>
                        {data.projects && data.projects.map(project =>(
                            <View style={{marginTop:10, marginBottom:10}}> 
                              <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                  <View>
                                    <Text style={styles.subtitle}>{project?.title !== undefined ? project?.title : ''}</Text>
                                  </View>
                                  <View>
                                      <Text style={{ marginTop:5, marginBottom:5, fontFamily: 'Times-Roman', fontWeight:'light', fontSize:11 }}>
                                          {project?.startDate !== undefined ? dateFomatted(project?.startDate) : ''}
                                          {project?.endDate !== undefined ? ' - ' + dateFomatted(project?.endDate) : ''}
                                      </Text>
                                  </View>
                              </View>
                              <Text style={{ marginTop:5, marginBottom:5, fontFamily: 'Times-Roman', fontWeight:'light', fontSize:13 }}>{ project?.description }</Text>
                            </View>
                        ))}
                    </View>
                  )}
                  {data?.certifications?.length > 0 && (
                    <View>
                        <Text style={styles.title}>certifications</Text>
                        {data.certifications && data.certifications.map(certification =>(
                            <View style={{marginTop:10, marginBottom:10}}> 
                              <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                                  <View>
                                    <Text style={styles.subtitle}>{certification?.title !== undefined ? certification?.title : ''}</Text>
                                  </View>
                                  <View>
                                      {/* <Text style={{ marginTop:5, marginBottom:5, fontFamily: 'Times-Roman', fontWeight:'light', fontSize:13, fontStyle:'italic' }}>
                                          {project?.startDate !== undefined ? dateFomatted(project?.startDate) : ''}
                                          {project?.endDate !== undefined ? ' - ' + dateFomatted(project?.endDate) : ''}
                                      </Text> */}
                                  </View>
                              </View>
                              <Text style={{ marginTop:5, marginBottom:5, fontFamily: 'Times-Roman', fontWeight:'light', fontSize:13 }}>{ certification?.description }</Text>
                            </View>
                        ))}
                    </View>
                  )}
                </View>
            </View>
        </View>
      </Page>
    </Document>
  )
}

export default ResumeDoc8