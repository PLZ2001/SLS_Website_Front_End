import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import * as Cookie from "react-cookie";

import {_getDate, API_STATUS, COMMENT_PIECES, MAX_PIECES, POST_PIECES, SERVER_PORT, SERVER_URL, THEME} from "../config";
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
import {
    api_get_sls_members,
    api_get_admin_profile,
    api_submit_new_sls_member,
    api_submit_sls_member_removing,
    api_get_posts,
    api_submit_post_removing,
    api_get_comments,
    api_submit_comment_removing,
} from "../api/api";
import {useNavigate, useParams} from "react-router-dom";
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
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
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


function SlsMemberTabContent(p: { cookies: { admin_token?: any }, setCookies: (name: "admin_token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
    const navigate = useNavigate()

    const [update_submitted, set_update_submitted] = useState(false);
    const [update_success, set_update_success] = useState(false);

    const [sls_members, set_sls_members] = useState({
        teachers: [{
            name: "",
            description: "",
            image: "",
            student_id: "",
            introduction: "",
            email: "",
            phone_number: "",
            papers: [[""]],
            paper_years: [""],
            url: ""
        }],
        students: [{
            name: "",
            description: "",
            image: "",
            student_id: "",
            introduction: "",
            email: "",
            phone_number: "",
            papers: [[""]],
            paper_years: [""],
            url: ""
        }],
        graduates: [{
            name: "",
            description: "",
            image: "",
            student_id: "",
            introduction: "",
            email: "",
            phone_number: "",
            papers: [[""]],
            paper_years: [""],
            url: ""
        }],
    });

    useEffect(() => {
        api_get_sls_members().then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_sls_members(result.data);
                set_update_success(false);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/admin_error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/admin_error`, {replace: false, state: {error: null}})
            }
        });
    }, [update_success]);

    const columns: GridColDef[] = [
        {field: 'name', headerName: '姓名', width: 150},
        {field: 'student_id', headerName: '学号', width: 150},
        {field: 'description', headerName: '简介', width: 300},
    ];

    const handleGetRowId = (e: { name: string, description: string, image: string, student_id: string, introduction: string, email: string, phone_number: string, papers: string[][], paper_years: string[], url: string }) => {
        return e.student_id;
    }

    const [open_for_sls_member_adding, setOpen_for_sls_member_adding] = React.useState(false);
    const [open_for_sls_member_removing, setOpen_for_sls_member_removing] = React.useState(false);
    const [sls_member_category, set_sls_member_category] = React.useState("");

    const handleClose_for_sls_member_adding = () => {
        setOpen_for_sls_member_adding(false);
    };

    const handleClose_for_sls_member_removing = () => {
        setOpen_for_sls_member_removing(false);
    };

    const handle_sls_member_adding = (sls_member_category: string) => {
        set_sls_member_category(sls_member_category);
        setOpen_for_sls_member_adding(true);
    };

    const handle_sls_member_removing = (sls_member_category: string) => {
        set_sls_member_category(sls_member_category);
        setOpen_for_sls_member_removing(true);
    };

    const [name, set_name] = useState("");
    const [name_error_text, set_name_error_text] = useState("");
    const check_name = (name: string) => {
        if (name.length == 0) {
            set_name_error_text("姓名不能为空")
        } else {
            set_name_error_text("")
        }
    }
    const [student_id, set_student_id] = useState("");
    const [student_id_error_text, set_student_id_error_text] = useState("");
    const check_student_id = (student_id: string) => {
        if (student_id.length == 0) {
            set_student_id_error_text("学号不能为空")
        } else {
            set_student_id_error_text("")
        }
    }
    const [description, set_description] = useState("");
    const [description_error_text, set_description_error_text] = useState("");
    const check_description = (description: string) => {
        if (description.length == 0) {
            set_description_error_text("简介不能为空")
        } else {
            set_description_error_text("")
        }
    }

    const submit_sls_member_adding = async () => {
        check_name(name)
        check_student_id(student_id)
        check_description(description)
        // 检查合法，是否允许提交
        if (name_error_text.length == 0 && student_id_error_text.length == 0 && description_error_text.length == 0) {
            set_update_submitted(true);
            const result = await api_submit_new_sls_member(sls_member_category, name, student_id, description);
            if (result.status == API_STATUS.SUCCESS) {
                setOpen_for_sls_member_adding(false);
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

    const [teachers_student_ids_selected, set_teachers_student_ids_selected] = useState([""])
    const [graduates_student_ids_selected, set_graduates_student_ids_selected] = useState([""])
    const [students_student_ids_selected, set_students_student_ids_selected] = useState([""])

    const submit_sls_member_removing = async () => {
        // 检查合法，是否允许提交
        set_update_submitted(true);
        let result;
        if (sls_member_category == "teachers") {
            result = await api_submit_sls_member_removing(sls_member_category, teachers_student_ids_selected);
        } else if (sls_member_category == "students") {
            result = await api_submit_sls_member_removing(sls_member_category, students_student_ids_selected);
        } else {
            result = await api_submit_sls_member_removing(sls_member_category, graduates_student_ids_selected);
        }
        if (result.status == API_STATUS.SUCCESS) {
            setOpen_for_sls_member_removing(false);
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
            <Stack spacing={5} sx={{width: '100%'}}>
                <Stack spacing={1}>
                    <Box display="flex" justifyContent="start" alignItems="center" sx={{width: '100%'}}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            教师
                        </Typography>
                        <IconButton color="primary" onClick={() => handle_sls_member_adding("teachers")}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                        {teachers_student_ids_selected.length > 0 && teachers_student_ids_selected[0].length > 0 &&
                            <IconButton color="error" onClick={() => handle_sls_member_removing("teachers")}>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>}
                    </Box>
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            editMode='row'
                            getRowId={handleGetRowId}
                            rows={sls_members.teachers}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize: 5},
                                },
                            }}
                            pageSizeOptions={[5, 10, 20, 30]}
                            checkboxSelection
                            onRowSelectionModelChange={(ids) => {
                                const selected_ids = new Set(ids);
                                set_teachers_student_ids_selected(sls_members.teachers.filter((val) => {
                                    return selected_ids.has(val.student_id)
                                }).map((val) => {
                                    return val.student_id
                                }));
                            }}
                        />
                    </div>
                </Stack>
                <Stack spacing={1}>
                    <Box display="flex" justifyContent="start" alignItems="center" sx={{width: '100%'}}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            在读研究生
                        </Typography>
                        <IconButton color="primary" onClick={() => handle_sls_member_adding("students")}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                        {students_student_ids_selected.length > 0 && students_student_ids_selected[0].length > 0 &&
                            <IconButton color="error" onClick={() => handle_sls_member_removing("students")}>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>}
                    </Box>
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            getRowId={handleGetRowId}
                            rows={sls_members.students}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize: 5},
                                },
                            }}
                            pageSizeOptions={[5, 10, 20, 30]}
                            checkboxSelection
                            onRowSelectionModelChange={(ids) => {
                                const selected_ids = new Set(ids);
                                set_students_student_ids_selected(sls_members.students.filter((val) => {
                                    return selected_ids.has(val.student_id)
                                }).map((val) => {
                                    return val.student_id
                                }));
                            }}
                        />
                    </div>
                </Stack>
                <Stack spacing={1}>
                    <Box display="flex" justifyContent="start" alignItems="center" sx={{width: '100%'}}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            毕业生
                        </Typography>
                        <IconButton color="primary" onClick={() => handle_sls_member_adding("graduates")}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                        {graduates_student_ids_selected.length > 0 && graduates_student_ids_selected[0].length > 0 &&
                            <IconButton color="error" onClick={() => handle_sls_member_removing("graduates")}>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>}
                    </Box>
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            getRowId={handleGetRowId}
                            rows={sls_members.graduates}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize: 5},
                                },
                            }}
                            pageSizeOptions={[5, 10, 20, 30]}
                            checkboxSelection
                            onRowSelectionModelChange={(ids) => {
                                const selected_ids = new Set(ids);
                                set_graduates_student_ids_selected(sls_members.graduates.filter((val) => {
                                    return selected_ids.has(val.student_id)
                                }).map((val) => {
                                    return val.student_id
                                }));
                            }}
                        />
                    </div>
                </Stack>
                <Dialog open={open_for_sls_member_adding} onClose={handleClose_for_sls_member_adding}>
                    <DialogTitle>新增山林寺成员</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`新增一位${sls_member_category == "teachers" ? "教师" : sls_member_category == "students" ? "在读研究生" : sls_member_category == "graduates" ? "毕业生" : ""}`}
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
                        <Button onClick={handleClose_for_sls_member_adding}>取消</Button>
                        <Button onClick={submit_sls_member_adding}>完成</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={open_for_sls_member_removing} onClose={handleClose_for_sls_member_removing}>
                    <DialogTitle>删除山林寺成员</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`确认删除学号为 ${sls_member_category == "teachers" ? `${teachers_student_ids_selected.join('、')} 的教师？` : sls_member_category == "students" ? `${students_student_ids_selected.join('、')} 的在读研究生？` : sls_member_category == "graduates" ? `${graduates_student_ids_selected.join('、')} 的毕业生？` : ""}`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose_for_sls_member_removing}>取消</Button>
                        <Button onClick={submit_sls_member_removing}>确认</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </div>
    )
}

function PostTabContent(p: { cookies: { admin_token?: any }, setCookies: (name: "admin_token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
    const navigate = useNavigate()

    const [update_submitted, set_update_submitted] = useState(false);
    const [update_success, set_update_success] = useState(false);

    const [posts, set_posts] = useState([{
        post_id: "",
        title: "",
        content: "",
        user_id: "",
        time: 0,
        stat: {watch: 0, like: 0, favorite: 0, comment: 0},
        files: [{category: "", name: ""}],
        comment_ids: [""],
        watch_ids: [""],
        like_ids: [""],
        favorite_ids: [""],
        category: "",
    }]);

    const [post_ids_selected, set_post_ids_selected] = useState([""])
    const [comment_ids_selected, set_comment_ids_selected] = useState([""])

    const [comments, set_comments] = useState([{
        comment_id: "",
        content: "",
        user_id: "",
        time: 0,
        stat: {watch: 0, like: 0, favorite: 0, comment: 0},
        files: [{category: "", name: ""}],
        comment_ids: [""],
        watch_ids: [""],
        like_ids: [""],
        favorite_ids: [""]
    }]);

    useEffect(() => {
        api_get_posts(MAX_PIECES, 1, "", "all").then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_posts(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/admin_error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/admin_error`, {replace: false, state: {error: null}})
            }
        })
    }, [update_success])

    useEffect(() => {
        if (post_ids_selected.length>0 && post_ids_selected[0].length>0) {
            api_get_comments(post_ids_selected[0], MAX_PIECES, 1).then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_comments(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    navigate(`/admin_error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/admin_error`, {replace: false, state: {error: null}})
                }
            })
        }
    }, [update_success, post_ids_selected])

    const columns_posts: GridColDef[] = [
        {field: 'category', headerName: '版面', width: 150, valueGetter:
                (para)=>
                    para.row.category == "resource" ? "资源天地" :
                        para.row.category == "question" ? "答疑解惑" :
                            para.row.category == "activity" ? "活动纪实" :
                                para.row.category == "fun" ? "畅所欲言" :
                                    "未知版面"},
        {field: 'title', headerName: '标题', width: 300},
        {field: 'user_id', headerName: '发帖人学号', width: 150},
        {field: 'time', headerName: '发帖时间', width: 200, valueGetter:(para)=>_getDate(para.row.time)},
        {field: 'watch', headerName: '观看数', width: 75, valueGetter:(para)=>para.row.stat.watch},
        {field: 'like', headerName: '点赞数', width: 75, valueGetter:(para)=>para.row.stat.like},
        {field: 'favorite', headerName: '收藏数', width: 75, valueGetter:(para)=>para.row.stat.favorite},
        {field: 'comment', headerName: '评论数', width: 75, valueGetter:(para)=>para.row.stat.comment},
    ];

    const columns_comments: GridColDef[] = [
        {field: 'content', headerName: '评论内容', width: 300},
        {field: 'user_id', headerName: '评论人学号', width: 150},
        {field: 'time', headerName: '评论时间', width: 200, valueGetter:(para)=>_getDate(para.row.time)},
        {field: 'like', headerName: '点赞数', width: 75, valueGetter:(para)=>para.row.stat.like},
        {field: 'comment', headerName: '评论数', width: 75, valueGetter:(para)=>para.row.stat.comment},
    ];

    const handleGetRowId_posts = (e: { post_id: string, title: string, content: string, user_id: string, time: number, stat: { watch: number, like: number, favorite: number, comment: number }, files: { category: string, name: string }[], comment_ids: string[], watch_ids: string[], like_ids: string[], favorite_ids: string[], category: string }) => {
        return e.post_id;
    }

    const handleGetRowId_comments = (e: { comment_id: string, content: string, user_id: string, time: number, stat: { watch: number, like: number, favorite: number, comment: number }, files: { category: string, name: string }[], comment_ids: string[], watch_ids: string[], like_ids: string[], favorite_ids: string[] }) => {
        return e.comment_id;
    }

    const [open_for_post_removing, setOpen_for_post_removing] = React.useState(false);
    const [open_for_comment_removing, setOpen_for_comment_removing] = React.useState(false);

    const handleClose_for_post_removing = () => {
        setOpen_for_post_removing(false);
    };

    const handleClose_for_comment_removing = () => {
        setOpen_for_comment_removing(false);
    };

    const handle_post_removing = () => {
        setOpen_for_post_removing(true);
    };

    const handle_comment_removing = () => {
        setOpen_for_comment_removing(true);
    };

    const submit_post_removing = async () => {
        // 检查合法，是否允许提交
        set_update_submitted(true);
        const result = await api_submit_post_removing(post_ids_selected);;
        if (result.status == API_STATUS.SUCCESS) {
            setOpen_for_post_removing(false);
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
    }

    const submit_comment_removing = async () => {
        // 检查合法，是否允许提交
        set_update_submitted(true);
        const result = await api_submit_comment_removing(comment_ids_selected);;
        if (result.status == API_STATUS.SUCCESS) {
            setOpen_for_comment_removing(false);
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
            <Stack spacing={5} sx={{width: '100%'}}>
                <Stack spacing={1}>
                    <Box display="flex" justifyContent="start" alignItems="center" sx={{width: '100%'}}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            帖子
                        </Typography>
                        {post_ids_selected.length > 0 && post_ids_selected[0].length > 0 &&
                            <IconButton color="error" onClick={() => handle_post_removing()}>
                                <RemoveCircleOutlineIcon/>
                            </IconButton>}
                    </Box>
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            editMode='row'
                            getRowId={handleGetRowId_posts}
                            rows={posts}
                            columns={columns_posts}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize: 5},
                                },
                            }}
                            pageSizeOptions={[5, 10, 20, 30]}
                            checkboxSelection
                            onRowSelectionModelChange={(ids) => {
                                const selected_ids = new Set(ids);
                                set_post_ids_selected(posts.filter((val) => {
                                    return selected_ids.has(val.post_id)
                                }).map((val) => {
                                    return val.post_id
                                }));
                            }}
                        />
                    </div>
                </Stack>
                {post_ids_selected.length > 0 && post_ids_selected[0].length > 0 &&
                    <Stack spacing={1}>
                        <Box display="flex" justifyContent="start" alignItems="center" sx={{width: '100%'}}>
                            <Typography sx={{fontWeight: 'bold'}}>
                                {`帖子 ${posts.filter((val)=>{return val.post_id==post_ids_selected[0]}).map((val)=>{return val.title}).join('、')} 的评论`}
                            </Typography>
                            {comment_ids_selected.length > 0 && comment_ids_selected[0].length > 0 &&
                                <IconButton color="error" onClick={() => handle_comment_removing()}>
                                    <RemoveCircleOutlineIcon/>
                                </IconButton>}
                        </Box>
                        <div style={{height: 400, width: '100%'}}>
                            <DataGrid
                                editMode='row'
                                getRowId={handleGetRowId_comments}
                                rows={comments}
                                columns={columns_comments}
                                initialState={{
                                    pagination: {
                                        paginationModel: {page: 0, pageSize: 5},
                                    },
                                }}
                                pageSizeOptions={[5, 10, 20, 30]}
                                checkboxSelection
                                onRowSelectionModelChange={(ids) => {
                                    const selected_ids = new Set(ids);
                                    set_comment_ids_selected(comments.filter((val) => {
                                        return selected_ids.has(val.comment_id)
                                    }).map((val) => {
                                        return val.comment_id
                                    }));
                                }}
                            />
                        </div>
                    </Stack>
                }
                <Dialog open={open_for_post_removing} onClose={handleClose_for_post_removing}>
                    <DialogTitle>删除帖子</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`确认删除选中的${post_ids_selected.length}条帖子？`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose_for_post_removing}>取消</Button>
                        <Button onClick={submit_post_removing}>确认</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={open_for_comment_removing} onClose={handleClose_for_comment_removing}>
                    <DialogTitle>删除评论</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`确认删除选中的${comment_ids_selected.length}条评论？`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose_for_comment_removing}>取消</Button>
                        <Button onClick={submit_comment_removing}>确认</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </div>
    )
}


