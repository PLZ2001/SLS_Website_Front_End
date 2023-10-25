import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import {useLocation} from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


function AdminErrorPage() {
    const {state: {error}} = useLocation()

    useEffect(() => {
        document.title = `错误 - 山林寺课题组网站管理系统`
    }, [])

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{width: `100%`}}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        山林寺课题组网站管理系统
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Toolbar/>
                <Typography>{error ? error : "抱歉，出了些问题"}</Typography>
            </Box>
        </Box>
    );
}

export default AdminErrorPage;
