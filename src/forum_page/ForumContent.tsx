import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {_getDate, _hash, API_STATUS, MAX_PIECES, POST_PIECES, SERVER_PORT, SERVER_URL} from "../config";
import TopMenu from "../home_page/TopMenu";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import {useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import Grid from "@mui/material/Unstable_Grid2";
import TextField from '@mui/material/TextField';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import Button from "@mui/material/Button";
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import {CookieSetOptions} from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Badge from "@mui/material/Badge";
import {api_get_posts, api_get_user_profile, api_submit_files, api_submit_new_post} from "../api/api";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Divider from "@mui/material/Divider";
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Post from './Post';
import Link from "@mui/material/Link";


function Search(p: { set_search: (value: (((prevState: string) => string) | string)) => void, category: string, set_category: (value: (((prevState: string) => string) | string)) => void, setPage: (value: (((prevState: number) => number) | number)) => void }) {
    const handleSelect = (event: SelectChangeEvent) => {
        p.set_category(event.target.value);
        p.setPage(1);
    };

    return (
        <Paper
            elevation={2}
            component="form"
            sx={{p: '2px 10px', display: 'flex', alignItems: 'center', width: "70%", borderRadius: "30px"}}
        >
            <Stack display="flex" direction="row" alignItems="center"
                   divider={<Divider orientation="vertical" flexItem/>} spacing={1} sx={{width: '100%'}}>
                <FormControl variant="standard" sx={{m: 1, minWidth: '120px'}}>
                    <Select
                        value={p.category}
                        onChange={handleSelect}
                        displayEmpty
                        inputProps={{'aria-label': 'Without label'}}
                        disableUnderline
                        onClose={() => {
                        }}
                    >
                        <MenuItem value={"all"}>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <Typography color="text.secondary"
                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                    全部版面
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value={"resource"}>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <Typography color="text.secondary"
                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                    资源天地
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value={"question"}>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <Typography color="text.secondary"
                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                    答疑解惑
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value={"activity"}>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <Typography color="text.secondary"
                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                    活动纪实
                                </Typography>
                            </Box>
                        </MenuItem>
                        <MenuItem value={"fun"}>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <Typography color="text.secondary"
                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                    畅所欲言
                                </Typography>
                            </Box>
                        </MenuItem>
                    </Select>
                </FormControl>
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="检索帖子"
                    color="secondary"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        p.set_search(event.target.value);
                    }}
                />
            </Stack>

            <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                <SearchIcon/>
            </IconButton>
        </Paper>
    )
}


