import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {_hash, API_STATUS, MIN_WIDTH, SERVER_PORT, SERVER_URL} from "../config";
import TopMenu from "../home_page/TopMenu";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from "react-router-dom";
import {api_submit_login_info, api_submit_signup_info} from '../api/api';
import {CookieSetOptions} from "universal-cookie";

function SignUp(p: { setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
    const navigate = useNavigate()

    const [student_id, set_student_id] = useState("");
    const [student_id_error_text, set_student_id_error_text] = useState("");
    const [name, set_name] = useState("");
    const [name_error_text, set_name_error_text] = useState("");
    const [password, set_password] = useState("");
    const [password_error_text, set_password_error_text] = useState("");
    const [signup_submitted, set_signup_submitted] = useState(false);
    const [signup_success, set_signup_success] = useState(false);

    const check_student_id = (student_id: string) => {
        if (student_id.length > 50) {
            set_student_id_error_text("账号长度不可超过50位")
        } else if (student_id.length == 0) {
            set_student_id_error_text("账号不能为空")
        } else {
            set_student_id_error_text("")
        }
    }

    const check_name = (name: string) => {
        if (name.length > 50) {
            set_name_error_text("昵称长度不可超过50字")
        } else if (name.length == 0) {
            set_name_error_text("昵称不能为空")
        } else {
            set_name_error_text("")
        }
    }

    const check_password = (password: string) => {
        if (password.length < 6 || password.length > 24) {
            set_password_error_text("密码长度应保持在6-24位之间")
        } else {
            set_password_error_text("")
        }
    }

    const handleSignUpInfo = async () => {
        check_student_id(student_id)
        check_name(name)
        check_password(password)
        // 检查合法，是否允许注册
        if (student_id_error_text.length == 0 && name_error_text.length == 0 && password_error_text.length == 0 &&
            student_id.length > 0 && name.length > 0 && password.length > 0) {
            set_signup_submitted(true);
            const result = await api_submit_signup_info(student_id, name, _hash(password));
            if (result.status == API_STATUS.SUCCESS) {
                set_signup_success(true);
                set_signup_submitted(false);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                set_signup_success(false);
                set_signup_submitted(false);
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                set_signup_success(false);
                set_signup_submitted(false);
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        } else {
            set_signup_success(false);
            set_signup_submitted(false);
        }
    }

    const handleLoginInfo = async () => {
        check_student_id(student_id)
        check_password(password)
        // 检查合法，是否允许登录
        if (student_id_error_text.length == 0 && password_error_text.length == 0 && student_id.length > 0 && password.length > 0) {
            const result = await api_submit_login_info(student_id, _hash(password));
            if (result.status == API_STATUS.SUCCESS) {
                p.setCookies("token", result.data.token, {path: "/"})
                navigate(`/`, {replace: false})
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        }
    }


    if (signup_success) {
        return (
            <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
                <Box sx={{height: '40px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography
                        textAlign="center"
                        sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                        注册成功，欢迎访问山林寺课题组
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                        You've Signed Up Successfully. Welcome to Visit Our Research Group!
                    </Typography>
                </Box>
                <Box sx={{height: '30px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Button variant="contained" onClick={() => {
                        handleLoginInfo()
                    }}
                            sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>立即登录</Button>
                </Box>
                <Box sx={{height: '40px', width: '100%'}}/>
            </Paper>
        )
    } else {
        return (
            <div>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={signup_submitted}
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
                            注册你第一个山林寺账号
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center"
                         sx={{width: '100%'}}>
                        <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                            Sign up Your First SLS Account
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
                                    label="昵称"
                                    defaultValue=""
                                    margin="normal"
                                    fullWidth
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        set_name(event.target.value);
                                        check_name(event.target.value)
                                    }}
                                    error={name_error_text.length != 0}
                                    helperText={name_error_text}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="账号"
                                    defaultValue=""
                                    margin="normal"
                                    fullWidth
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        set_student_id(event.target.value);
                                        check_student_id(event.target.value)
                                    }}
                                    error={student_id_error_text.length != 0}
                                    helperText={student_id_error_text}
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="设置密码（6-24位）"
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
                                    handleSignUpInfo()
                                }} endIcon={<SendIcon/>} variant="contained" sx={{
                                    fontSize: 'subtitle1.fontSize',
                                    letterSpacing: 3
                                }}>注册账号</Button>
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{height: '60px', width: '100%'}}/>
                </Paper>
            </div>
        )
    }
}

function SignupContent(p: { setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
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
                        <SignUp setCookies={p.setCookies}/>
                        <Box sx={{height: '50px', width: '100%'}}/>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default SignupContent;
