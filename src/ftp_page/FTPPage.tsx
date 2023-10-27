import React, {useEffect,useState} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

import TopBar from '../home_page/TopBar';
import BottomBar from "../home_page/BottomBar";
import {API_STATUS, THEME} from "../config";
import FTPContent from "./FTPContent";
import * as Cookie from "react-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {api_get_user_profile} from "../api/api";


function FTPPage() {
    const [cookies, setCookies] = Cookie.useCookies(["token"])

    useEffect(() => {
        document.title = `文件浏览 - 山林寺课题组`
    }, [])

    return (
        <FTPContent/>
    );
}

export default FTPPage;
