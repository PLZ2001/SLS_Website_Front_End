import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {API_STATUS, SERVER_PORT, SERVER_URL} from "../config";
import TopMenu from "../home_page/TopMenu";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {api_get_text, api_read_image_files_in_folder} from "../api/api";

function Introduction() {
    const navigate = useNavigate()

    const [texts, set_texts] = useState([{text: "", time: 0}]);

    useEffect(() => {
        api_get_text("introduction").then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_texts(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        });
    }, []);

    return (
        <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}} color={"p"}>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    山林寺课题组
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    SLS Research Group
                </Typography>
            </Box>
            <Box sx={{height: '10px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                {texts.length > 0 ? texts[0].text.length > 0 ?
                        <Box alignItems="center" sx={{width: '80%'}}>
                            <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                {texts[0].text}
                            </Typography>
                        </Box>
                        :
                        <CircularProgress color="primary"/>
                    :
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                        <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                            暂无
                        </Typography>
                    </Box>}
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
        </Paper>
    )
}

function Annual() {
    const navigate = useNavigate()

    const [annual, set_annual] = useState([{image: "", title: "", file_path: ""}]);

    useEffect(() => {
        api_read_image_files_in_folder("annual").then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                let _annual: [{ image: "", title: "", file_path: "" }] = result.data;
                set_annual(_annual.sort((a, b) => {
                    return a.title > b.title ? 1 : a.title < b.title ? -1 : 0
                }));
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
                    山林寺年报
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    SLS Annual
                </Typography>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Stack display="flex" justifyContent="center" alignItems="center" spacing={0} sx={{width: '80%'}}>
                    {annual.length > 0 ? annual[0].image.length > 0 ?
                            annual.map((val) => {
                                return (
                                    <Box sx={{
                                        width: '100%',
                                        height: '400px',
                                        backgroundImage: String('url(' + val.image + "?counter=" + Math.random() + ')'),
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center center',
                                        backgroundRepeat: 'no-repeat',
                                        borderRadius: '5px'
                                    }}/>
                                )
                            })
                            :
                            <CircularProgress color="primary"/>
                        :
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                            <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                暂无
                            </Typography>
                        </Box>
                    }
                </Stack>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
        </Paper>
    )
}

function AnnualContent() {
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
                        <Introduction/>
                        <Box sx={{height: '10px', width: '100%'}}/>
                        <Annual/>
                        <Box sx={{height: '50px', width: '100%'}}/>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default AnnualContent;
