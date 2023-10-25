import React, {useEffect} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import * as Cookie from "react-cookie";
import {THEME} from "../config";
import AdminLoginContent from "./AdminLoginContent";


function AdminLoginPage() {
    const [, setCookies] = Cookie.useCookies(["admin_token"])

    useEffect(() => {
        document.title = `管理员登录 - 山林寺课题组`
    }, [])

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
