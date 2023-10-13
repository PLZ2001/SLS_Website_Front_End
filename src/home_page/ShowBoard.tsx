import React from 'react';
import Box from "@mui/material/Box";
import {SERVER_PORT, SERVER_URL} from "../config";
import TopMenu from "./TopMenu";


function ShowBoard() {
    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(to right, #B1B8BF, #B1B8BF, #ABB3BA, #A9B1B7, #AAB1B8)',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px'
        }}>
            <Box sx={{
                width: '100%',
                backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/images/others/home_sls_1.webp' + ')'),
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px'
            }}>
                <Box sx={{height: '10px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <TopMenu/>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <img src={"http://" + SERVER_URL + ":" + SERVER_PORT + "/images/others/home_slslogo_1.webp"}
                         alt="山林寺logo" loading="lazy" width="30%" style={{paddingTop: '5%', paddingBottom: '3%'}}/>
                </Box>
            </Box>
        </Box>
    )
}

export default ShowBoard;
