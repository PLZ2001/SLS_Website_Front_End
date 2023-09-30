import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {SERVER_PORT, SERVER_URL} from "../config";
import TopMenu from "../home_page/TopMenu";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from "react-router-dom";
import {_hash} from "../config";

function Login() {
    const [name, set_name] = useState("");
    const [name_error_text, set_name_error_text] = useState("");
    const [password, set_password] = useState("");
    const [password_error_text, set_password_error_text] = useState("");
    const [login_clicked, set_login_clicked] = useState(false);
    const [login_success, set_login_success] = useState(false);

    const check_name = (name:string) => {
        if (name.length == 0) {
            set_name_error_text("姓名不能为空")
        } else {
            set_name_error_text("")
        }
    }

    const check_password = (password:string) => {
        if (password.length == 0) {
            set_password_error_text("密码不能为空")
        } else {
            set_password_error_text("")
        }
    }

    const handleLoginInfo = async () => {
        check_name(name)
        check_password(password)
        // 检查合法，是否允许注册
        if (name_error_text.length==0 && password_error_text.length==0 && name.length>0 && password.length>0) {
            set_login_clicked(true);
            if (await api_submit_login_info(name, _hash(password))) {
                set_login_success(true);
                set_login_clicked(false);
            } else {
                set_login_success(false);
                set_login_clicked(false);
            }
        } else {
            set_login_clicked(false);
        }
    }

    const api_submit_login_info = async (name:string, password:string) => {
        try {
            const response = await fetch('http://'+SERVER_URL+':4000/submit_login_info',
                {method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify({"name":name, "password":password})})
            await response.json()
            return true;
        } catch (error: any) {
            alert(error);
            return false;
        }
    }

    if (login_success) {
        return (
            <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
                <Box sx={{height: '40px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography
                        sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                        登录成功
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography sx={{fontSize: 'subtitle1.fontSize'}}>
                        You've Logined Successfully
                    </Typography>
                </Box>
                <Box sx={{height: '30px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Link to={`/`}>
                        <Button variant="contained" sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>返回首页</Button>
                    </Link>
                </Box>
                <Box sx={{height: '40px', width: '100%'}}/>
            </Paper>
        )
    } else {
        return (
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={login_clicked}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
                    <Box sx={{height: '40px', width: '100%'}}/>
                    <Box display="flex" justifyContent="center" alignItems="center"
                         sx={{width: '100%'}}>
                        <Typography
                            sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                            登录你的山林寺账号
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center"
                         sx={{width: '100%'}}>
                        <Typography sx={{fontSize: 'subtitle1.fontSize'}}>
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
                                    label="真实姓名"
                                    defaultValue=""
                                    margin="normal"
                                    fullWidth
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        set_name(event.target.value);
                                        check_name(event.target.value);
                                    }}
                                    error={name_error_text.length == 0 ? false : true}
                                    helperText={name_error_text}
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
                                    error={password_error_text.length == 0 ? false : true}
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

function LoginContent() {
    return (
        <Box sx={{width: '100%', background:'linear-gradient(to right, #B1B8BF, #B1B8BF, #ABB3BA, #A9B1B7, #AAB1B8)', borderRadius:'20px'}}>
            <Box sx={{width: '100%', backgroundImage: String('url('+'http://'+SERVER_URL+':'+SERVER_PORT+'/images/others/home_sls_1.png'+')'), backgroundSize: '100% auto', backgroundRepeat:'no-repeat', borderRadius:'20px'}}>
                <Box sx={{height: '10px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <TopMenu/>
                </Box>
                <Box sx={{height: '50px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Stack spacing={2} sx={{width: '80%'}}>
                        <Box sx={{height: '10px', width: '100%'}}/>
                        <Login/>
                        <Box sx={{height: '50px', width: '100%'}}/>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginContent;
