import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

import TopBar from '../home_page/TopBar';
import BottomBar from "../home_page/BottomBar";
import {THEME} from "../config";
import UserContent from "./UserContent";
import * as Cookie from "react-cookie";
import {useParams} from "react-router-dom";


function UserPage() {
    const [cookies, setCookies] = Cookie.useCookies(["token"])

    const {student_id} = useParams()

    return (
        <ThemeProvider theme={THEME}>
            <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
                {/*顶部栏*/}
                <TopBar cookies={cookies} setCookies={setCookies}/>
                {/*用户页面*/}
                <UserContent cookies={cookies} setCookies={setCookies} student_id={student_id}/>
                {/*底部栏*/}
                <BottomBar/>
            </Box>
        </ThemeProvider>
    );
}

export default UserPage;
