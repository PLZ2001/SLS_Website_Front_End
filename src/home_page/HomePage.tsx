import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

import TopBar from './TopBar';
import ShowBoard from './ShowBoard';
import MainContent from "./MainContent";
import BottomBar from "./BottomBar";
import {THEME} from "../config";
import * as Cookie from "react-cookie";
import {CookieSetOptions} from "universal-cookie";


function HomePage() {
    const [cookies, setCookies] = Cookie.useCookies(["token"])

    return (
        <ThemeProvider theme={THEME}>
            <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
                {/*顶部栏*/}
                <TopBar cookies={cookies} setCookies={setCookies}/>
                {/*展示栏*/}
                <ShowBoard/>
                {/*主体内容*/}
                <MainContent/>
                {/*底部栏*/}
                <BottomBar/>
            </Box>
        </ThemeProvider>
    );
}

export default HomePage;