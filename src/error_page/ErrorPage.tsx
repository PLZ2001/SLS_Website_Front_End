import React, {useEffect} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

import TopBar from '../home_page/TopBar';
import BottomBar from "../home_page/BottomBar";
import ErrorBoard from "./ErrorBoard";
import {THEME} from "../config";
import * as Cookie from "react-cookie";
import {useLocation} from 'react-router-dom';


function ErrorPage() {
    const [cookies, setCookies] = Cookie.useCookies(["token"])
    // 页面有输入参数error
    const {state: {error}} = useLocation()

    useEffect(() => {
        document.title = `错误 - 山林寺课题组`
    }, [])

    return (
        <ThemeProvider theme={THEME}>
            <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
                {/*顶部栏*/}
                <TopBar cookies={cookies} setCookies={setCookies}/>
                {/*错误栏*/}
                <ErrorBoard error={error}/>
                {/*底部栏*/}
                <BottomBar/>
            </Box>
        </ThemeProvider>
    );
}

export default ErrorPage;