function SendNewPost(p: { cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void, submit_success: boolean, set_submit_success: (value: (((prevState: boolean) => boolean) | boolean)) => void }) {
    const navigate = useNavigate()

    const [formatted_time, set_formatted_time] = useState("")
    const [time_stamp, set_time_stamp] = useState(0)
    const get_time_now = () => {
        const date = new Date();
        const time_stamp = date.getTime() / 1000;
        const formatted_time = _getDate(time_stamp);
        return {"formatted_time": formatted_time, "time_stamp": time_stamp};
    }
    setInterval(() => {
        const result = get_time_now();
        set_formatted_time(result.formatted_time);
        set_time_stamp(result.time_stamp);
    }, 1000)

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
        }
    }, [p.cookies.token])

    const [image_files_selected, set_image_files_selected] = useState([{
        name: "",
        display_name: "",
        url: "",
        file: new File([], "")
    }])
    const [other_files_selected, set_other_files_selected] = useState([{
        name: "",
        display_name: "",
        url: "",
        file: new File([], "")
    }])

    const [image_files_order, set_image_files_order] = useState([0])
    const [other_files_order, set_other_files_order] = useState([0])

    const handleImageFile = (files: FileList | null) => {
        if (files) {
            if (files.length > 0) {
                let _image_files_selected = [];
                let _image_files_order = [];
                for (let i = 0; i < files.length; i++) {
                    _image_files_selected.push({
                        name: _hash(files[i].name + time_stamp) + "-" + files[i].name.replaceAll(" ", "+"),
                        display_name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                        file: files[i]
                    })
                    if (image_files_selected[0].name.length > 0) {
                        _image_files_order.push(i + image_files_order.length);
                    } else {
                        _image_files_order.push(i);
                    }
                }
                if (image_files_selected[0].name.length > 0) {
                    set_image_files_selected(image_files_selected.concat(_image_files_selected))
                    set_image_files_order(image_files_order.concat(_image_files_order))
                } else {
                    set_image_files_selected(_image_files_selected)
                    set_image_files_order(_image_files_order)
                }
            }
        }
    }

    const handleOtherFile = (files: FileList | null) => {
        if (files) {
            if (files.length > 0) {
                let _other_files_selected = [];
                let _other_files_order = [];
                for (let i = 0; i < files.length; i++) {
                    _other_files_selected.push({
                        name: _hash(files[i].name + time_stamp) + "-" + files[i].name.replaceAll(" ", "+"),
                        display_name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                        file: files[i]
                    })
                    if (other_files_selected[0].name.length > 0) {
                        _other_files_order.push(i + other_files_order.length);
                    } else {
                        _other_files_order.push(i);
                    }
                }
                if (other_files_selected[0].name.length > 0) {
                    set_other_files_selected(other_files_selected.concat(_other_files_selected))
                    set_other_files_order(other_files_order.concat(_other_files_order))
                } else {
                    set_other_files_selected(_other_files_selected)
                    set_other_files_order(_other_files_order)
                }
            }
        }
    }

    const handleImageFileOrder = (idx: number) => {
        let _image_files_order = image_files_order;
        if (_image_files_order.includes(idx)) {
            _image_files_order = _image_files_order.filter((v) => {
                return v != idx
            })
        } else {
            _image_files_order = _image_files_order.filter(() => {
                return true
            })
            _image_files_order.push(idx)
        }
        set_image_files_order(_image_files_order)
    }

    const handleOtherFileOrder = (idx: number) => {
        let _other_files_order = other_files_order;
        if (_other_files_order.includes(idx)) {
            _other_files_order = _other_files_order.filter((v) => {
                return v != idx
            })
        } else {
            _other_files_order = _other_files_order.filter(() => {
                return true
            })
            _other_files_order.push(idx)
        }
        set_other_files_order(_other_files_order)
    }

    const sync_with_files = () => {
        let _files = []
        if (image_files_selected[0].name.length > 0) {
            for (let i = 0; i < image_files_order.length; i++) {
                _files.push({
                    category: "image",
                    name: image_files_selected[image_files_order[i]].name,
                    display_name: image_files_selected[image_files_order[i]].display_name
                })
            }
        }
        if (other_files_selected[0].name.length > 0) {
            for (let i = 0; i < other_files_order.length; i++) {
                _files.push({
                    category: "other",
                    name: other_files_selected[other_files_order[i]].name,
                    display_name: other_files_selected[other_files_order[i]].display_name
                })
            }
        }
        set_files(_files)
    }

    useEffect(() => {
        sync_with_files();
    }, [image_files_selected, other_files_selected, image_files_order, other_files_order])

    const [category, set_category] = useState("resource");
    const handleSelect = (event: SelectChangeEvent) => {
        set_category(event.target.value);
    };


    const [title, set_title] = useState("");
    const [title_error_text, set_title_error_text] = useState("");
    const [content, set_content] = useState("");
    const [content_error_text, set_content_error_text] = useState("");
    const [files, set_files] = useState([{category: "", name: "", display_name: ""}]);
    const [submit_clicked, set_submit_clicked] = useState(false);

    const check_post_title = (post_title: string) => {
        if (post_title.length == 0) {
            set_title_error_text("标题不能为空")
        } else {
            set_title_error_text("")
        }
    }

    const check_post_content = (post_content: string) => {
        if (post_content.length == 0) {
            set_content_error_text("内容不能为空")
        } else {
            set_content_error_text("")
        }
    }

    const handlePost = async () => {
        check_post_title(title)
        check_post_content(content)
        // 检查合法，是否允许发送
        if (!p.cookies.token) {
            p.set_submit_success(false);
            set_submit_clicked(false);
            navigate(`/error`, {replace: false, state: {error: "抱歉，请登录后再试"}})
        } else if (title_error_text.length == 0 && content_error_text.length == 0 && title.length > 0 && content.length > 0) {
            set_submit_clicked(true);
            const post_id = _hash(title + time_stamp.toString());
            if (files.length > 0) {
                let result;
                if (image_files_selected[0].name.length > 0 && other_files_selected[0].name.length == 0) {
                    result = await api_submit_files(post_id, image_files_selected, image_files_order);
                } else if (image_files_selected[0].name.length == 0 && other_files_selected[0].name.length > 0) {
                    result = await api_submit_files(post_id, other_files_selected, other_files_order);
                } else {
                    result = await api_submit_files(post_id, image_files_selected.concat(other_files_selected), image_files_order.concat(other_files_order.map((v) => {
                        return v + image_files_selected.length
                    })));
                }
                if (result.status == API_STATUS.SUCCESS) {
                    const result = await api_submit_new_post(post_id, title, content, time_stamp, files, category);
                    if (result.status == API_STATUS.SUCCESS) {
                        p.set_submit_success(true);
                        set_submit_clicked(false);
                    } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                        p.set_submit_success(false);
                        set_submit_clicked(false);
                        navigate(`/error`, {replace: false, state: {error: result.reasons}})
                    } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                        p.set_submit_success(false);
                        set_submit_clicked(false);
                        navigate(`/error`, {replace: false, state: {error: null}})
                    }
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    p.set_submit_success(false);
                    set_submit_clicked(false);
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    p.set_submit_success(false);
                    set_submit_clicked(false);
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            } else {
                const result = await api_submit_new_post(post_id, title, content, time_stamp, files, category);
                if (result.status == API_STATUS.SUCCESS) {
                    p.set_submit_success(true);
                    set_submit_clicked(false);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    p.set_submit_success(false);
                    set_submit_clicked(false);
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    p.set_submit_success(false);
                    set_submit_clicked(false);
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            }
        } else {
            p.set_submit_success(false);
            set_submit_clicked(false);
        }
    }

    if (p.submit_success) {
        return (
            <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
                <Box sx={{height: '40px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography
                        textAlign="center"
                        sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                        发送成功
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                        You've Submitted Your Post Successfully.
                    </Typography>
                </Box>
                <Box sx={{height: '40px', width: '100%'}}/>
            </Paper>
        )
    } else {
        return (
            <div>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={submit_clicked}
                    onExited={() => {
                    }}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
                    <Box sx={{height: '40px', width: '100%'}}/>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                        <Box sx={{width: '80%'}}>
                            <Stack spacing={2} sx={{width: '100%'}}>
                                <Card elevation={4} sx={{width: '100%', borderRadius: '20px'}}>
                                    <Stack spacing={2} sx={{width: '100%'}}>
                                        <Grid container spacing={0}>
                                            <Grid xs={9}>
                                                <Box sx={{
                                                    paddingTop: '20px',
                                                    paddingLeft: '20px',
                                                    paddingRight: '20px'
                                                }}>
                                                    <Stack display="flex" direction="row" alignItems="center"
                                                           divider={<Divider orientation="vertical" flexItem/>}
                                                           spacing={1} sx={{width: '100%'}}>
                                                        <Box alignItems="center" sx={{width: '100%'}}>
                                                            <TextField
                                                                id="outlined-multiline-flexible"
                                                                label="标题"
                                                                multiline
                                                                maxRows={2}
                                                                fullWidth
                                                                size="small"
                                                                color="primary"
                                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                    set_title(event.target.value);
                                                                    check_post_title(event.target.value);
                                                                }}
                                                                error={title_error_text.length != 0}
                                                                helperText={title_error_text}
                                                            />
                                                        </Box>
                                                        <FormControl variant="standard" sx={{m: 1, minWidth: "90px"}}>
                                                            <Select
                                                                value={category}
                                                                onChange={handleSelect}
                                                                displayEmpty
                                                                inputProps={{'aria-label': 'Without label'}}
                                                                disableUnderline
                                                                onClose={() => {
                                                                }}
                                                            >
                                                                <MenuItem value={"resource"}>
                                                                    <Box display="flex" justifyContent="center"
                                                                         alignItems="center" sx={{width: '100%'}}>
                                                                        <Typography color="text.secondary"
                                                                                    sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                            资源天地
                                                                        </Typography>
                                                                    </Box>
                                                                </MenuItem>
                                                                <MenuItem value={"question"}>
                                                                    <Box display="flex" justifyContent="center"
                                                                         alignItems="center" sx={{width: '100%'}}>
                                                                        <Typography color="text.secondary"
                                                                                    sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                            答疑解惑
                                                                        </Typography>
                                                                    </Box>
                                                                </MenuItem>
                                                                <MenuItem value={"activity"}>
                                                                    <Box display="flex" justifyContent="center"
                                                                         alignItems="center" sx={{width: '100%'}}>
                                                                        <Typography color="text.secondary"
                                                                                    sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                            活动纪实
                                                                        </Typography>
                                                                    </Box>
                                                                </MenuItem>
                                                                <MenuItem value={"fun"}>
                                                                    <Box display="flex" justifyContent="center"
                                                                         alignItems="center" sx={{width: '100%'}}>
                                                                        <Typography color="text.secondary"
                                                                                    sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                            畅所欲言
                                                                        </Typography>
                                                                    </Box>
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Stack>
                                                    <Box sx={{height: '10px', width: '100%'}}/>
                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                        <TextField
                                                            id="outlined-multiline-flexible"
                                                            label="内容"
                                                            multiline
                                                            minRows={1}
                                                            maxRows={5}
                                                            fullWidth
                                                            size="small"
                                                            color="secondary"
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                set_content(event.target.value);
                                                                check_post_content(event.target.value);
                                                            }}
                                                            error={content_error_text.length != 0}
                                                            helperText={content_error_text}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Grid container spacing={0}>
                                                    <Grid xs>
                                                        <Stack display="flex" justifyContent="start" direction="row"
                                                               spacing={1} sx={{height: '30px', padding: '20px'}}>
                                                            <IconButton aria-label="add photo" size="small">
                                                                <Stack alignItems="center" display="flex"
                                                                       justifyContent="start" direction="row"
                                                                       spacing={1}>
                                                                    <InsertPhotoOutlinedIcon/>
                                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                                        <Typography color="text.secondary"
                                                                                    sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                            添加图片
                                                                        </Typography>
                                                                    </Box>
                                                                </Stack>
                                                                <input
                                                                    title=""
                                                                    type="file"
                                                                    style={{
                                                                        position: 'absolute',
                                                                        opacity: 0,
                                                                        left: "0",
                                                                        bottom: "0",
                                                                        width: "100%",
                                                                        height: "100%"
                                                                    }}
                                                                    accept='image/*'
                                                                    multiple
                                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                        handleImageFile(event.target.files)
                                                                    }}
                                                                />
                                                            </IconButton>
                                                            <IconButton aria-label="add file" size="small">
                                                                <Stack alignItems="center" display="flex"
                                                                       justifyContent="start" direction="row"
                                                                       spacing={1}>
                                                                    <FilePresentOutlinedIcon/>
                                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                                        <Typography color="text.secondary"
                                                                                    sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                            添加附件
                                                                        </Typography>
                                                                    </Box>
                                                                </Stack>
                                                                <input
                                                                    title=""
                                                                    type="file"
                                                                    style={{
                                                                        position: 'absolute',
                                                                        opacity: 0,
                                                                        left: "0",
                                                                        bottom: "0",
                                                                        width: "100%",
                                                                        height: "100%"
                                                                    }}
                                                                    accept='*'
                                                                    multiple
                                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                        handleOtherFile(event.target.files)
                                                                    }}
                                                                />
                                                            </IconButton>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid xs>
                                                        <Stack display="flex" justifyContent="end" direction="row"
                                                               spacing={1} sx={{height: '30px', padding: '20px'}}>
                                                            <Box display="flex" justifyContent="center"
                                                                 alignItems="center">
                                                                <Typography color="text.secondary"
                                                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                    {formatted_time}
                                                                </Typography>
                                                            </Box>
                                                            <Box display="flex" justifyContent="center"
                                                                 alignItems="center">
                                                                {user_profile.name.length > 0 ?
                                                                    <Typography sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                        {user_profile.name}
                                                                    </Typography>
                                                                    :
                                                                    <Link href={'/login'} underline="hover"
                                                                          sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                        发帖需先登录
                                                                    </Link>
                                                                }
                                                            </Box>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={3}>
                                                {image_files_selected[0].name.length > 0 && image_files_order.length > 0 ?
                                                    <Box sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        backgroundImage: String('url(' + image_files_selected[image_files_order[0]].url + ')'),
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center center',
                                                        backgroundRepeat: 'no-repeat',
                                                        borderTopRightRadius: '20px',
                                                        borderBottomRightRadius: '20px'
                                                    }}/>
                                                    :
                                                    <Box display="flex" justifyContent="center" alignItems="center"
                                                         sx={{
                                                             width: '100%',
                                                             height: '100%',
                                                             borderTopRightRadius: '20px',
                                                             borderBottomRightRadius: '20px'
                                                         }}>
                                                        <Typography color="text.secondary"
                                                                    sx={{fontSize: 'subtitle2.fontSize'}}>
                                                            帖子封面默认为第一张图
                                                        </Typography>
                                                    </Box>
                                                }
                                            </Grid>
                                        </Grid>
                                        {image_files_selected[0].name.length > 0 &&
                                            <div>
                                                <Box display="flex" justifyContent="start"
                                                     alignItems="center"
                                                     sx={{width: '100%', paddingLeft: '20px', paddingRight: '20px'}}>
                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                        <Typography color="text.secondary"
                                                                    sx={{fontSize: 'subtitle2.fontSize'}}>
                                                            提示：单击图片调整顺序，未选中项不会提交
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{height: '10px', width: '100%'}}/>
                                                <Box display="flex" justifyContent="start"
                                                     alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                        <Grid container spacing={0}
                                                              sx={{paddingLeft: '20px', paddingRight: '20px'}}>
                                                            {image_files_selected.map((image_file, idx) => {
                                                                return (
                                                                    <Grid xs={image_files_selected.length > 1 ? 4 : 8}
                                                                          display="flex" justifyContent="start"
                                                                          alignItems="center"
                                                                          sx={image_files_selected.length > 1 ? {height: '150px'} : {height: '300px'}}>
                                                                        <Badge
                                                                            badgeContent={image_files_order.indexOf(idx) + 1}
                                                                            color="primary"
                                                                            sx={{width: '100%', height: '100%'}}
                                                                            anchorOrigin={{
                                                                                horizontal: 'left',
                                                                                vertical: 'top'
                                                                            }}>
                                                                            <Box border="1px solid grey"
                                                                                 onClick={() => {
                                                                                     handleImageFileOrder(idx)
                                                                                 }} sx={{
                                                                                width: '90%',
                                                                                height: '90%',
                                                                                backgroundImage: String('url(' + image_file.url + ')'),
                                                                                backgroundSize: 'contain',
                                                                                backgroundPosition: 'center center',
                                                                                backgroundRepeat: 'no-repeat',
                                                                                opacity: `${image_files_order.indexOf(idx) + 1 == 0 ? 0.5 : 1}`
                                                                            }}/>
                                                                        </Badge>
                                                                    </Grid>
                                                                )
                                                            })}
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                                <Box sx={{height: '10px', width: '100%'}}/>
                                            </div>
                                        }
                                        {other_files_selected[0].name.length > 0 &&
                                            <div>
                                                <Box display="flex" justifyContent="start"
                                                     alignItems="center"
                                                     sx={{width: '100%', paddingLeft: '20px', paddingRight: '20px'}}>
                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                        <Typography color="text.secondary"
                                                                    sx={{fontSize: 'subtitle2.fontSize'}}>
                                                            提示：单击附件调整顺序，未选中项不会提交
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{height: '10px', width: '100%'}}/>
                                                <Box display="flex" justifyContent="start"
                                                     alignItems="center"
                                                     sx={{width: '100%', paddingLeft: '20px', paddingRight: '20px'}}>
                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                        <Stack display="flex" justifyContent="start" spacing={2}>
                                                            {other_files_selected.map((other_file, idx) => {
                                                                return (
                                                                    <Badge
                                                                        badgeContent={other_files_order.indexOf(idx) + 1}
                                                                        color="primary" anchorOrigin={{
                                                                        horizontal: 'left',
                                                                        vertical: 'top'
                                                                    }}>
                                                                        <Box onClick={() => {
                                                                            handleOtherFileOrder(idx)
                                                                        }} display="flex" justifyContent="start"
                                                                             alignItems="center"
                                                                             sx={{opacity: `${other_files_order.indexOf(idx) + 1 == 0 ? 0.5 : 1}`}}>
                                                                            <Typography
                                                                                sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                                {other_file.display_name}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Badge>
                                                                )
                                                            })}
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                                <Box sx={{height: '10px', width: '100%'}}/>
                                            </div>
                                        }
                                    </Stack>
                                </Card>
                                <Button endIcon={<ArrowCircleUpOutlinedIcon/>} variant="contained"
                                        sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3, borderRadius: '20px'}}
                                        onClick={() => {
                                            handlePost()
                                        }}>发送新帖</Button>
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{height: '40px', width: '100%'}}/>
                </Paper>
            </div>
        )
    }
}

