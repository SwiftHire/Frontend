import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image, PDFViewer } from '@react-pdf/renderer';
import emailIcon from '../../../assets/png/email-pink.png';
import phoneIcon from '../../../assets/png/phone-pink.png';
import locationIcon from '../../../assets/png/location-pink.png';
import linkedinIcon from '../../../assets/png/linkedin-pink.png';

import RubikLight from '../../../assets/fonts/Rubik-Light.ttf';
import RubikRegular from '../../../assets/fonts/Rubik-Regular.ttf';
import RubikBold from '../../../assets/fonts/Rubik-Bold.ttf';
import RubikItalic from '../../../assets/fonts/Rubik-Italic.ttf';
import RubikSemiBold from '../../../assets/fonts/Rubik-SemiBold.ttf';


const ResumeDoc5 = ({ data }) => {
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

  Font.register({
    family: 'Rubik',
    fonts: [
        { src: RubikLight, fontWeight: 'light' },
        { src: RubikRegular, fontWeight: 'regular' },
        { src: RubikItalic, fontStyle: 'italic' },
        { src: RubikSemiBold, fontWeight: 'light' },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: 50,
      fontFamily: 'Rubik',
    },
    section: {
      marginBottom: 5,
      marginTop: 5,
      color: '#704778',
    },
    sectionInner:{
      display:'flex',
      flexDirection:'row',
      gap:2,
    },
    title:{
      fontSize: 14,
      textTransform:'uppercase',
      color:'#704778',
      fontWeight: 'bold',
      marginBottom:10,
      marginTop:10,
    },
    subtitle: {
      fontSize: 13,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      textAlign: 'left',
      marginBottom: 5,
      fontFamily: 'Rubik',
      color: '#704778',
    },
    text: {
      fontSize: 10,
      marginBottom: 5,
      fontWeight:'thin',
      fontFamily: 'Rubik',
  },
  smallText:{
    fontSize:12,
    fontWeight:'light',
    fontFamily:'Rubik',
    color:'black',
  },
    headerText:{
      marginTop:2,
      fontSize: 18,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      marginBottom: 5,
      fontWeight: 'bold',
      fontFamily: 'Rubik',
      color: '#704778',
    },
    headerTextSmall:{
      marginTop:2,
      fontSize: 9,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      marginBottom: 5,
      fontWeight: 'bold',
      fontFamily: 'Rubik',
      color: '##951CC3',
    },
    iconsContainer:{
      display:'flex',
      alignItems:'center',
      flexDirection:'row',
      gap:2,
      fontFamily: 'Rubik',
      marginBottom:10,
      marginTop:5
    },
    iconText:{
      fontSize: 11, 
      marginLeft: 1, 
      fontFamily: 'Rubik',
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
        <View>
            <Text style={styles.headerText}>{data?.name}</Text>
            <Text style={styles.headerText}>{ data?.position }</Text>
        </View>
        <View style={styles.iconsContainer}>
        {data?.country && <Image src={locationIcon} alt="" style={{ width: '20px', height: '20px'}} />} {data?.country && <Text style={styles.iconText}>{data.city}, {data.country} </Text>}
          {data?.email && <Image src={emailIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} {data?.email && <Text style={styles.iconText}>{data.email} </Text>}
          {data?.phone && <Image src={phoneIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} {data?.phone && <Text style={styles.iconText}>{data.phone} </Text>}
          {data?.linkedin && <Image src={linkedinIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} {data?.linkedin && <Text style={styles.iconText}>{data.linkedin}</Text>}
        </View>
        <View>
            <Text style={styles.title}>Summary</Text>
            <Text style={styles.text}>{ data?.summary }</Text>
        </View>
        {
          data?.workExperience?.length > 0 && (
            <View style={styles.section}>
            <Text style={styles.title}>professional experience</Text>
            {data?.workExperience && data?.workExperience?.map((experience, index)=>(
              <View  style={styles.sectionInner}>
                <View style={{ flexBasis:25 + '%', marginTop:15 }}>
                    <Text style={styles.smallText}>
                        {experience?.dateStart !== undefined ? experience?.dateStart : ''}
                        {experience?.dateEnd !== undefined ? ' - ' + experience?.dateEnd : ''}
                    </Text>
                    <Text style={styles.smallText}>{experience?.location !== undefined ? experience?.location : ''}</Text>
                </View>
                <View  style={{ flexBasis:10 + '%', marginTop:15, position:'relative' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 50, backgroundColor: '#333233', marginRight:3 }}></View>
                    <View style={{ width:1, height:40, backgroundColor:'#333233', position:'absolute', top:8, left:2 }}></View>
                </View>
                <View  style={{ flexBasis:62 + '%', marginTop:15 }}>
                    <Text style={{ fontSize: 15, color:'black'}}>{ experience?.title !== undefined ? experience?.title : '' }</Text>
                    <Text style={{ fontSize: 15, color:'#951CC3'}}>{experience.company !== undefined ? experience?.company : ''}</Text>
                    {experience?.bulletPoints && experience?.bulletPoints?.map((bulletPoint)=>(
                  <Text style={styles.smallText}>{bulletPoint}</Text>
                ))}
                </View>
              </View>
            ))}
          </View>
          )
        }
        {
          data?.education?.length > 0 && (
            <View style={styles.section}>
            <Text style={styles.title}>EDUCATION</Text>
            {data?.education && data?.education?.map((education, index)=>(
              <View  style={styles.sectionInner}>
                <View style={{ flexBasis:25 + '%', marginTop:15 }}>
                    <Text style={styles.smallText}>
                      {education?.year !== undefined ? dateFomatted(education?.year) : ''}
                    </Text>
                    <Text style={styles.smallText}>{education?.location !== undefined ? education?.location : ''}</Text>
                </View>
                <View  style={{ flexBasis:10 + '%', marginTop:15, position:'relative' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 50, backgroundColor: '#333233', marginRight:3 }}></View>
                    <View style={{ width:1, height:40, backgroundColor:'#333233', position:'absolute', top:8, left:2 }}></View>
                </View>
                <View  style={{ flexBasis:62 + '%', marginTop:15 }}>
                    <Text style={{ fontSize: 15, color:'black'}}>
                        {education?.degree !== undefined ? education?.degree  : ''} {education?.fieldOfStudy !== undefined ? ' , ' + education?.fieldOfStudy : ''}
                    </Text>
                    <Text style={{ fontSize: 15, color:'#951CC3'}}>{education?.institution !== undefined ? education?.institution : ''}</Text>
                </View>
              </View>
            ))}
          </View>
          )
        }
        {
          data?.projects?.length > 0 && (
            <View style={styles.section}>
            <Text style={styles.title}>projects</Text>
            {data?.projects && data?.projects?.map((project, index)=>(
              <View  style={styles.sectionInner}>
                <View style={{ flexBasis:25 + '%', marginTop:15 }}>
                    <Text style={styles.smallText}>
                        {project?.startDate !== undefined ? dateFomatted(project?.startDate) : ''}
                        {project?.endDate !== undefined ? ' - ' + dateFomatted(project?.endDate) : ''}
                    </Text>
                    {/* <Text style={styles.smallText}>{education?.location !== undefined ? education?.location : ''}</Text> */}
                </View>
                <View  style={{ flexBasis:10 + '%', marginTop:15, position:'relative' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 50, backgroundColor: '#333233', marginRight:3 }}></View>
                    <View style={{ width:1, height:40, backgroundColor:'#333233', position:'absolute', top:8, left:2 }}></View>
                </View>
                <View  style={{ flexBasis:62 + '%', marginTop:15 }}>
                    <Text style={{ fontSize: 15, color:'black'}}>
                        {project?.title !== undefined ? project?.title : ''}
                    </Text>
                    <Text style={{ fontSize: 15, color:'#951CC3'}}>{ project?.description }</Text>
                </View>
              </View>
            ))}
          </View>
          )
        }
        {
          data?.certifications?.length > 0 && (
            <View style={styles.section}>
            <Text style={styles.title}>certifications</Text>
            {data?.certifications && data?.certifications?.map((certification, index)=>(
              <View  style={styles.sectionInner}>
                <View style={{ flexBasis:25 + '%', marginTop:15 }}>
                    <Text style={styles.smallText}>
                        {/* {project?.startDate !== undefined ? dateFomatted(project?.startDate) : ''}
                        {project?.endDate !== undefined ? ' - ' + dateFomatted(project?.endDate) : ''} */}
                    </Text>
                </View>
                <View  style={{ flexBasis:10 + '%', marginTop:15, position:'relative' }}>
                    <View style={{ width: 6, height: 6, borderRadius: 50, backgroundColor: '#333233', marginRight:3 }}></View>
                    <View style={{ width:1, height:40, backgroundColor:'#333233', position:'absolute', top:8, left:2 }}></View>
                </View>
                <View  style={{ flexBasis:62 + '%', marginTop:15 }}>
                    <Text style={{ fontSize: 15, color:'black'}}>
                        {certification?.title !== undefined ? certification?.title : ''}
                    </Text>
                    <Text style={{ fontSize: 15, color:'#951CC3'}}>{ certification?.description }</Text>
                </View>
              </View>
            ))}
          </View>
          )
        }
      {data?.skill?.length > 0 && <View>?
        <Text style={styles.title}>TECHNICAL SKILLS</Text>
        <View style={{flexDirection:'row'}}>
          {data?.skill.map((skill)=>(
            <Text style={[styles.text, {border:1, borderColor:'#dcd5ff', margin:3, paddingTop:2, paddingLeft:5, paddingRight:5}]}>
              { skill.skill }
            </Text>
          ))}
        </View>
      </View>}
      </Page>
    </Document>
  )
}

export default ResumeDoc5