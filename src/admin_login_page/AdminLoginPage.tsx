import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import * as Cookie from "react-cookie";

import TopBar from '../home_page/TopBar';
import BottomBar from "../home_page/BottomBar";
import {THEME} from "../config";
import AdminLoginContent from "./AdminLoginContent";


function AdminLoginPage() {
    const [cookies, setCookies] = Cookie.useCookies(["admin_token"])

    return (
        <ThemeProvider theme={THEME}>
            <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
                {/*登录面板*/}
                <AdminLoginContent setCookies={setCookies}/>
            </Box>
        </ThemeProvider>
    );
}

export default AdminLoginPage;
