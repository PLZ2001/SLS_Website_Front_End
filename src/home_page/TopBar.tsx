import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import {API_STATUS, SERVER_PORT, SERVER_URL} from "../config";
import {CookieSetOptions} from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import {api_get_user_name} from "../api/api";

function TopBar(p: { cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
    const navigate = useNavigate()

    const [name, set_name] = useState("");


    useEffect(() => {
        if (p.cookies.token) {
            api_get_user_name().then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_name(result.data.name);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    p.setCookies("token", "", {path: "/", sameSite: 'none', secure: true})
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            })
        } else {
            set_name("");
        }
    }, [p.cookies.token])

    return (
        <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
            <Box sx={{height: '3px', width: '100%'}}/>
            <Grid container spacing={0}>
                <Grid xs={0.25}/>
                <Grid xs={9}>
                    <Stack display="flex" justifyContent="start" alignItems="center" direction="row"
                           divider={<Divider orientation="vertical" flexItem/>} spacing={2} sx={{height: '40px'}}>
                        <a href="https://www.zju.edu.cn/">
                            <img src={"http://" + SERVER_URL + ":" + SERVER_PORT + "/images/others/home_zju_1.png"}
                                 alt="浙江大学" loading="lazy" height="50px"/>
                        </a>
                        {/*<Box display="flex" justifyContent="center" alignItems="center" sx={{paddingTop: '5px', height: '30px'}}>*/}
                        {/*    /!*<Typography sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>*!/*/}
                        {/*    /!*    电力能源互联及其智能化研究所-山林寺课题组*!/*/}
                        {/*    /!*</Typography>*!/*/}
                        {/*</Box>*/}
                    </Stack>
                </Grid>
                <Grid xs={2.5} display="flex" justifyContent="end" alignItems="center">
                    {p.cookies.token ? name.length > 0 ?
                            <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{height: '30px'}}>
                                <Link to={`/user`}>
                                    <Button sx={{
                                        fontSize: 'subtitle1.fontSize',
                                        letterSpacing: 3,
                                        height: "30px"
                                    }}>{name}</Button>
                                </Link>
                                <Button sx={{
                                    fontSize: 'subtitle1.fontSize',
                                    letterSpacing: 3,
                                    height: "30px"
                                }} onClick={() => {
                                    p.setCookies("token", "", {path: "/", sameSite: 'none', secure: true});
                                }}>退出登录</Button>
                            </ButtonGroup>
                            :
                            <CircularProgress size="30px" color="primary"/>
                        :
                        <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{height: '30px'}}>
                            <Link to={`/login`}>
                                <Button sx={{
                                    fontSize: 'subtitle1.fontSize',
                                    letterSpacing: 3,
                                    height: "30px"
                                }}>登录</Button>
                            </Link>
                            <Link to={`/signup`}>
                                <Button sx={{
                                    fontSize: 'subtitle1.fontSize',
                                    letterSpacing: 3,
                                    height: "30px"
                                }}>注册</Button>
                            </Link>
                        </ButtonGroup>
                    }
                </Grid>
                <Grid xs={0.25}/>
            </Grid>
            <Box sx={{height: '3px', width: '100%'}}/>
        </Box>
    )
}

export default TopBar;
