import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, Image, PDFViewer } from '@react-pdf/renderer';

import emailIcon from '../../../assets/png/icon-letter.png';
import phoneIcon from '../../../assets/png/icon-phone.png';
import locationIcon from '../../../assets/png/icon-location.png';
import linkedinIcon from '../../../assets/png/icon-linkedin.png';

import MerriweatherRegular from '../../../assets/fonts/Merriweather-Regular.ttf';
import MerriweatherItalic from '../../../assets/fonts/Merriweather-Italic.ttf';
import MerriweatherBold from '../../../assets/fonts/Merriweather-Bold.ttf';
import MerriweatherBoldItalic from '../../../assets/fonts/Merriweather-BoldItalic.ttf';

const ResumeDoc7 = ({ data }) => {
  const dateFomatted = (date) => {
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
      fontFamily: 'Merriweather',
  },
  section: {
    marginBottom: 5,
    paddingBottom: 5,
    color: '#283d56',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'left',
    marginBottom: 5,
    fontFamily: 'Merriweather',
    color: '#283d56',
  },
  textHeader: {
      fontWeight: 'bold',
      fontSize: 12,
      marginBottom: 5,
      fontFamily: 'Merriweather',
  },
  headerText:{
    marginTop:2,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 5,
    fontWeight: 'light',
    fontFamily: 'Merriweather',
    color: '#283d56',
    borderBottom: 2,
    borderBottomColor: '#E5E7EB'
  },
  iconsContainer:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    gap:2,
    fontFamily: 'Merriweather',
    marginBottom:10,
    marginTop:5
  },
  iconText:{
    fontSize: 11, 
    marginLeft: 1, 
    fontFamily: 'Merriweather',
    color: '#283d56',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
    fontWeight: 'light',
    fontFamily: 'Merriweather',
    color: '#283d56',
},
title:{
  fontSize: 13,
  color:'#283d56',
  fontWeight: 'bold',
  marginBottom: 10,
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
        </View>
        <View style={styles.iconsContainer}>
        {data?.country && <Image src={locationIcon} alt="" style={{ width: '20px', height: '20px'}} />} {data?.country && <Text style={styles.iconText}>{data.city}, {data.country} </Text>}
          {data?.email && <Image src={emailIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} {data?.email && <Text style={styles.iconText}>{data.email} </Text>}
          {data?.phone && <Image src={phoneIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} {data?.phone && <Text style={styles.iconText}>{data.phone} </Text>}
          {data?.linkedin && <Image src={linkedinIcon} alt="" style={{ width: '13px', height: '13px', marginLeft: 3 }} />} {data?.linkedin && <Text style={styles.iconText}>{data.linkedin}</Text>}
        </View>
        {data?.workExperience?.length > 0 &&
        <View style={styles.section}>
          <Text style={styles.subtitle}>EXPERIENCE</Text>
          {data?.workExperience && data?.workExperience?.map((experience)=>(
            <View style={{ marginBottom:5, marginTop:5 }}>
                <Text style={styles.textHeader} key={experience?._id}>
                  { experience?.title !== undefined ? experience?.title : '' } 
                  {experience.company !== undefined ? ' | ' + experience?.company + ' ' : ''} 
                  {experience?.location !== undefined ? '| ' + experience?.location : ''} 
                  {experience?.dateStart !== undefined ? ' | ' + experience?.dateStart : ''}
                   {experience?.dateEnd !== undefined ? ' - ' + experience?.dateEnd : ''}</Text>
                {experience?.bulletPoints && experience?.bulletPoints?.map((bulletPoint)=>(
                  <Text style={styles.text}>{bulletPoint}</Text>
                ))}
            </View>
          ))}
        </View>
        }
        {data?.education?.length > 0 && 
        <View style={styles.section}>
        <Text style={styles.subtitle}>EDUCATION</Text>
          {data?.education && data?.education?.map((education)=>(
            <View style={{ marginBottom:10, marginTop:10 }} key={education?._id}>
                <Text style={styles.textHeader}>
                  {education?.degree !== undefined ? education?.degree : ''}
                  {education?.fieldOfStudy !== undefined ? ' | ' + education?.fieldOfStudy : ''}
                  {education?.institution !== undefined ? ' | ' + education?.institution : ''}
                  {education?.location !== undefined ? ' | ' + education?.location : ''}
                  {education?.country !== undefined ? ' | ' + education?.country : ''}
                  {education?.year !== undefined ? ' | ' + dateFomatted(education?.year) : ''}
                </Text>
            </View>
          ))}
        </View>
        }
        {data?.projects?.length > 0 && 
        <View style={styles.section}>
        <Text style={styles.subtitle}>PROJECTS</Text>
          {data?.projects && data?.projects?.map((project)=>(
            <View style={{ marginBottom:10, marginTop:10 }} key={project?._id}>
                <Text style={styles.textHeader}>
                  {project?.title !== undefined ? project?.title : ''}
                  {project?.startDate !== undefined ? ' | ' + dateFomatted(project?.startDate) + ' - ' : ''}
                  {project?.endDate !== undefined ? '  ' + dateFomatted(project?.endDate) : ''}
                </Text>
                <Text style={styles.text}>{ project?.description}</Text>
            </View>
            ))}
        </View>
        }
        {data?.certifications?.length > 0 && 
        <View style={styles.section}>
        <Text style={styles.subtitle}>CERTIFICATIONS</Text>
          {data?.certifications && data?.certifications?.map((certification)=>(
            <View style={{ marginBottom:5, marginTop:5 }} key={certification?._id}>
                <Text style={styles.textHeader}>
                  {certification?.title !== undefined ? certification?.title : ''}
                  {certification?.link !== undefined ? ' | ' + certification?.link : ''}
                </Text>
                <Text style={styles.text}>{ certification?.description }</Text>
            </View>
          ))}
      </View>
      }
      {data?.skill?.length > 0 && (
        <View>
          <Text style={styles.subtitle}>SKILLS</Text>
          <View style={{ flexDirection: 'row' }}>
              {data?.skill.map((skill, index)=>(
                <Text style={styles.text}>
                    {index === data?.skill?.length - 1 ? skill.skill + '.' : skill.skill + ', '}
                </Text>
              ))}
          </View>
        </View>
      )}
      </Page>
    </Document>
  )
}

export default ResumeDoc7