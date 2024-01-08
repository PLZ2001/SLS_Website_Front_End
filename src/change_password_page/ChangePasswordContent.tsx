import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {_hash, API_STATUS, SERVER_PORT, SERVER_URL, MIN_WIDTH} from "../config";
import TopMenu from "../home_page/TopMenu";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from "react-router-dom";
import {CookieSetOptions} from 'universal-cookie';
import {api_get_user_profile, api_submit_change_password_info} from "../api/api";
import Link from "@mui/material/Link";

function ChangePassword(p: {cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
    const navigate = useNavigate()

    const [user_profile, set_user_profile] = useState({student_id: "", name: "", sls_verification: false});

    useEffect(() => {
        if (p.cookies.token) {
            api_get_user_profile().then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_user_profile(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    p.setCookies("token", "", {path: "/"})
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            })
        } else {
            set_user_profile({student_id: "", name: "", sls_verification: false});
            navigate(`/error`, {replace: false, state: {error: "抱歉，请登录后再试"}})
        }
    }, [p.cookies.token])

    const [old_password, set_old_password] = useState("");
    const [old_password_error_text, set_old_password_error_text] = useState("");
    const [new_password, set_new_password] = useState("");
    const [new_password_error_text, set_new_password_error_text] = useState("");
    const [change_password_clicked, set_change_password_clicked] = useState(false);
    const [change_password_success, set_change_password_success] = useState(false);

    const check_old_pasword = (old_password: string) => {
        if (old_password.length == 0) {
            set_old_password_error_text("旧密码不能为空")
        } else {
            set_old_password_error_text("")
        }
    }

    const check_new_password = (new_password: string) => {
        if (new_password.length == 0) {
            set_new_password_error_text("新密码不能为空")
        } else if (new_password == old_password) {
            set_new_password_error_text("新密码与旧密码不能相同")
        } else {
            set_new_password_error_text("")
        }
    }

    const handleChangePasswordInfo = async () => {
        check_old_pasword(old_password)
        check_new_password(new_password)
        // 检查合法，是否允许修改密码
        if (old_password_error_text.length == 0 && new_password_error_text.length == 0 && old_password.length > 0 && new_password.length > 0) {
            set_change_password_clicked(true);
            const result = await api_submit_change_password_info(user_profile.student_id, _hash(old_password), _hash(new_password));
            if (result.status == API_STATUS.SUCCESS) {
                set_change_password_success(true);
                set_change_password_clicked(false);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                set_change_password_success(false);
                set_change_password_clicked(false);
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                set_change_password_success(false);
                set_change_password_clicked(false);
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        } else {
            set_change_password_success(false);
            set_change_password_clicked(false);
        }
    }


    if (change_password_success) {
        return (
            <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
                <Box sx={{height: '40px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography
                        textAlign="center"
                        sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                        修改密码成功
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                        You've Changed Your Password Successfully
                    </Typography>
                </Box>
                <Box sx={{height: '30px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Link href={'/'} underline="hover">
                        <Button variant="contained"
                                sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>返回首页</Button>
                    </Link>
                </Box>
                <Box sx={{height: '40px', width: '100%'}}/>
            </Paper>
        )
    } else {
        return (
            <div>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={change_password_clicked}
                    onExited={() => {
                    }}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
                    <Box sx={{height: '40px', width: '100%'}}/>
                    <Box display="flex" justifyContent="center" alignItems="center"
                         sx={{width: '100%'}}>
                        <Typography
                            textAlign="center"
                            sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                            修改密码
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center"
                         sx={{width: '100%'}}>
                        <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                            Change Your Password
                        </Typography>
                    </Box>
                    <Box sx={{height: '30px', width: '100%'}}/>
                    <Box display="flex" justifyContent="center" alignItems="center"
                         sx={{width: '100%'}}>
                        <Box display="flex" justifyContent="center" alignItems="center"
                             sx={{width: '50%'}}>
                            <Stack display="flex" justifyContent="center" alignItems="center"
                                   sx={{width: '100%'}}>
                                <TextField
                                    id="outlined-password-input"
                                    label="旧密码"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    fullWidth
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        set_old_password(event.target.value);
                                        check_old_pasword(event.target.value);
                                    }}
                                    error={old_password_error_text.length != 0}
                                    helperText={old_password_error_text}
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="新密码"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    fullWidth
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        set_new_password(event.target.value);
                                        check_new_password(event.target.value);
                                    }}
                                    error={new_password_error_text.length != 0}
                                    helperText={new_password_error_text}
                                />
                                <Box sx={{height: '30px', width: '100%'}}/>
                                <Button onClick={() => {
                                    handleChangePasswordInfo()
                                }} variant="contained" sx={{
                                    fontSize: 'subtitle1.fontSize',
                                    letterSpacing: 3
                                }}>确认</Button>
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{height: '60px', width: '100%'}}/>
                </Paper>
            </div>
        )
    }
}

function ChangePasswordContent(p: {cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(to right, #ADB5BB, #ADB5BB, #ACB4BA, #ABB3B9, #AAB0B7)',
            borderRadius: '20px',
            minHeight: `calc(${window.innerHeight}px - 92px)`
        }}>
            <Box sx={{
                width: '100%',
                backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/images/others/home_sls_1.webp' + ')'),
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
                borderRadius: '20px',
                minHeight: `calc(${window.innerHeight}px - 92px)`
            }}>
                <Box sx={{height: '10px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <TopMenu/>
                </Box>
                <Box sx={{height: '50px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Stack spacing={2} sx={{width: '80%'}}>
                        <Box sx={{height: '10px', width: '100%'}}/>
                        <ChangePassword cookies={p.cookies} setCookies={p.setCookies}/>
                        <Box sx={{height: '50px', width: '100%'}}/>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default ChangePasswordContent;
