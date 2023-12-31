import React, {useState} from 'react';
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
import {api_submit_login_info} from "../api/api";
import Link from "@mui/material/Link";

function Login(p: { setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
    const navigate = useNavigate()

    const [student_id, set_student_id] = useState("");
    const [student_id_error_text, set_student_id_error_text] = useState("");
    const [password, set_password] = useState("");
    const [password_error_text, set_password_error_text] = useState("");
    const [login_clicked, set_login_clicked] = useState(false);
    const [login_success, set_login_success] = useState(false);

    const check_student_id = (name: string) => {
        if (name.length == 0) {
            set_student_id_error_text("账号不能为空")
        } else {
            set_student_id_error_text("")
        }
    }

    const check_password = (password: string) => {
        if (password.length == 0) {
            set_password_error_text("密码不能为空")
        } else {
            set_password_error_text("")
        }
    }

    const handleLoginInfo = async () => {
        check_student_id(student_id)
        check_password(password)
        // 检查合法，是否允许登录
        if (student_id_error_text.length == 0 && password_error_text.length == 0 && student_id.length > 0 && password.length > 0) {
            set_login_clicked(true);
            const result = await api_submit_login_info(student_id, _hash(password));
            if (result.status == API_STATUS.SUCCESS) {
                p.setCookies("token", result.data.token, {path: "/"})
                set_login_success(true);
                set_login_clicked(false);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                set_login_success(false);
                set_login_clicked(false);
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                set_login_success(false);
                set_login_clicked(false);
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        } else {
            set_login_success(false);
            set_login_clicked(false);
        }
    }


    if (login_success) {
        return (
            <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
                <Box sx={{height: '40px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography
                        textAlign="center"
                        sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                        登录成功
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                        You've Logged in Successfully
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
                    open={login_clicked}
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
                            登录你的山林寺账号
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center"
                         sx={{width: '100%'}}>
                        <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                            Login with Your SLS Account
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
                                    required
                                    id="outlined-required"
                                    label="账号"
                                    defaultValue=""
                                    margin="normal"
                                    fullWidth
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        set_student_id(event.target.value);
                                        check_student_id(event.target.value);
                                    }}
                                    error={student_id_error_text.length != 0}
                                    helperText={student_id_error_text}
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="密码"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    fullWidth
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        set_password(event.target.value);
                                        check_password(event.target.value);
                                    }}
                                    error={password_error_text.length != 0}
                                    helperText={password_error_text}
                                />
                                <Box sx={{height: '30px', width: '100%'}}/>
                                <Button onClick={() => {
                                    handleLoginInfo()
                                }} variant="contained" sx={{
                                    fontSize: 'subtitle1.fontSize',
                                    letterSpacing: 3
                                }}>登录</Button>
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{height: '60px', width: '100%'}}/>
                </Paper>
            </div>
        )
    }
}

function LoginContent(p: { setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
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
                        <Login setCookies={p.setCookies}/>
                        <Box sx={{height: '50px', width: '100%'}}/>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginContent;
