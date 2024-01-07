import React, {useEffect, useState} from 'react';
import FTPContent from "./FTPContent";
import * as Cookie from "react-cookie";
import {useParams} from "react-router-dom";


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
