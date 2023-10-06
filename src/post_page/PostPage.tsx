import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

import TopBar from '../home_page/TopBar';
import BottomBar from "../home_page/BottomBar";
import {THEME} from "../config";
import PostContent from "./PostContent";
import * as Cookie from "react-cookie";

import {useParams} from 'react-router-dom'


function PostPage() {
    const [cookies, setCookies] = Cookie.useCookies(["token"])

    const {post_id} = useParams()

    return (
        <ThemeProvider theme={THEME}>
            <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
                {/*顶部栏*/}
                <TopBar cookies={cookies} setCookies={setCookies}/>
                {/*论坛页面*/}
                <PostContent post_id={post_id} cookies={cookies} setCookies={setCookies}/>
                {/*底部栏*/}
                <BottomBar/>
            </Box>
        </ThemeProvider>
    );
}

export default PostPage;
