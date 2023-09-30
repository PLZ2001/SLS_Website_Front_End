import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {SERVER_URL, SERVER_PORT} from "../config";

function TopBar() {
    return (
        <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
            <Box sx={{height: '3px', width: '100%'}}/>
            <Grid container spacing={0}>
                <Grid xs={0.25}/>
                <Grid xs={9}>
                    <Stack display="flex" justifyContent="start" alignItems="center" direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{height: '40px'}}>
                        <a href="https://www.zju.edu.cn/">
                            <img src={"http://"+SERVER_URL+":"+SERVER_PORT+"/images/others/home_zju_1.png"} alt= "浙江大学" loading="lazy" height="50px"/>
                        </a>
                        {/*<Box display="flex" justifyContent="center" alignItems="center" sx={{paddingTop: '5px', height: '30px'}}>*/}
                        {/*    /!*<Typography sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>*!/*/}
                        {/*    /!*    电力能源互联及其智能化研究所-山林寺课题组*!/*/}
                        {/*    /!*</Typography>*!/*/}
                        {/*</Box>*/}
                    </Stack>
                </Grid>
                <Grid xs={2.5} display="flex" justifyContent="end">
                    <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{paddingTop: '5px', height: '30px'}}>
                        <Link to={`/login`}>
                            <Button sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3, height: "30px"}}>登录</Button>
                        </Link>
                        <Link to={`/signup`}>
                            <Button sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3, height: "30px"}}>注册</Button>
                        </Link>
                    </ButtonGroup>
                </Grid>
                <Grid xs={0.25}/>
            </Grid>
            <Box sx={{height: '3px', width: '100%'}}/>
        </Box>
    )
}

export default TopBar;
