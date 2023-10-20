import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import * as Cookie from "react-cookie";

import TopBar from '../home_page/TopBar';
import BottomBar from "../home_page/BottomBar";
import {THEME} from "../config";
import AdminLoginContent from "./AdminLoginContent";


function AdminLoginPage() {
    const [cookies, setCookies] = Cookie.useCookies(["token"])


    return (
        <ThemeProvider theme={THEME}>
            <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
                {/*顶部栏*/}
                <TopBar cookies={cookies} setCookies={setCookies}/>
                {/*登录面板*/}
                <AdminLoginContent setCookies={setCookies}/>
                {/*底部栏*/}
                <BottomBar/>
            </Box>
        </ThemeProvider>
    );
}

export default AdminLoginPage;
