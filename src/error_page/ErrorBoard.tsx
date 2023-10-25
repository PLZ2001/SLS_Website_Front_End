import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import {SERVER_PORT, SERVER_URL} from "../config";
import TopMenu from "../home_page/TopMenu";

function ErrorBoard(p: { error: any }) {
    const route_error = useRouteError();
    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(to right, #ADB5BB, #ADB5BB, #ACB4BA, #ABB3B9, #AAB0B7)',
            borderTopLeftRadius: '20px',
            borderRadius: '20px',
            minHeight: 'calc(100vh - 92px)'
        }}>
            <Box sx={{
                width: '100%',
                backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/images/others/home_sls_1.webp' + ')'),
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
                borderRadius: '20px',
                minHeight: 'calc(100vh - 92px)'
            }}>
                <Box sx={{height: '10px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <TopMenu/>
                </Box>
                <Box sx={{height: '100px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Typography color='black' sx={{fontWeight: 'bold', fontSize: 'h3.fontSize'}}>
                        {(isRouteErrorResponse(route_error) ? "错误：" + route_error.status + " " + route_error.statusText : p.error ? String(p.error) : "抱歉，出了些问题")}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Typography color='black' sx={{fontWeight: 'bold', fontSize: 'h5.fontSize'}}>
                        {(isRouteErrorResponse(route_error) ? "详细信息：" + route_error.data : "")}
                    </Typography>
                </Box>
                <Box sx={{height: '150px', width: '100%'}}/>
            </Box>
        </Box>
    )
}

export default ErrorBoard;
