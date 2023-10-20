import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {_getDate, _hash, API_STATUS, MAX_PIECES, POST_PIECES, SERVER_PORT, SERVER_URL} from "../config";
import TopMenu from "../home_page/TopMenu";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import {
    api_get_user_profile_with_student_id,
    api_get_sls_member_profile_with_student_id,
} from "../api/api";
import Divider from "@mui/material/Divider";

function SlsMemberProfile(p: { student_id: string }) {
    const navigate = useNavigate()

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

    const [sls_member_profile, set_sls_member_profile] = useState({name: "", description: "", image: "", student_id: "", introduction: "", email: "", phone_number: "", papers:[[""]], paper_years:[""], url:""});

    useEffect(() => {
        api_get_sls_member_profile_with_student_id(p.student_id).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_sls_member_profile(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [])

    return (
        <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}} color={"p"}>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    山林寺成员信息
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    SLS Member Profile
                </Typography>
            </Box>
            <Box sx={{height: '20px', width: '100%'}}/>
            {sls_member_profile.name.length > 0 ?
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Stack display="flex" justifyContent="center" alignItems="center" spacing={5} sx={{width: '100%'}}>
                    <Grid container spacing={0} sx={{width:"80%"}} display="flex" justifyContent="center" alignItems="center">
                        <Grid xs={3}>
                            <Stack display="flex" justifyContent="center" alignItems="center" spacing={0} sx={{padding: '5%'}}>
                                <img
                                    src={sls_member_profile.image+"?counter="+counter_for_image_updating}
                                    alt={sls_member_profile.name}
                                    style={{paddingTop: '3%', paddingBottom: '3%'}}
                                    width="80%"
                                    loading="lazy"
                                />
                            </Stack>
                        </Grid>
                        <Grid xs={9}>
                            <Stack display="flex" justifyContent="center" alignItems="center" spacing={5} sx={{width: '100%'}}>
                                <Stack display="flex" justifyContent="center" alignItems="start" direction="row" spacing={0}
                                       sx={{width: '100%'}}>
                                    <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '33.3%'}}>
                                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width:'100%'}}>
                                            <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                                姓名
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width:'100%'}}>
                                            <Typography sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                                {sls_member_profile.name}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '33.3%'}}>
                                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width:'100%'}}>
                                            <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                                学号
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width:'100%'}}>
                                            <Typography sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                                {sls_member_profile.student_id}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '33.3%'}}>
                                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width:'100%'}}>
                                            <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                                简介
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="center" alignItems="center"
                                             sx={{width: '100%'}}>
                                            <Typography sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                                {sls_member_profile.description}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                                <Stack display="flex" justifyContent="center" alignItems="start" direction="row" spacing={0}
                                       sx={{width: '100%'}}>
                                    <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '50%'}}>
                                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width:'100%'}}>
                                            <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                                电子邮件
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="center" alignItems="center"
                                             sx={{width: '100%'}}>
                                            <Typography sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                                {sls_member_profile.email}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '50%'}}>
                                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width:'100%'}}>
                                            <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                                电话号码
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="center" alignItems="center"
                                             sx={{width: '100%'}}>
                                            <Typography sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                                {sls_member_profile.phone_number}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Stack display="flex" justifyContent="center" alignItems="start" direction="row" spacing={0}
                           sx={{width: '80%'}}>
                        <Stack display="flex" justifyContent="center" alignItems="center" spacing={1} divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '100%'}}>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width:'100%'}}>
                                <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                    个人介绍
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="start" alignItems="center" sx={{width: '90%'}}>
                                <Typography color="text.secondary"
                                            sx={{fontSize: 'subtitle1.fontSize'}}>
                                    {sls_member_profile.introduction}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack display="flex" justifyContent="center" alignItems="start" direction="row" spacing={0}
                           sx={{width: '80%'}}>
                        <Stack display="flex" justifyContent="center" alignItems="center" spacing={1} divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '100%'}}>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width:'100%'}}>
                                <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                    论文
                                </Typography>
                            </Box>
                            {sls_member_profile.paper_years.length > 0 ?
                                <Stack spacing={0} sx={{width: '100%'}}>
                                    {sls_member_profile.paper_years.map((val, idx) => {
                                        return (
                                            <Stack display="flex" justifyContent="center" alignItems="center"
                                                   spacing={0} sx={{width: '100%'}}>
                                                <Box display="flex" justifyContent="start" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Typography color="text.secondary" sx={{
                                                        fontWeight: 'bold',
                                                        fontSize: 'subtitle1.fontSize'
                                                    }}>
                                                        {val + "："}
                                                    </Typography>
                                                </Box>
                                                {sls_member_profile.papers[idx].map((val, idx) => {
                                                    return (
                                                        <Box display="flex" justifyContent="start"
                                                             alignItems="center" sx={{width: '90%'}}>
                                                            <Typography color="text.secondary"
                                                                        sx={{fontSize: 'subtitle1.fontSize'}}>
                                                                {"[" + (idx + 1) + "]" + " " + val}
                                                            </Typography>
                                                        </Box>
                                                    )
                                                })}
                                            </Stack>
                                        )
                                    })}
                                </Stack>
                                :
                                <Box display="flex" justifyContent="start" alignItems="center"
                                     sx={{width: '90%'}}>
                                    <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                        小僧正在努力中~
                                    </Typography>
                                </Box>
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
            :
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <CircularProgress color="primary"/>
            </Box>
            }
            <Box sx={{height: '40px', width: '100%'}}/>
        </Paper>
    )
}

function SlsMemberContent(p: { student_id: string | undefined }) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!p.student_id) {
            navigate(`/error`, {replace: false, state: {error: "该用户不存在"}})
        }
    }, [])

    const [user_profile, set_user_profile] = useState({student_id: "", name: "", sls_verification: false});

    useEffect(() => {
        if (p.student_id) {
            api_get_user_profile_with_student_id(p.student_id).then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_user_profile(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            })
        } else {
            set_user_profile({student_id: "", name: "", sls_verification: false});
        }
    }, [])

    useEffect(() => {
        if (user_profile.student_id.length>0 && !user_profile.sls_verification) {
            navigate(`/error`, {replace: false, state: {error: "该用户无山林寺认证信息"}})
        }
    }, [])

    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(to right, #B1B8BF, #B1B8BF, #ABB3BA, #A9B1B7, #AAB1B8)',
            borderRadius: '20px'
        }}>
            <Box sx={{
                width: '100%',
                backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/images/others/home_sls_1.webp' + ')'),
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
                borderRadius: '20px'
            }}>
                <Box sx={{height: '10px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <TopMenu/>
                </Box>
                <Box sx={{height: '20px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Stack spacing={2} sx={{width: '80%'}}>
                        <Box sx={{height: '10px', width: '100%'}}/>
                        {user_profile.sls_verification && <SlsMemberProfile student_id={user_profile.student_id}/>}
                        <Box sx={{height: '50px', width: '100%'}}/>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default SlsMemberContent;