function Forum(p: { submit_success: boolean }) {
    const navigate = useNavigate()

    const [search, set_search] = useState("");
    const [category, set_category] = useState("all");

    const [page, setPage] = React.useState(1);
    const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

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
    const [num_posts, set_num_posts] = useState(0);

    useEffect(() => {
        api_get_posts(MAX_PIECES, 1, search, category).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_num_posts(Math.ceil(result.data.length / POST_PIECES));
                set_posts(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [page, p.submit_success, search, category])

    return (
        <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}} color={"p"}>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    山林寺论坛
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    SLS Forum
                </Typography>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Search set_search={set_search} category={category} set_category={set_category} setPage={setPage}/>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Stack spacing={2} sx={{width: '80%'}}>
                    {posts.length > 0 ? posts[0].post_id.length > 0 ?
                            posts.slice((page - 1) * POST_PIECES, page * POST_PIECES).map((post) => {
                                return <Post post={post} submit_success={p.submit_success} page={page}/>
                            })
                            :
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <CircularProgress color="primary"/>
                            </Box>
                        :
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                            <Typography color='text.secondary' sx={{fontSize: 'subtitle1.fontSize'}}>
                                暂无帖子
                            </Typography>
                        </Box>
                    }
                </Stack>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Pagination showFirstButton showLastButton count={num_posts} page={page} onChange={handlePage}
                            color="primary"/>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
        </Paper>
    )
}

function ForumContent(p: { cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
    const [submit_success, set_submit_success] = useState(false);
    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(to right, #ADB5BB, #ADB5BB, #ACB4BA, #ABB3B9, #AAB0B7)',
            borderRadius: '20px',
            minHeight: `calc(1500px / ${window.innerWidth} * ${window.innerHeight} - 92px)`
        }}>
            <Box sx={{
                width: '100%',
                backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/images/others/home_sls_1.webp' + ')'),
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
                borderRadius: '20px',
                minHeight: `calc(1500px / ${window.innerWidth} * ${window.innerHeight} - 92px)`
            }}>
                <Box sx={{height: '10px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <TopMenu/>
                </Box>
                <Box sx={{height: '20px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Stack spacing={2} sx={{width: '80%'}}>
                        <Box sx={{height: '10px', width: '100%'}}/>
                        <Forum submit_success={submit_success}/>
                        <Box sx={{height: '10px', width: '100%'}}/>
                        <SendNewPost cookies={p.cookies} setCookies={p.setCookies} submit_success={submit_success}
                                     set_submit_success={set_submit_success}/>
                        <Box sx={{height: '50px', width: '100%'}}/>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default ForumContent;
