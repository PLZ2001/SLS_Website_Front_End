import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouteError, isRouteErrorResponse} from "react-router-dom";
import {SERVER_PORT, SERVER_URL} from "../config";
import TopMenu from "../home_page/TopMenu";

function ErrorBoard() {
    const error = useRouteError();
    return (
        <Box sx={{width: '100%', background:'linear-gradient(to right, #B1B8BF, #B1B8BF, #ABB3BA, #A9B1B7, #AAB1B8)', borderTopLeftRadius:'20px', borderRadius:'20px'}}>
            <Box sx={{width: '100%', backgroundImage: String('url('+'http://'+SERVER_URL+':'+SERVER_PORT+'/images/others/home_sls_1.png'+')'), backgroundSize: '100% auto', backgroundRepeat:'no-repeat', borderRadius:'20px'}}>
                <Box sx={{height: '10px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <TopMenu/>
                </Box>
                <Box sx={{height: '100px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Typography color='black' sx={{fontWeight: 'bold', fontSize: 'h3.fontSize'}}>
                        {"错误：" + (isRouteErrorResponse(error) ? error.status + " " + error.statusText : "未知错误")}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Typography color='black' sx={{fontWeight: 'bold', fontSize: 'h5.fontSize'}}>
                        {"详细信息：" + (isRouteErrorResponse(error) ? error.data: "未知")}
                    </Typography>
                </Box>
                <Box sx={{height: '150px', width: '100%'}}/>
            </Box>
        </Box>
    )
}

export default ErrorBoard;
