import React, {useEffect} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

import TopBar from '../home_page/TopBar';
import BottomBar from "../home_page/BottomBar";
import {THEME} from "../config";
import ForumContent from "./ForumContent";
import * as Cookie from "react-cookie";


function ForumPage() {
    const [cookies, setCookies] = Cookie.useCookies(["token"])

    useEffect(() => {
        document.title = `山林寺论坛 - 山林寺课题组`
    }, [])

    return (
        <ThemeProvider theme={THEME}>
            <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
                {/*顶部栏*/}
                <TopBar cookies={cookies} setCookies={setCookies}/>
                {/*论坛页面*/}
                <ForumContent cookies={cookies} setCookies={setCookies}/>
                {/*底部栏*/}
                <BottomBar/>
            </Box>
        </ThemeProvider>
    );
}

export default ForumPage;
