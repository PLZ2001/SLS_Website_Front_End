import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {API_STATUS, SERVER_PORT, SERVER_URL} from "../config";
import TopMenu from "../home_page/TopMenu";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {api_get_text} from "../api/api";

function Contact() {
    const navigate = useNavigate()

    const [texts, set_texts] = useState([{text: "", time: 0}]);

    useEffect(() => {
        api_get_text("contact").then((result) => {
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
                    联系我们
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    Contact Us
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

function ContactContent() {
    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(to right, #ADB5BB, #ADB5BB, #ACB4BA, #ABB3B9, #AAB0B7)',
            borderRadius: '20px',
            minHeight: `calc(1500px / ${window.innerWidth} * ${window.innerHeight} - 92px)`
        }}>
            <Box sx={{
                width: '100%',
                backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/images/others/home_sls_1.webp' + ')'),
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
                borderRadius: '20px',
                minHeight: `calc(1500px / ${window.innerWidth} * ${window.innerHeight} - 92px)`
            }}>
                <Box sx={{height: '10px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <TopMenu/>
                </Box>
                <Box sx={{height: '20px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Stack spacing={2} sx={{width: '80%'}}>
                        <Box sx={{height: '10px', width: '100%'}}/>
                        <Contact/>
                        <Box sx={{height: '50px', width: '100%'}}/>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default ContactContent;