function AdminPage() {
    const [cookies, setCookies] = Cookie.useCookies(["admin_token"])

    const navigate = useNavigate()

    const {tab} = useParams()
    useEffect(() => {
        if (!tab) {
            navigate(`/admin_error`, {replace: false, state: {error: "该页面不存在"}})
        }
    }, [])

    const [admin_profile, set_admin_profile] = useState({student_id: "", name: "", sls_verification: false});

    useEffect(() => {
        if (cookies.admin_token) {
            api_get_admin_profile().then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_admin_profile(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    setCookies("admin_token", "", {path: "/", sameSite: 'none', secure: true})
                    navigate(`/admin_error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/admin_error`, {replace: false, state: {error: null}})
                }
            })
        } else {
            set_admin_profile({student_id: "", name: "", sls_verification: false});
            navigate(`/admin_error`, {replace: false, state: {error: "无admin_token"}})
        }
    }, [cookies.admin_token])


    const drawerWidth = 240;

    const tabs = ['山林寺成员管理', '山林寺论坛帖子管理', '“课题组概况”管理', '“联系我们”管理'];

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
                            <ListItemButton onClick={() => {
                                navigate(`/admin/` + index, {replace: false})
                            }}>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {["返回网站"].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => {
                                setCookies("admin_token", "", {path: "/", sameSite: 'none', secure: true});
                                navigate(`/`, {replace: false})
                            }}>
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
                {
                    tab == "0" ? <SlsMemberTabContent cookies={cookies} setCookies={setCookies}/> :
                    tab == "1" ? <PostTabContent cookies={cookies} setCookies={setCookies}/> :
                    <Typography>错误页面</Typography>
                }
            </Box>
        </Box>
    );
}

export default AdminPage;
