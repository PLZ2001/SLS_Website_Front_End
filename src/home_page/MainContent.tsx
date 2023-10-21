import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {_getDate, API_STATUS} from '../config';
import CircularProgress from "@mui/material/CircularProgress";
import {api_get_sls_members, api_read_image_files_in_folder} from "../api/api";
import {useNavigate} from "react-router-dom";
import Link from "@mui/material/Link";


function SlsMembersGrid(p: { sls_members_list: { image: string, name: string, description: string, url: string }[], photo_width: string, col: number, name_font_size: string, description_font_size: string }) {
    const [formatted_time, set_formatted_time] = useState("")
    const [time_stamp, set_time_stamp] = useState(0)
    const get_time_now = () => {
        const date = new Date();
        const time_stamp = date.getTime() / 1000;
        const formatted_time = _getDate(time_stamp);
        return {"formatted_time": formatted_time, "time_stamp": time_stamp};
    }
    setInterval(() => {
        const result = get_time_now();
        set_formatted_time(result.formatted_time);
        set_time_stamp(result.time_stamp);
    }, 1000)

    const [counter_for_image_updating, set_counter_for_image_updating] = useState(0);

    useEffect(()=>{
        set_counter_for_image_updating(time_stamp);
    }, [])

    return (
        <Grid container spacing={0}>
            {p.sls_members_list.map((item) => (
                <Grid xs={12 / p.col}>
                    <Stack display="flex" justifyContent="center" alignItems="center" spacing={0} sx={{padding: '5%'}}>
                        <Link href={item.url} underline="hover" display="flex" justifyContent="center" alignItems="center" sx={{width:'100%', height:'100%'}}>
                            <img
                                src={item.image+"?counter="+counter_for_image_updating}
                                alt={item.name}
                                style={{paddingTop: '3%', paddingBottom: '3%'}}
                                width={p.photo_width}
                                loading="lazy"
                            />
                        </Link>
                        <Link href={item.url} underline="hover" textAlign="center"
                              sx={{fontWeight: 'bold', fontSize: String(p.name_font_size), letterSpacing: 6}}>
                            {item.name}
                        </Link>
                        <Typography textAlign="center" sx={{fontSize: String(p.description_font_size)}}>
                            {item.description}
                        </Typography>
                    </Stack>
                </Grid>
            ))}
        </Grid>
    )
}

function SlsMembers() {
    const navigate = useNavigate()

    const [sls_members, set_sls_members] = useState({
        teachers: [{name: "", description: "", image: "", student_id: "", introduction: "", email: "", phone_number: "", papers:[[""]], paper_years:[""], url:""}],
        students: [{name: "", description: "", image: "", student_id: "", introduction: "", email: "", phone_number: "", papers:[[""]], paper_years:[""], url:""}],
        graduates: [{name: "", description: "", image: "", student_id: "", introduction: "", email: "", phone_number: "", papers:[[""]], paper_years:[""], url:""}],
    });


    useEffect(() => {
        api_get_sls_members().then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_sls_members(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        });
    }, []);

    const sls_teachers = sls_members.teachers;
    const sls_students = sls_members.students;
    const sls_graduates = sls_members.graduates;

    return (
        <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    山林寺课题组领衔名师
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    Teachers of the Research Group
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '80%'}}>
                    {sls_teachers.length > 0 ? sls_teachers[0].name.length > 0 ?
                            <SlsMembersGrid sls_members_list={sls_teachers} photo_width={"50%"} col={2}
                                            name_font_size={"h6.fontSize"} description_font_size={"subtitle1.fontSize"}/>
                            :
                            <CircularProgress color="primary"/>
                        :
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                            <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                暂无
                            </Typography>
                        </Box>
                    }
                </Box>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    山林寺课题组在读研究生
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    Graduate Students of the Research Group
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '80%'}}>
                    {sls_students.length > 0 ? sls_students[0].name.length > 0 ?
                            <SlsMembersGrid sls_members_list={sls_students} photo_width={"80%"} col={6}
                                            name_font_size={"h6.fontSize"} description_font_size={"subtitle1.fontSize"}/>
                            :
                            <CircularProgress color="primary"/>
                        :
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                            <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                暂无
                            </Typography>
                        </Box>
                    }
                </Box>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    山林寺课题组毕业生
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    Graduates of the Research Group
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '80%'}}>
                    {sls_graduates.length > 0 ? sls_graduates[0].name.length > 0 ?
                            <SlsMembersGrid sls_members_list={sls_graduates} photo_width={"90%"} col={8}
                                            name_font_size={"h6.fontSize"} description_font_size={"subtitle1.fontSize"}/>
                            :
                            <CircularProgress color="primary"/>
                        :
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                            <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                暂无
                            </Typography>
                        </Box>
                    }
                </Box>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
        </Paper>
    )
}

function PhotoWall() {
    const navigate = useNavigate()

    const [photo_wall, set_photo_wall] = useState([{image: "", title: ""}]);

    useEffect(() => {
        api_read_image_files_in_folder().then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_photo_wall(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [])

    return (
        <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    照片墙
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    Photo Wall
                </Typography>
            </Box>
            <Box sx={{height: '10px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                {photo_wall.length > 0 ? photo_wall[0].image.length > 0 ?
                        <Box sx={{width: '80%', height: '600px', overflowY: 'scroll'}}>
                            <ImageList variant="masonry" cols={3} gap={8}>
                                {photo_wall.map((item) => (
                                    <ImageListItem key={item.image}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Box>
                        :
                        <CircularProgress color="primary"/>
                    :
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                        <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                            暂无
                        </Typography>
                    </Box>
                }
            </Box>
            <Box sx={{height: '60px', width: '100%'}}/>
        </Paper>
    )
}

function MainContent() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{
            background: 'linear-gradient(to right, #B1B8BF, #B1B8BF, #ABB3BA, #A9B1B7, #AAB1B8)',
            width: '100%',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px'
        }}>
            <Stack spacing={2} sx={{width: '80%'}}>
                <Box sx={{height: '10px', width: '100%'}}/>
                {/*山林寺成员*/}
                <SlsMembers/>
                <Box sx={{height: '10px', width: '100%'}}/>
                {/*照片墙*/}
                <PhotoWall/>
                <Box sx={{height: '50px', width: '100%'}}/>
            </Stack>
        </Box>
    )
}

export default MainContent;
