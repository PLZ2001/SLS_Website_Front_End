import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

import TopBar from '../home_page/TopBar';
import BottomBar from "../home_page/BottomBar";
import {THEME} from "../config";
import SignupContent from "./SignupContent";
import * as Cookie from "react-cookie";
import {CookieSetOptions} from "universal-cookie";


function SignupPage() {
    const [cookies, setCookies] = Cookie.useCookies(["token"])

    return (
        <ThemeProvider theme={THEME}>
            <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
                {/*顶部栏*/}
                <TopBar cookies={cookies} setCookies={setCookies}/>
                {/*注册面板*/}
                <SignupContent/>
                {/*底部栏*/}
                <BottomBar/>
            </Box>
        </ThemeProvider>
    );
}

export default SignupPage;
