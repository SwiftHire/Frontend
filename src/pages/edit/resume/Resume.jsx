import React, { forwardRef } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Stack from '@mui/material/Stack';
import { FaLinkedin } from 'react-icons/fa';
import { BsPhoneVibrateFill } from 'react-icons/bs';
import { MdLocationOn, MdEmail } from 'react-icons/md';
import { wordFormatter } from '../../../utils/wordFormatter';
import { dateFomatted } from '../../../utils/dateFomatted';


// Import the Merriweather font

const Resume = forwardRef(({ data }, docReference) => {


    return (
        <Container style={{ backgroundColor: '#FFF', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', borderRadius: '10px', padding: '20px 50px' }} >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    paddingY: '15px',
                    paddingX: '16px',
                    marginX: '20px',
                }}
            >
                <Box>
                    <Typography
                        variant="h1"
                        textTransform={'capitalize'}
                        fontSize={'30px'}
                        lineHeight={'38px'}
                        fontWeight={'600'}
                        textAlign={'center'}
                        color={'#283d56'}
                        fontFamily={'Merriweather'}
                    >
                        {data?.name}
                    </Typography>
                    <Stack spacing={2} direction="row">
                        {data?.city && (
                            <Stack spacing={0.5} direction="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="span" color={'#283d56'}>
                                    <MdLocationOn
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    />
                                </Typography>
                                <Typography
                                    variant="span"
                                    fontSize={'14px'}
                                    pt={'5px'}
                                    color={'#283d56'}
                                >
                                    <em>{data?.city}, {data?.country}</em>
                                </Typography>
                            </Stack>
                        )}
                        {data?.email && (
                            <Stack spacing={0.5} direction="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="span" color={'#283d56'}>
                                    <MdEmail
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    />
                                </Typography>
                                <Typography
                                    variant="span"
                                    fontSize={'14px'}
                                    pt={'5px'}
                                    color={'#283d56'}
                                >
                                    <a
                                        href={data?.email}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            textDecoration: 'none',
                                            color: '#283d56',
                                        }}
                                    >
                                        <em>{data?.email}</em>
                                    </a>
                                </Typography>
                            </Stack>
                        )}
                        {data?.linkedin && (
                            <Stack spacing={1} direction="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="span" color={'#283d56'}>
                                    <FaLinkedin
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    />
                                </Typography>
                                <Typography
                                    variant="span"
                                    fontSize={'14px'}
                                    pt={'5px'}
                                    color={'#283d56'}
                                >
                                    <a
                                        href={data?.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            textDecoration: 'none',
                                            color: '#283d56',
                                        }}
                                    >
                                        <em>{data?.linkedin}</em>
                                    </a>
                                </Typography>
                            </Stack>
                        )}
                        {data?.phone && (
                            <Stack spacing={1} direction="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="span" color={'#283d56'}>
                                    <BsPhoneVibrateFill
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    />
                                </Typography>
                                <Typography
                                    variant="span"
                                    fontSize={'14px'}
                                    pt={'5px'}
                                    color={'#283d56'}
                                >
                                    <a
                                        href={data?.phone}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            textDecoration: 'none',
                                            color: '#283d56',
                                        }}
                                    >
                                        <em>{data?.phone}</em>
                                    </a>
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </Box>
            </Box>
            <hr
                style={{
                    background: '#4D4D5C',
                    borderColor: '#4D4D5C',
                    height: '1px',
                }}
            />
            {
                data?.summary && <>
                    <Box mb={'15px'}>
                    <Typography
                        variant="h1"
                        textTransform={'capitalize'}
                        fontSize={'20px'}
                        lineHeight={'30px'}
                        fontWeight={'800'}
                        textAlign={'left'}
                        borderBottom={'1px solid #283d56'}
                        color={'#283d56'}
                        mb={'10px'}
                        fontFamily={'Merriweather'}
                    >
                        SUMMARY
                    </Typography>
                    <Typography
                        variant="p"
                        fontSize={'18px'}
                        lineHeight={'24px'}
                        fontWeight={'500'}
                        textAlign={'left'}
                        color={'#283d56'}
                        fontFamily={'Merriweather'}
                    >
                        {data?.summary}
                    </Typography>
                </Box>
                <hr
                    style={{
                        background: '#4D4D5C',
                        borderColor: '#4D4D5C',
                        height: '1px',
                    }}
                />
                </>
            }
            {/* experience start */}
            {data?.workExperience?.length > 0 &&
                <>
                    <Box mb={'15px'}>
                        <Typography
                            variant="h1"
                            textTransform={'capitalize'}
                            fontSize={'20px'}
                            lineHeight={'30px'}
                            fontWeight={'800'}
                            textAlign={'left'}
                            borderBottom={'1px solid #283d56'}
                            color={'#283d56'}
                            mb={'10px'}
                            fontFamily={'Merriweather'}
                        >
                            EXPERIENCE
                        </Typography>
                        {data?.workExperience && data?.workExperience?.map((item, index) => {
                            return (
                                <Box key={index}>
                                    <Typography
                                        variant="h2"
                                        color={'#283d56'}
                                        fontSize={'20px'}
                                        lineHeight={'24px'}
                                        fontWeight={'600'}
                                        textAlign={'left'}
                                        fontFamily={'Merriweather'}
                                        mt={'20px'}
                                        pb="5px"
                                    >
                                        {item?.title !== undefined ? item?.title : '' }
                                        {item.company !== undefined ? ' | ' + item?.company + ' ' : ''} 
                                        {item?.location !== undefined ? '| ' + item?.location : ''} 
                                        {item?.dateStart !== undefined ? ' | ' + item?.dateStart : ''}
                                        {item?.dateEnd !== undefined ? ' - ' + item?.dateEnd : ''}
                                    </Typography>
                                    <Box display={'flex'} flexDirection={'column'}>
                                        {item?.bulletPoints && item?.bulletPoints?.map((keypoint, i) => {
                                            return (
                                                <Typography
                                                    variant="p"
                                                    fontSize={'18px'}
                                                    lineHeight={'24px'}
                                                    fontWeight={'400'}
                                                    textAlign={'left'}
                                                    color={'#283d56'}
                                                    fontFamily={'Merriweather'}
                                                    key={i}
                                                >
                                                    {keypoint}
                                                </Typography>
                                            );
                                        })}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>

                    <hr
                        style={{
                            background: '#CBC7C6',
                            borderColor: '#CBC7C6',
                            height: '1px',
                        }}
                    />
                </>
            }

            {/* experience end */}

            {/* education start */}
            {data?.education?.length > 0 &&
                <>
                    <Box mb={'15px'}>
                        <Typography
                            variant="h1"
                            textTransform={'capitalize'}
                            fontSize={'20px'}
                            lineHeight={'30px'}
                            fontWeight={'600'}
                            textAlign={'left'}
                            borderBottom={'1px solid #283d56'}
                            color={'#283d56'}
                            fontFamily={'Merriweather'}
                            mb={'10px'}
                        >
                            EDUCATION
                        </Typography>
                        {data?.education?.map((item, index) => {
                            return (
                                <Box key={index}>
                                    <Typography
                                        variant="h2"
                                        color={'#283d56'}
                                        fontSize={'18px'}
                                        lineHeight={'22px'}
                                        fontWeight={'600'}
                                        textAlign={'left'}
                                        fontFamily={'Merriweather'}
                                        py="3px"
                                    >
                                        {item?.degree && `${item.degree} | `}
                                        {item?.fieldOfStudy && `${item.fieldOfStudy} | `}
                                        {item?.institution && `${item.institution} | `}
                                        {item?.location && `${item.location}`}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                    <hr
                        style={{
                            background: '#CBC7C6',
                            borderColor: '#CBC7C6',
                            height: '1px',
                        }}
                    />
                </>
            }
            {/* education end */}

            {/* project start */}
            {data?.projects?.length > 0 &&
                <>
                    <Box mb={'15px'}>
                        <Typography
                            variant="h1"
                            textTransform={'capitalize'}
                            fontSize={'20px'}
                            lineHeight={'30px'}
                            fontWeight={'600'}
                            textAlign={'left'}
                            borderBottom={'1px solid #283d56'}
                            color={'#283d56'}
                            fontFamily={'Merriweather'}
                            mb={'10px'}
                        >
                            PROJECTS
                        </Typography>
                        {data?.projects?.map((item, index) => {
                            return (
                                <Box key={index}>
                                    <Typography
                                        variant="h2"
                                        color={'#283d56'}
                                        fontSize={'18px'}
                                        lineHeight={'22px'}
                                        fontWeight={'600'}
                                        textAlign={'left'}
                                        fontFamily={'Merriweather'}
                                        py="3px"
                                    >
                                        {item?.title && `${item.title} `}
                                    </Typography>
                                    <Typography
                                        variant="p"
                                        fontSize={'18px'}
                                        lineHeight={'24px'}
                                        fontWeight={'400'}
                                        textAlign={'left'}
                                        color={'#283d56'}
                                        fontFamily={'Merriweather'}
                                        py="3px"
                                    >
                                        {item?.description && `${item.description} `}
                                    </Typography>
                                    <Typography
                                        variant="h2"
                                        color={'#283d56'}
                                        fontSize={'18px'}
                                        lineHeight={'22px'}
                                        fontWeight={'600'}
                                        textAlign={'left'}
                                        fontFamily={'Merriweather'}
                                        py="3px"
                                    >
                                        {item?.link && `${item.link} `}
                                    </Typography>
                                    <Typography
                                        variant="h2"
                                        color={'#283d56'}
                                        fontSize={'18px'}
                                        lineHeight={'22px'}
                                        fontWeight={'600'}
                                        textAlign={'left'}
                                        fontFamily={'Merriweather'}
                                        py="3px"
                                    >
                                        {item?.projectRole && `${item.projectRole} `}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                    <hr
                        style={{
                            background: '#CBC7C6',
                            borderColor: '#CBC7C6',
                            height: '1px',
                        }}
                    />
                </>
            }
            {/* end of project */}

            {/* certifications start */}

            {data?.certifications?.length > 0 &&
                <>
                    <Box mb={'15px'}>
                        <Typography
                            variant="h1"
                            textTransform={'capitalize'}
                            fontSize={'20px'}
                            lineHeight={'30px'}
                            fontWeight={'600'}
                            textAlign={'left'}
                            borderBottom={'1px solid #283d56'}
                            color={'#283d56'}
                            fontFamily={'Merriweather'}
                            mb={'10px'}
                        >
                            CERTIFICATIONS
                        </Typography>
                        {data?.certifications?.map((item, index) => {
                            return (
                                <Box key={index}>
                                    <Typography
                                        variant="h2"
                                        color={'#283d56'}
                                        fontSize={'18px'}
                                        lineHeight={'22px'}
                                        fontWeight={'600'}
                                        textAlign={'left'}
                                        fontFamily={'Merriweather'}
                                        py="3px"
                                    >
                                        {item?.title && `${wordFormatter(item.title)} `}
                                    </Typography>
                                    <Typography
                                        variant="p"
                                        fontSize={'18px'}
                                        lineHeight={'24px'}
                                        fontWeight={'400'}
                                        textAlign={'left'}
                                        color={'#283d56'}
                                        fontFamily={'Merriweather'}
                                        py="3px"
                                    >
                                        {item?.description &&
                                            `${item.description} `}
                                    </Typography>
                                    <Typography
                                        variant="h2"
                                        color={'#283d56'}
                                        fontSize={'18px'}
                                        lineHeight={'22px'}
                                        fontWeight={'600'}
                                        textAlign={'left'}
                                        py="3px"
                                    >
                                        {item?.link && `${item.link} `}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                    <hr
                        style={{
                            background: '#CBC7C6',
                            borderColor: '#CBC7C6',
                            height: '1px',
                        }}
                    />
                </>
            }

            {/* certifications end */}

            {/* skills start */}
            {data?.skills.length > 0  &&
                <>
                    <Box mb={'15px'}>
                        <Typography
                            variant="h1"
                            textTransform={'capitalize'}
                            fontSize={'20px'}
                            lineHeight={'30px'}
                            fontWeight={'600'}
                            textAlign={'left'}
                            borderBottom={'1px solid #283d56'}
                            color={'#283d56'}
                            fontFamily={'Merriweather'}
                            mb={'10px'}
                        >
                            SKILLS
                        </Typography>
                            <>
                                {data?.skill && data?.skill.map((skill, index)=>(
                                    <Typography
                                        key={index}
                                        variant="span"
                                        color={'#283d56'}
                                        fontSize={'18px'}
                                        lineHeight={'22px'}
                                        fontWeight={'600'}
                                        textAlign={'left'}
                                        fontFamily={'Merriweather'}
                                        py="3px"
                                    >
                                        {index === data.skill?.length - 1 ? skill.skill + '.' : skill.skill + ', '}
                                    </Typography>
                                ))}
                            </>
                    </Box>
                </>
            }
            {/* skills end */}
        </Container>
    )
})

export default Resume