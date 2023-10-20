import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import * as Cookie from "react-cookie";

import {API_STATUS, SERVER_PORT, SERVER_URL, THEME} from "../config";
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {CookieSetOptions} from "universal-cookie";
import {api_get_sls_members, api_submit_new_sls_member} from "../api/api";
import {useNavigate, useParams} from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";


function SlsMemberTabContent(p:{cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void}) {
    const navigate = useNavigate()

    const [sls_members, set_sls_members] = useState({
        teachers: [{name: "", description: "", image: "", student_id: "", introduction: "", email: "", phone_number: "", papers:[[""]], paper_years:[""], url:""}],
        students: [{name: "", description: "", image: "", student_id: "", introduction: "", email: "", phone_number: "", papers:[[""]], paper_years:[""], url:""}],
        graduates: [{name: "", description: "", image: "", student_id: "", introduction: "", email: "", phone_number: "", papers:[[""]], paper_years:[""], url:""}],
    });

    useEffect(() => {
        api_get_sls_members().then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_sls_members(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/admin_error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/admin_error`, {replace: false, state: {error: null}})
            }
        });
    }, []);

    const columns: GridColDef[] = [
        { field: 'name', headerName: '姓名', width: 150 },
        { field: 'student_id', headerName: '学号', width: 150 },
        { field: 'description', headerName: '简介', width: 300 },
    ];

    const handleGetRowId = (e:{name: string, description: string, image: string, student_id: string, introduction: string, email: string, phone_number: string, papers:string[][], paper_years:string[], url:string}) => {
        return e.student_id;
    }

    const [open, setOpen] = React.useState(false);
    const [sls_member_category, set_sls_member_category] = React.useState("");

    const handleClose = () => {
        setOpen(false);
    };

    const handle_sls_member_adding = (sls_member_category:string) => {
        set_sls_member_category(sls_member_category);
        setOpen(true);
    };

    const [name, set_name] = useState("");
    const [name_error_text, set_name_error_text] = useState("");
    const check_name = (name: string) => {
        if (name.length==0) {
            set_name_error_text("姓名不能为空")
        } else {
            set_name_error_text("")
        }
    }
    const [student_id, set_student_id] = useState("");
    const [student_id_error_text, set_student_id_error_text] = useState("");
    const check_student_id = (student_id: string) => {
        if (student_id.length==0) {
            set_student_id_error_text("学号不能为空")
        } else {
            set_student_id_error_text("")
        }
    }
    const [description, set_description] = useState("");
    const [description_error_text, set_description_error_text] = useState("");
    const check_description = (description: string) => {
        if (description.length==0) {
            set_description_error_text("简介不能为空")
        } else {
            set_description_error_text("")
        }
    }

    const [update_submitted, set_update_submitted] = useState(false);
    const [update_success, set_update_success] = useState(false);

    const handle_submit = async () => {
        check_name(name)
        check_student_id(student_id)
        check_description(description)
        // 检查合法，是否允许提交
        if (name_error_text.length == 0 && student_id_error_text.length == 0 && description_error_text.length == 0 ) {
            set_update_submitted(true);
            const result = await api_submit_new_sls_member(sls_member_category, name, student_id, description);
            if (result.status == API_STATUS.SUCCESS) {
                setOpen(false);
                set_update_success(true);
                set_update_submitted(false);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                set_update_success(false);
                set_update_submitted(false);
                navigate(`/admin_error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                set_update_success(false);
                set_update_submitted(false);
                navigate(`/admin_error`, {replace: false, state: {error: null}})
            }
        } else {
            set_update_success(false);
            set_update_submitted(false);
        }
    }

    return (
        <div>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={update_submitted}
                onExited={() => {
                }}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Stack spacing={5} sx={{width:'100%'}}>
                <Stack spacing={1}>
                    <Box display="flex" justifyContent="start" alignItems="center" sx={{width: '100%'}}>
                        <Typography sx={{fontWeight:'bold'}}>
                            教师
                        </Typography>
                        <IconButton onClick={()=>handle_sls_member_adding("teachers")}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            getRowId={handleGetRowId}
                            rows={sls_members.teachers}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 20, 30]}
                            checkboxSelection
                        />
                    </div>
                </Stack>
                <Stack spacing={1}>
                    <Box display="flex" justifyContent="start" alignItems="center" sx={{width: '100%'}}>
                        <Typography sx={{fontWeight:'bold'}}>
                            在读研究生
                        </Typography>
                        <IconButton onClick={()=>handle_sls_member_adding("students")}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            getRowId={handleGetRowId}
                            rows={sls_members.students}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 20, 30]}
                            checkboxSelection
                        />
                    </div>
                </Stack>
                <Stack spacing={1}>
                    <Box display="flex" justifyContent="start" alignItems="center" sx={{width: '100%'}}>
                        <Typography sx={{fontWeight:'bold'}}>
                            毕业生
                        </Typography>
                        <IconButton onClick={()=>handle_sls_member_adding("graduates")}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            getRowId={handleGetRowId}
                            rows={sls_members.graduates}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 20, 30]}
                            checkboxSelection
                        />
                    </div>
                </Stack>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>新增山林寺成员</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`新增一位${sls_member_category=="teachers"?"教师":sls_member_category=="students"?"在读研究生":sls_member_category=="graduates"?"毕业生":""}`}
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            label="姓名"
                            value={name}
                            minRows={1}
                            maxRows={1}
                            fullWidth
                            size="small"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                set_name(event.target.value);
                                check_name(event.target.value);
                            }}
                            error={name_error_text.length != 0}
                            helperText={name_error_text}
                            variant='standard'
                        />
                        <TextField
                            margin="dense"
                            label="学号"
                            value={student_id}
                            minRows={1}
                            maxRows={1}
                            fullWidth
                            size="small"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                set_student_id(event.target.value);
                                check_student_id(event.target.value);
                            }}
                            error={student_id_error_text.length != 0}
                            helperText={student_id_error_text}
                            variant='standard'
                        />
                        <TextField
                            margin="dense"
                            label="简介"
                            value={description}
                            minRows={1}
                            maxRows={1}
                            fullWidth
                            size="small"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                set_description(event.target.value);
                                check_description(event.target.value);
                            }}
                            error={description_error_text.length != 0}
                            helperText={description_error_text}
                            variant='standard'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>取消</Button>
                        <Button onClick={handle_submit}>完成</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </div>
    )
}


function AdminPage() {
    const [cookies, setCookies] = Cookie.useCookies(["token"])

    const navigate = useNavigate()

    const {tab} = useParams()
    useEffect(() => {
        if (!tab) {
            navigate(`/admin_error`, {replace: false, state: {error: "该页面不存在"}})
        }
    }, [])


    const drawerWidth = 240;

    const tabs = ['山林寺成员管理', '山林寺论坛帖子管理', '“课题组概况”管理', '“联系我们”管理', '返回网站'];

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        山林寺课题组网站管理系统
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar/>
                <Divider/>
                <List>
                    {tabs.map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={()=>{navigate(`/admin/`+index, {replace: false})}}>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Toolbar/>
                {tab == "0" ? <SlsMemberTabContent cookies={cookies} setCookies={setCookies}/> :
                    <Typography>错误页面</Typography>}
            </Box>
        </Box>
    );
}

export default AdminPage;
