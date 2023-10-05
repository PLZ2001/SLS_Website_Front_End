import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {_hash, API_STATUS, SERVER_PORT, SERVER_URL, PIECES, CONTENT_LENGTH_LIMIT, _getDate, MAX_PIECES} from "../config";
import TopMenu from "../home_page/TopMenu";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import {Link, useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import Grid from "@mui/material/Grid";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import TextField from '@mui/material/TextField';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import Button from "@mui/material/Button";
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import {CookieSetOptions} from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Badge from "@mui/material/Badge";


function Post(p:{post:{post_id:String, title:String, content:String, user_id:String, time:number, stat:{watch:number, like:number, share:number, favorite:number, comment:number}, files:{category:String, name:String}[], comment_ids:String[]}}) {
    const navigate = useNavigate()

    const [name, set_name] = useState("");

    const api_get_name_with_student_id = async () => {
        try {
            const response = await fetch('http://'+SERVER_URL+':4000/get_name_with_student_id/'+p.post.user_id, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            })
            const result = await response.json()
            if (result.status == "SUCCESS") {
                return {"status":API_STATUS.SUCCESS, "data":result.data};
            } else if (result.status == "FAILURE_WITH_REASONS"){
                return {"status":API_STATUS.FAILURE_WITH_REASONS, "reasons":result.reasons};
            } else {
                return {"status":API_STATUS.FAILURE_WITHOUT_REASONS};
            }
        } catch (error: any) {
            return {"status":API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    }

    useEffect(()=>{
        api_get_name_with_student_id().then((result)=> {
            if (result.status == API_STATUS.SUCCESS) {
                set_name(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    },[])

    return (
        <Card sx={{ width: '100%', borderRadius:'20px'}}>
            <CardActionArea>
                <Grid container spacing={0}>
                    <Grid xs={p.post.files.filter((val)=>{return val.category=="image"}).length>0?9:12}>
                        <Box sx={{paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
                            <Box alignItems="center" sx={{width: '100%'}}>
                                <Typography sx={{fontSize: 'h6.fontSize'}}>
                                    {p.post.title}
                                </Typography>
                            </Box>
                            <Box alignItems="center" sx={{width: '100%'}}>
                                <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                    {p.post.content.length>CONTENT_LENGTH_LIMIT?p.post.content.substring(0,CONTENT_LENGTH_LIMIT)+'...':p.post.content}
                                </Typography>
                            </Box>
                        </Box>
                        <Grid container spacing={0}>
                            <Grid xs={4}>
                                <Stack display="flex" justifyContent="start" direction="row" spacing={1} sx={{height: '30px', padding: '20px'}}>
                                    <IconButton aria-label="favorite" size="small">
                                        <Stack alignItems="center" display="flex" justifyContent="start" direction="row" spacing={1}>
                                            <VisibilityOutlinedIcon/>
                                            <Box alignItems="center" sx={{width: '100%'}}>
                                                <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                                    {p.post.stat.watch}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </IconButton>
                                    <IconButton aria-label="thumb up" size="small">
                                        <Stack alignItems="center" display="flex" justifyContent="start" direction="row" spacing={1}>
                                            <ThumbUpOutlinedIcon/>
                                            <Box alignItems="center" sx={{width: '100%'}}>
                                                <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                                    {p.post.stat.like}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </IconButton>
                                    <IconButton aria-label="share" size="small">
                                        <Stack alignItems="center" display="flex" justifyContent="start" direction="row" spacing={1}>
                                            <ShareOutlinedIcon/>
                                            <Box alignItems="center" sx={{width: '100%'}}>
                                                <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                                    {p.post.stat.share}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </IconButton>
                                    <IconButton aria-label="favorite" size="small">
                                        <Stack alignItems="center" display="flex" justifyContent="start" direction="row" spacing={1}>
                                            <FavoriteBorderOutlinedIcon/>
                                            <Box alignItems="center" sx={{width: '100%'}}>
                                                <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                                    {p.post.stat.favorite}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </IconButton>
                                    <IconButton aria-label="comment" size="small">
                                        <Stack alignItems="center" display="flex" justifyContent="start" direction="row" spacing={1}>
                                            <CommentOutlinedIcon/>
                                            <Box alignItems="center" sx={{width: '100%'}}>
                                                <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                                    {p.post.stat.comment}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </IconButton>
                                </Stack>
                            </Grid>
                            <Grid xs={8}>
                                <Stack display="flex" justifyContent="end" direction="row" spacing={1} sx={{height: '30px', padding: '20px'}}>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                            {_getDate(p.post.time)}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                            {name.length>0?
                                                name
                                                :
                                                <CircularProgress size="10px" color="secondary"/>
                                            }
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    {p.post.files.filter((val)=>{return val.category=="image"}).length>0 &&
                        <Grid xs={3}>
                            <Box sx={{width: '100%', height:'100%', backgroundImage: String('url('+'http://'+SERVER_URL+':'+SERVER_PORT+'/files/'+p.post.post_id+'/'+p.post.files.filter((val)=>{return val.category=="image"})[0].name+')'), backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat:'no-repeat', borderTopRightRadius:'20px', borderBottomRightRadius:'20px'}}/>
                        </Grid>
                    }
                </Grid>
            </CardActionArea>
        </Card>
    )
}

function SendNewPost(p:{cookies:{token?: any}, setCookies:(name: "token", value: any, options?: (CookieSetOptions | undefined)) => void}) {
    const navigate = useNavigate()

    const [formatted_time, set_formatted_time] = useState("")
    const [time_stamp, set_time_stamp] = useState(0)
    const get_time_now = async () => {
        const date = new Date();
        const time_stamp = date.getTime() / 1000;
        const formatted_time = _getDate(time_stamp);
        return {"formatted_time":formatted_time, "time_stamp":time_stamp};
    }
    setInterval(() => {
        get_time_now().then((result)=>{set_formatted_time(result.formatted_time);set_time_stamp(result.time_stamp)})
    }, 1000)

    const [name, set_name] = useState("");

    const api_get_user_name = async () => {
        try {
            const response = await fetch('http://'+SERVER_URL+':4000/get_user_name', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
            })
            const result = await response.json()
            if (result.status == "SUCCESS") {
                return {"status":API_STATUS.SUCCESS, "data":result.data};
            } else if (result.status == "FAILURE_WITH_REASONS"){
                return {"status":API_STATUS.FAILURE_WITH_REASONS, "reasons":result.reasons};
            } else {
                return {"status":API_STATUS.FAILURE_WITHOUT_REASONS};
            }
        } catch (error: any) {
            return {"status":API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    }

    useEffect(()=>{
        if (p.cookies.token) {
            api_get_user_name().then((result)=>{
                if (result.status == API_STATUS.SUCCESS) {
                    set_name(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    p.setCookies("token", "", {path: "/", sameSite: 'none', secure: true})
                    navigate(`/error`, { replace: false, state: { error:result.reasons } })
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, { replace: false, state: { error:null } })
                }
            })
        }
    },[p.cookies.token])

    const [image_files_selected, set_image_files_selected] = useState([{name:"", url:"", file: new File([], "")}])
    const [other_files_selected, set_other_files_selected] = useState([{name:"", url:"", file: new File([], "")}])

    const [image_files_order, set_image_files_order] = useState([0])
    const [other_files_order, set_other_files_order] = useState([0])

    const handleImageFile = async (files:FileList|null) => {
        if (files) {
            if (files.length>0) {
                let _image_files_selected = [];
                let _image_files_order = [];
                for (let i = 0; i < files.length; i++) {
                    _image_files_selected.push({
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                        file: files[i]
                    })
                    _image_files_order.push(i);
                }
                set_image_files_selected(_image_files_selected)
                set_image_files_order(_image_files_order)
            }
        }
    }

    const handleOtherFile = async (files:FileList|null) => {
        if (files) {
            if (files.length>0) {
                let _other_files_selected = [];
                let _other_files_order = [];
                for (let i=0;i<files.length;i++) {
                    _other_files_selected.push({name:files[i].name, url:URL.createObjectURL(files[i]), file:files[i]})
                    _other_files_order.push(i);
                }
                set_other_files_selected(_other_files_selected)
                set_other_files_order(_other_files_order)
            }
        }
    }

    const handleImageFileOrder = async (idx:number) => {
        let _image_files_order = image_files_order;
        if (_image_files_order.includes(idx)) {
            _image_files_order = _image_files_order.filter((v)=>{return v!=idx})
        } else {
            _image_files_order.push(idx)
        }
        set_image_files_order(_image_files_order)
    }

    const handleOtherFileOrder = async (idx:number) => {
        let _other_files_order = other_files_order;
        if (_other_files_order.includes(idx)) {
            _other_files_order = _other_files_order.filter((v)=>{return v!=idx})
        } else {
            _other_files_order.push(idx)
        }
        set_other_files_order(_other_files_order)
    }



    useEffect(()=>{
        let _files = []
        if (image_files_selected[0].name.length>0) {
            for (let i=0;i<image_files_order.length;i++) {
                _files.push({category:"image", name:image_files_selected[image_files_order[i]].name})
            }
        }
        if (other_files_selected[0].name.length>0) {
            for (let i=0;i<other_files_order.length;i++) {
                _files.push({category:"other", name:other_files_selected[other_files_order[i]].name})
            }
        }
        set_files(_files)
    },[image_files_selected, other_files_selected, image_files_order, other_files_order])



    const [title, set_title] = useState("");
    const [title_error_text, set_title_error_text] = useState("");
    const [content, set_content] = useState("");
    const [content_error_text, set_content_error_text] = useState("");
    const [files, set_files] = useState([{category:"", name:""}]);
    const [submit_clicked, set_submit_clicked] = useState(false);
    const [submit_success, set_submit_success] = useState(false);

    const check_post_title = (post_title:string) => {
        if (post_title.length == 0) {
            set_title_error_text("标题不能为空")
        } else {
            set_title_error_text("")
        }
    }

    const check_post_content = (post_content:string) => {
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
            set_submit_success(false);
            set_submit_clicked(false);
            navigate(`/error`, { replace: false, state: { error:"抱歉，请登录后再试" } })
        } else if (title_error_text.length==0 && content_error_text.length==0 && title.length>0 && content.length>0) {
            set_submit_clicked(true);
            const post_id = _hash(title+time_stamp.toString());
            if (files.length>0) {
                const result = await api_submit_files(post_id, image_files_selected.concat(other_files_selected), image_files_order.concat(other_files_order.map((v)=>{return v+image_files_selected.length})));
                if (result.status == API_STATUS.SUCCESS) {
                    const result = await api_submit_new_post(post_id, title, content, time_stamp, files);
                    if (result.status == API_STATUS.SUCCESS) {
                        set_submit_success(true);
                        set_submit_clicked(false);
                    } else if (result.status == API_STATUS.FAILURE_WITH_REASONS){
                        set_submit_success(false);
                        set_submit_clicked(false);
                        navigate(`/error`, { replace: false, state: { error:result.reasons } })
                    } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                        set_submit_success(false);
                        set_submit_clicked(false);
                        navigate(`/error`, { replace: false, state: { error:null } })
                    }
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS){
                    set_submit_success(false);
                    set_submit_clicked(false);
                    navigate(`/error`, { replace: false, state: { error:result.reasons } })
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    set_submit_success(false);
                    set_submit_clicked(false);
                    navigate(`/error`, { replace: false, state: { error:null } })
                }
            } else {
                const result = await api_submit_new_post(post_id, title, content, time_stamp, files);
                if (result.status == API_STATUS.SUCCESS) {
                    set_submit_success(true);
                    set_submit_clicked(false);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS){
                    set_submit_success(false);
                    set_submit_clicked(false);
                    navigate(`/error`, { replace: false, state: { error:result.reasons } })
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    set_submit_success(false);
                    set_submit_clicked(false);
                    navigate(`/error`, { replace: false, state: { error:null } })
                }
            }
        } else {
            set_submit_success(false);
            set_submit_clicked(false);
        }
    }

    const api_submit_new_post = async (post_id:String, title:string, content:string, time:number, files:{category:string, name:string}[]) => {
        try {
            const response = await fetch('http://'+SERVER_URL+':4000/submit_new_post/'+post_id,
                {method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    credentials: 'include',
                    body: JSON.stringify({"title":title, "content":content, "time": String(time), "files":files})})
            const result = await response.json()
            if (result.status == "SUCCESS") {
                return {"status":API_STATUS.SUCCESS, "data":result.data};
            } else if (result.status == "FAILURE_WITH_REASONS"){
                return {"status":API_STATUS.FAILURE_WITH_REASONS, "reasons":result.reasons};
            } else {
                return {"status":API_STATUS.FAILURE_WITHOUT_REASONS};
            }
        } catch (error: any) {
            return {"status":API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    }

    const api_submit_files = async (post_id:String, files:{name:String, url:String, file:File}[], files_order:number[]) => {
        try {
            const form_data = new FormData();
            for (let i=0;i<files_order.length;i++) {
                form_data.append(files[files_order[i]].name.toString(), files[files_order[i]].file);
            }
            const response = await fetch('http://'+SERVER_URL+':4000/submit_files/'+post_id,
                {method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                        'Access-Control-Allow-Origin': '*',
                    },
                    credentials: 'include',
                    body: form_data})
            const result = await response.json()
            if (result.status == "SUCCESS") {
                return {"status":API_STATUS.SUCCESS, "data":result.data};
            } else if (result.status == "FAILURE_WITH_REASONS"){
                return {"status":API_STATUS.FAILURE_WITH_REASONS, "reasons":result.reasons};
            } else {
                return {"status":API_STATUS.FAILURE_WITHOUT_REASONS};
            }
        } catch (error: any) {
            return {"status":API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    }

    if (submit_success) {
        return (
            <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
                <Box sx={{height: '40px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography
                        sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                        发送成功，请刷新查看
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography sx={{fontSize: 'subtitle1.fontSize'}}>
                        You've Submitted Your Post Successfully. Please Refresh for Check.
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
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
                    <Box sx={{height: '40px', width: '100%'}}/>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                        <Box sx={{width: '90%'}}>
                            <Stack spacing={2} sx={{width: '100%'}}>
                                <Card sx={{width: '100%', borderRadius: '20px'}}>
                                    <Stack spacing={2} sx={{width: '100%'}}>
                                        <Grid container spacing={0}>
                                            <Grid xs={9}>
                                                <Box sx={{paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
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
                                                            error={title_error_text.length == 0 ? false : true}
                                                            helperText={title_error_text}
                                                        />
                                                    </Box>
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
                                                            error={content_error_text.length == 0 ? false : true}
                                                            helperText={content_error_text}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Grid container spacing={0}>
                                                    <Grid xs={4}>
                                                        <Stack display="flex" justifyContent="start" direction="row"
                                                               spacing={1} sx={{height: '30px', padding: '20px'}}>
                                                            <IconButton aria-label="add photo" size="small">
                                                                <Stack alignItems="center" display="flex"
                                                                       justifyContent="start" direction="row" spacing={1}>
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
                                                                       justifyContent="start" direction="row" spacing={1}>
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
                                                    <Grid xs={8}>
                                                        <Stack display="flex" justifyContent="end" direction="row"
                                                               spacing={1} sx={{height: '30px', padding: '20px'}}>
                                                            <Box display="flex" justifyContent="center" alignItems="center">
                                                                <Typography color="text.secondary"
                                                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                    {formatted_time}
                                                                </Typography>
                                                            </Box>
                                                            <Box display="flex" justifyContent="center" alignItems="center">
                                                                <Typography color="text.secondary"
                                                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                    {name.length > 0 ? name : "发帖需先登录"}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid xs={3}>
                                                {image_files_selected[0].name.length > 0 && image_files_order.length>0?
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
                                                    <Box display="flex" justifyContent="center" alignItems="center" sx={{width:'100%', height:'100%', borderTopRightRadius: '20px', borderBottomRightRadius: '20px'}}>
                                                        <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                                            帖子封面默认为第一张图
                                                        </Typography>
                                                    </Box>
                                                }
                                            </Grid>
                                        </Grid>
                                        {image_files_selected[0].name.length > 0 &&
                                            <div>
                                                <Stack spacing={1} display="flex" justifyContent="center" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Box display="flex" justifyContent="start" alignItems="center" sx={{width:'90%', height:'100%'}}>
                                                        <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                                            提示：单击图片调整顺序
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" justifyContent="start" alignItems="center"
                                                         sx={{width: '95%'}}>
                                                        <Grid container spacing={0}>
                                                            {image_files_selected.map((image_file, idx) => {
                                                                return (
                                                                    <Grid xs={4} display="flex" justifyContent="center"
                                                                          alignItems="center" sx={{height: '150px'}}>
                                                                        <Badge badgeContent={image_files_order.indexOf(idx)+1} color="primary" sx={{width:'90%', height:'90%'}} anchorOrigin={{ horizontal: 'left', vertical: 'top' }}>
                                                                            <Box onClick={(e)=>{handleImageFileOrder(idx)}} sx={{
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                backgroundImage: String('url(' + image_file.url + ')'),
                                                                                backgroundSize: 'cover',
                                                                                backgroundPosition: 'center center',
                                                                                backgroundRepeat: 'no-repeat',
                                                                                borderRadius: '5px'
                                                                            }}/>
                                                                        </Badge>
                                                                    </Grid>
                                                                )
                                                            })}
                                                        </Grid>
                                                    </Box>
                                                </Stack>
                                                <Box sx={{height: '10px', width: '100%'}}/>
                                            </div>
                                        }
                                        {other_files_selected[0].name.length > 0 &&
                                            <div>
                                                <Stack spacing={2} display="flex" justifyContent="center" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Box display="flex" justifyContent="start" alignItems="center" sx={{width:'90%', height:'100%'}}>
                                                        <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                                            提示：单击附件调整顺序
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" justifyContent="start" alignItems="center"
                                                         sx={{width: '90%'}}>
                                                        <Stack display="flex" justifyContent="start" spacing={2}>
                                                            {other_files_selected.map((other_file,idx) => {
                                                                return (
                                                                    <Badge badgeContent={other_files_order.indexOf(idx)+1} color="primary" anchorOrigin={{ horizontal: 'left', vertical: 'top' }}>
                                                                        <Box onClick={(e)=>{handleOtherFileOrder(idx)}} display="flex" justifyContent="start"
                                                                             alignItems="center">
                                                                            <Typography
                                                                                sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                                {other_file.name}
                                                                            </Typography>
                                                                        </Box>
                                                                    </Badge>
                                                                )
                                                            })}
                                                        </Stack>
                                                    </Box>
                                                </Stack>
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

function Forum() {
    const navigate = useNavigate()

    const [page, setPage] = React.useState(1);
    const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const [posts, set_posts] = useState([{post_id:"", title:"", content:"", user_id:"", time:0, stat:{watch:0, like:0, share:0, favorite:0, comment:0}, files:[{category:"", name:""}], comment_ids:[""]}]);
    const [num_posts, set_num_posts] = useState(0);

    const api_get_posts = async (p:number, s:number) => {
        try {
            const response = await fetch('http://'+SERVER_URL+':4000/get_posts',
                {method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Request-Headers': 'content-type;access-control-allow-origin',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    credentials: 'include',
                    body: JSON.stringify({"pieces":String(p), "sequence":String(s)})})
            const result = await response.json()
            if (result.status == "SUCCESS") {
                return {"status":API_STATUS.SUCCESS, "data":result.data};
            } else if (result.status == "FAILURE_WITH_REASONS"){
                return {"status":API_STATUS.FAILURE_WITH_REASONS, "reasons":result.reasons};
            } else {
                return {"status":API_STATUS.FAILURE_WITHOUT_REASONS};
            }
        } catch (error: any) {
            return {"status":API_STATUS.FAILURE_WITHOUT_REASONS};
        }
    }

    useEffect(()=>{
        api_get_posts(PIECES, page).then((result)=>{
            if (result.status == API_STATUS.SUCCESS) {
                set_posts(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, { replace: false, state: { error:result.reasons } })
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, { replace: false, state: { error:null } })
            }
        })
    },[page])

    useEffect(()=>{
        api_get_posts(MAX_PIECES, 1).then((result)=>{
            if (result.status == API_STATUS.SUCCESS) {
                set_num_posts(Math.ceil(result.data.length/PIECES));
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, { replace: false, state: { error:result.reasons } })
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, { replace: false, state: { error:null } })
            }
        })
    },[page])

    return (
        <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    山林寺论坛
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography sx={{fontSize: 'subtitle1.fontSize'}}>
                    SLS Forum
                </Typography>
            </Box>
            <Box sx={{height: '20px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Stack spacing={2} sx={{width: '90%'}}>
                    {posts.length > 0 ? posts[0].post_id.length > 0 ?
                            posts.map((post) => {
                                return <Post post={post}/>
                            })
                            :
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <CircularProgress color="primary"/>
                            </Box>
                        :
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                            <Typography color='grey' sx={{fontSize: 'subtitle1.fontSize'}}>
                                暂无帖子
                            </Typography>
                        </Box>
                    }
                </Stack>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Pagination showFirstButton showLastButton count={num_posts} page={page} onChange={handlePage} color="primary"/>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
        </Paper>
    )
}

function ForumContent(p:{cookies:{token?: any}, setCookies:(name: "token", value: any, options?: (CookieSetOptions | undefined)) => void}) {
    return (
        <Box sx={{width: '100%', background:'linear-gradient(to right, #B1B8BF, #B1B8BF, #ABB3BA, #A9B1B7, #AAB1B8)', borderRadius:'20px'}}>
            <Box sx={{width: '100%', backgroundImage: String('url('+'http://'+SERVER_URL+':'+SERVER_PORT+'/images/others/home_sls_1.png'+')'), backgroundSize: '100% auto', backgroundRepeat:'no-repeat', borderRadius:'20px'}}>
                <Box sx={{height: '10px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <TopMenu/>
                </Box>
                <Box sx={{height: '20px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Stack spacing={2} sx={{width: '90%'}}>
                        <Box sx={{height: '10px', width: '100%'}}/>
                        <Forum/>
                        <Box sx={{height: '10px', width: '100%'}}/>
                        <SendNewPost cookies={p.cookies} setCookies={p.setCookies}/>
                        <Box sx={{height: '50px', width: '100%'}}/>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default ForumContent;
