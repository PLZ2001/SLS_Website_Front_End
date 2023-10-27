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

    const {path_origin} = useParams()
    const [path, set_path] = useState("")
    useEffect(()=>{
        if (path_origin) {
            set_path(path_origin.replaceAll(">", "/"))
        }
    }, [path_origin])

    useEffect(() => {
        document.title = `文件浏览 - ${path} - 山林寺课题组`
    }, [path])



    return (
        <FTPContent path={path}/>
    );
}

export default FTPPage;
