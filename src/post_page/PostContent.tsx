import React, {useEffect, useRef, useState} from 'react';
import Box from "@mui/material/Box";
import {
    _getDate,
    _hash,
    API_STATUS,
    COMMENT_OF_COMMENT_PIECES,
    COMMENT_PIECES,
    MAX_PIECES,
    SERVER_PORT,
    SERVER_URL
} from "../config";
import TopMenu from "../home_page/TopMenu";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import {Link, useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import {CardActionArea} from '@mui/material';
import Grid from "@mui/material/Grid";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
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
import {
    api_get_comment_with_id,
    api_get_comments,
    api_get_comments_of_comments,
    api_get_user_profile_with_student_id,
    api_get_post_with_id,
    api_get_user_profile,
    api_submit_an_action,
    api_submit_files,
    api_submit_new_comment
} from '../api/api';
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from "@mui/material/Avatar";

function Post(p: { handle_scroll: () => void, post: { post_id: string, title: string, content: string, user_id: string, time: number, stat: { watch: number, like: number, favorite: number, comment: number }, files: { category: string, name: string }[], comment_ids: string[], watch_ids: string[], like_ids: string[], favorite_ids: string[] }, cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void, set_is_commenting_on_post: (value: (((prevState: boolean) => boolean) | boolean)) => void, set_post_or_comment_id_commented_on: (value: (((prevState: (string | undefined)) => (string | undefined)) | string | undefined)) => void, action: number, set_action: (value: (((prevState: number) => number) | number)) => void }) {
    const navigate = useNavigate()

    const [user_profile, set_user_profile] = useState({student_id:"", name:"", sls_verification:false});

    useEffect(() => {
        if (p.cookies.token) {
            api_get_user_profile().then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_user_profile(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    p.setCookies("token", "", {path: "/", sameSite: 'none', secure: true})
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            })
        } else {
            set_user_profile({student_id:"", name:"", sls_verification:false});
        }
    }, [p.cookies.token])

    const [post_user_profile, set_post_user_profile] = useState({student_id:"", name:"", sls_verification:false});

    useEffect(() => {
        api_get_user_profile_with_student_id(p.post.user_id).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_post_user_profile(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [])

    const [image_clicked, set_image_clicked] = useState(false);
    const [image_src_clicked, set_image_src_clicked] = useState("");
    const handleBackdropClicked = () => {
        set_image_clicked(false);
        set_image_src_clicked("");
    };

    const handleActionCLicked = (action_category: string) => {
        api_submit_an_action(action_category, true, p.post.post_id)
        p.set_action(-p.action)
    }

    const handleCommentClicked = () => {
        p.handle_scroll()
    }

    return (
        <div style={{width: '100%'}}>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={image_clicked}
                onClick={handleBackdropClicked}
                onExited={() => {
                }}
            >
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: String('url(' + image_src_clicked + ')'),
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '5px'
                }}/>
            </Backdrop>
            <Stack spacing={0.1} sx={{width: '100%'}}>
                <Card elevation={4} sx={{width: '100%', borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}}>
                    <Box sx={{padding: '20px'}}>
                        <Box alignItems="center" sx={{width: '100%'}}>
                            <Typography sx={{fontSize: 'h5.fontSize'}}>
                                {p.post.title}
                            </Typography>
                        </Box>
                        <Stack display="flex" justifyContent="end" direction="row" alignItems="center" spacing={1}>
                            {post_user_profile.sls_verification &&
                            <Avatar sx={{bgcolor:"#1463d8", height:"24px", width:"96px", fontSize:"subtitle2.fontSize"}} variant="rounded">
                                山林寺认证
                            </Avatar>}
                            <Box alignItems="center">
                                {post_user_profile.name.length > 0 ?
                                    <Link to={`/user/`+post_user_profile.student_id} style={{textDecoration:"none"}}>
                                        <Typography sx={{fontSize: 'subtitle1.fontSize'}}>
                                            {post_user_profile.name}
                                        </Typography>
                                    </Link>
                                :
                                    <CircularProgress size="10px" color="secondary"/>
                                }
                            </Box>
                            <Box alignItems="center">
                                <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                    {'发布于 ' + _getDate(p.post.time)}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Card>
                <Card elevation={4}
                      sx={{width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>
                    <Stack spacing={2} sx={{width: '100%'}}>
                        <Grid container spacing={0}>
                            <Grid xs={12}>
                                <Box sx={{padding: '20px'}}>
                                    <Box alignItems="center" sx={{width: '100%'}}>
                                        <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                            {p.post.content}
                                        </Typography>
                                    </Box>
                                </Box>
                                {p.post.files.filter((val) => {
                                        return val.category == "image"
                                    }).length > 0 &&
                                    <div>
                                        <Box display="flex" justifyContent="center" alignItems="center"
                                             sx={{width: '100%'}}>
                                            <Box display="flex" justifyContent="start" alignItems="center"
                                                 sx={{width: '95%'}}>
                                                <Grid container spacing={0}>
                                                    {p.post.files.filter((val) => {
                                                        return val.category == "image"
                                                    }).map((image_file) => {
                                                        return (
                                                            <Grid xs={p.post.files.filter((val) => {
                                                                return val.category == "image"
                                                            }).length > 1 ? 4 : 8} display="flex"
                                                                  justifyContent="center"
                                                                  alignItems="center"
                                                                  sx={p.post.files.filter((val) => {
                                                                      return val.category == "image"
                                                                  }).length > 1 ? {height: '150px'} : {height: '300px'}}>
                                                                <Box onClick={() => {
                                                                    set_image_src_clicked('http://' + SERVER_URL + ':' + SERVER_PORT + '/files/' + p.post.post_id + '/' + image_file.name);
                                                                    set_image_clicked(true);
                                                                }} sx={{
                                                                    width: '90%',
                                                                    height: '90%',
                                                                    backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/files/' + p.post.post_id + '/' + image_file.name + ')'),
                                                                    backgroundSize: 'contain',
                                                                    backgroundPosition: 'left top',
                                                                    backgroundRepeat: 'no-repeat',
                                                                }}/>
                                                            </Grid>
                                                        )
                                                    })}
                                                </Grid>
                                            </Box>
                                        </Box>
                                        <Box sx={{height: '10px', width: '100%'}}/>
                                    </div>
                                }
                                {p.post.files.filter((val) => {
                                        return val.category == "other"
                                    }).length > 0 &&
                                    <div>
                                        <Box display="flex" justifyContent="center" alignItems="center"
                                             sx={{width: '100%'}}>
                                            <Box display="flex" justifyContent="start" alignItems="center"
                                                 sx={{width: '90%'}}>
                                                <Stack display="flex" justifyContent="start" spacing={2}>
                                                    {p.post.files.filter((val) => {
                                                        return val.category == "other"
                                                    }).map((other_file) => {
                                                        return (
                                                            <Box display="flex" justifyContent="start"
                                                                 alignItems="center">
                                                                <a href={'http://' + SERVER_URL + ':' + SERVER_PORT + '/files/' + p.post.post_id + '/' + other_file.name}>
                                                                    <Typography
                                                                        sx={{fontSize: 'subtitle1.fontSize'}}>
                                                                        {other_file.name}
                                                                    </Typography>
                                                                </a>
                                                            </Box>
                                                        )
                                                    })}
                                                </Stack>
                                            </Box>
                                        </Box>
                                        <Box sx={{height: '10px', width: '100%'}}/>
                                    </div>
                                }
                                <Grid container spacing={0}>
                                    <Grid xs={12}>
                                        <Stack display="flex" justifyContent="start" direction="row" spacing={1}
                                               sx={{height: '30px', padding: '20px'}}>
                                            <IconButton aria-label="favorite" size="small">
                                                <Stack alignItems="center" display="flex" justifyContent="start"
                                                       direction="row" spacing={1}>
                                                    <VisibilityOutlinedIcon/>
                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                        <Typography color="text.secondary"
                                                                    sx={{fontSize: 'subtitle1.fontSize'}}>
                                                            {p.post.stat.watch}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </IconButton>
                                            <IconButton aria-label="thumb up" size="small"
                                                        onClick={() => handleActionCLicked("like")}>
                                                <Stack alignItems="center" display="flex" justifyContent="start"
                                                       direction="row" spacing={1}>
                                                    <ThumbUpOutlinedIcon
                                                        color={p.post.like_ids.includes(user_profile.student_id) ? "primary" : "secondary"}/>
                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                        <Typography color="text.secondary"
                                                                    sx={{fontSize: 'subtitle1.fontSize'}}>
                                                            {p.post.stat.like}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </IconButton>
                                            <IconButton aria-label="favorite" size="small"
                                                        onClick={() => handleActionCLicked("favorite")}>
                                                <Stack alignItems="center" display="flex" justifyContent="start"
                                                       direction="row" spacing={1}>
                                                    <FavoriteBorderOutlinedIcon
                                                        color={p.post.favorite_ids.includes(user_profile.student_id) ? "primary" : "secondary"}/>
                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                        <Typography color="text.secondary"
                                                                    sx={{fontSize: 'subtitle1.fontSize'}}>
                                                            {p.post.stat.favorite}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </IconButton>
                                            <IconButton aria-label="comment" size="small"
                                                        onClick={() => {
                                                            p.set_is_commenting_on_post(true);
                                                            p.set_post_or_comment_id_commented_on(p.post.post_id);
                                                            handleCommentClicked()
                                                        }}>
                                                <Stack alignItems="center" display="flex" justifyContent="start"
                                                       direction="row" spacing={1}>
                                                    <CommentOutlinedIcon/>
                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                        <Typography color="text.secondary"
                                                                    sx={{fontSize: 'subtitle1.fontSize'}}>
                                                            {p.post.stat.comment}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </IconButton>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Stack>
                </Card>
            </Stack>
        </div>
    )
}

function Comment(p: { handle_scroll: () => void, cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void, depth: string, idx: number, comment: { comment_id: string, content: string, user_id: string, time: number, stat: { watch: number, like: number, favorite: number, comment: number }, files: { category: string, name: string }[], comment_ids: string[], watch_ids: string[], like_ids: string[], favorite_ids: string[] }, set_is_commenting_on_post: (value: (((prevState: boolean) => boolean) | boolean)) => void, set_post_or_comment_id_commented_on: (value: (((prevState: (string | undefined)) => (string | undefined)) | string | undefined)) => void, submit_success: boolean, page: number, action: number, set_action: (value: (((prevState: number) => number) | number)) => void }) {
    const navigate = useNavigate()

    const [user_profile, set_user_profile] = useState({student_id:"", name:"", sls_verification:false});

    useEffect(() => {
        if (p.cookies.token) {
            api_get_user_profile().then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_user_profile(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    p.setCookies("token", "", {path: "/", sameSite: 'none', secure: true})
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            })
        } else {
            set_user_profile({student_id:"", name:"", sls_verification:false});
        }
    }, [p.cookies.token])

    const [comment_user_profile, set_comment_user_profile] = useState({student_id:"", name:"", sls_verification:false});

    useEffect(() => {
        api_get_user_profile_with_student_id(p.comment.user_id).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_comment_user_profile(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [p.page, p.submit_success, p.comment])

    const [page, setPage] = useState(1);

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
    const [num_comments, set_num_comments] = useState(0);


    useEffect(() => {
        api_get_comments_of_comments(p.comment.comment_id, COMMENT_OF_COMMENT_PIECES, page).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_comments(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [page, p.page, p.submit_success, p.comment])


    useEffect(() => {
        api_get_comments_of_comments(p.comment.comment_id, MAX_PIECES, 1).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_num_comments(Math.ceil(result.data.length / COMMENT_OF_COMMENT_PIECES));
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [page, p.page, p.submit_success, p.comment])

    useEffect(() => {
        setPage(1)
    }, [p.page, p.submit_success, p.comment])

    const [image_clicked, set_image_clicked] = useState(false);
    const [image_src_clicked, set_image_src_clicked] = useState("");
    const handleBackdropClicked = () => {
        set_image_clicked(false);
    };

    const handleActionCLicked = (action_category: string) => {
        api_submit_an_action(action_category, false, p.comment.comment_id)
        p.set_action(-p.action)
    }

    const handleCommentClicked = () => {
        p.handle_scroll()
    }

    return (
        <div style={{width: '100%'}}>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={image_clicked}
                onClick={handleBackdropClicked}
                onExited={() => {
                }}
            >
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: String('url(' + image_src_clicked + ')'),
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '5px'
                }}/>
            </Backdrop>
            <Stack spacing={2} sx={{width: '100%'}}>
                <Stack spacing={0.1} sx={{width: '100%'}}>
                    <Card elevation={4}
                          sx={{width: '100%', borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}}>
                        <Box sx={{padding: '20px'}}>
                            <Grid container spacing={0}>
                                <Grid xs={9}>
                                    <Stack display="flex" justifyContent="start" direction="row" alignItems="center" spacing={1}>
                                        {comment_user_profile.sls_verification &&
                                            <Avatar sx={{bgcolor:"#1463d8", height:"24px", width:"96px", fontSize:"subtitle2.fontSize"}} variant="rounded">
                                                山林寺认证
                                            </Avatar>}
                                        <Box alignItems="center">
                                            {comment_user_profile.name.length > 0 ?
                                                <Link to={`/user/`+comment_user_profile.student_id} style={{textDecoration:"none"}}>
                                                    <Typography sx={{fontSize: 'subtitle2.fontSize'}}>
                                                        {comment_user_profile.name}
                                                    </Typography>
                                                </Link>
                                                :
                                                <CircularProgress size="10px" color="secondary"/>
                                            }
                                        </Box>
                                        <Box alignItems="center">
                                            <Typography color="text.secondary"
                                                        sx={{fontSize: 'subtitle2.fontSize'}}>
                                                {'评论于 ' + _getDate(p.comment.time)}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Grid>
                                <Grid xs={3}>
                                    <Stack display="flex" justifyContent="end" direction="row" spacing={1}>
                                        <Box alignItems="center">
                                            <Typography color="text.secondary"
                                                        sx={{fontSize: 'subtitle2.fontSize'}}>
                                                {p.depth + p.idx.toString() + "楼"}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                    <Card elevation={4}
                          sx={{width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>
                        <Stack spacing={2} sx={{width: '100%'}}>
                            <Grid container spacing={0}>
                                <Grid xs={12}>
                                    <Box sx={{padding: '20px'}}>
                                        <Box alignItems="center" sx={{width: '100%'}}>
                                            <Typography color="text.secondary"
                                                        sx={{fontSize: 'subtitle2.fontSize'}}>
                                                {p.comment.content}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {p.comment.files.filter((val) => {
                                            return val.category == "image"
                                        }).length > 0 &&
                                        <div>
                                            <Box display="flex" justifyContent="center" alignItems="center"
                                                 sx={{width: '100%'}}>
                                                <Box display="flex" justifyContent="start" alignItems="center"
                                                     sx={{width: '95%'}}>
                                                    <Grid container spacing={0}>
                                                        {p.comment.files.filter((val) => {
                                                            return val.category == "image"
                                                        }).map((image_file) => {
                                                            return (
                                                                <Grid xs={p.comment.files.filter((val) => {
                                                                    return val.category == "image"
                                                                }).length > 1 ? 4 : 8} display="flex"
                                                                      justifyContent="center"
                                                                      alignItems="center"
                                                                      sx={p.comment.files.filter((val) => {
                                                                          return val.category == "image"
                                                                      }).length > 1 ? {height: '150px'} : {height: '300px'}}>
                                                                    <Box onClick={() => {
                                                                        set_image_src_clicked('http://' + SERVER_URL + ':' + SERVER_PORT + '/files/' + p.comment.comment_id + '/' + image_file.name);
                                                                        set_image_clicked(true);
                                                                    }} sx={{
                                                                        width: '90%',
                                                                        height: '90%',
                                                                        backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/files/' + p.comment.comment_id + '/' + image_file.name + ')'),
                                                                        backgroundSize: 'contain',
                                                                        backgroundPosition: 'left top',
                                                                        backgroundRepeat: 'no-repeat',
                                                                    }}/>
                                                                </Grid>
                                                            )
                                                        })}
                                                    </Grid>
                                                </Box>
                                            </Box>
                                            <Box sx={{height: '10px', width: '100%'}}/>
                                        </div>
                                    }
                                    {p.comment.files.filter((val) => {
                                            return val.category == "other"
                                        }).length > 0 &&
                                        <div>
                                            <Box display="flex" justifyContent="center" alignItems="center"
                                                 sx={{width: '100%'}}>
                                                <Box display="flex" justifyContent="start" alignItems="center"
                                                     sx={{width: '90%'}}>
                                                    <Stack display="flex" justifyContent="start" spacing={2}>
                                                        {p.comment.files.filter((val) => {
                                                            return val.category == "other"
                                                        }).map((other_file) => {
                                                            return (
                                                                <Box display="flex" justifyContent="start"
                                                                     alignItems="center">
                                                                    <a href={'http://' + SERVER_URL + ':' + SERVER_PORT + '/files/' + p.comment.comment_id + '/' + other_file.name}>
                                                                        <Typography
                                                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                            {other_file.name}
                                                                        </Typography>
                                                                    </a>
                                                                </Box>
                                                            )
                                                        })}
                                                    </Stack>
                                                </Box>
                                            </Box>
                                            <Box sx={{height: '10px', width: '100%'}}/>
                                        </div>
                                    }
                                    <Grid container spacing={0}>
                                        <Grid xs={9}>
                                            <Stack display="flex" justifyContent="start" direction="row" spacing={1}
                                                   sx={{height: '30px', padding: '20px'}}>
                                                <IconButton aria-label="thumb up" size="small"
                                                            onClick={() => handleActionCLicked("like")}>
                                                    <Stack alignItems="center" display="flex" justifyContent="start"
                                                           direction="row" spacing={1}>
                                                        <ThumbUpOutlinedIcon
                                                            color={p.comment.like_ids.includes(user_profile.student_id) ? "primary" : "secondary"}/>
                                                        <Box alignItems="center" sx={{width: '100%'}}>
                                                            <Typography color="text.secondary"
                                                                        sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                {p.comment.stat.like}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </IconButton>
                                                <IconButton aria-label="comment" size="small"
                                                            onClick={() => {
                                                                p.set_is_commenting_on_post(false);
                                                                p.set_post_or_comment_id_commented_on(p.comment.comment_id);
                                                                handleCommentClicked();
                                                            }}>
                                                    <Stack alignItems="center" display="flex" justifyContent="start"
                                                           direction="row" spacing={1}>
                                                        <CommentOutlinedIcon/>
                                                        <Box alignItems="center" sx={{width: '100%'}}>
                                                            <Typography color="text.secondary"
                                                                        sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                {p.comment.stat.comment}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </IconButton>
                                            </Stack>
                                        </Grid>
                                        <Grid xs={3}>
                                            <Stack display="flex" justifyContent="end" direction="row" spacing={1}
                                                   sx={{height: '30px', padding: '20px'}}>
                                                {page > 1 &&
                                                    <IconButton aria-label="prev" size="small" onClick={() => {
                                                        setPage(Math.max(page - 1, 1))
                                                    }}>
                                                        <ArrowBackIosIcon color={"primary"}/>
                                                    </IconButton>}
                                                {page < num_comments &&
                                                    <IconButton aria-label="next" size="small" onClick={() => {
                                                        setPage(Math.min(page + 1, num_comments))
                                                    }}>
                                                        <ArrowForwardIosIcon color={"primary"}/>
                                                    </IconButton>}
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Card>
                </Stack>
                {comments.length > 0 && (comments[0].comment_id.length > 0 ?
                    <Stack spacing={2} sx={{width: '100%'}}>
                        {comments.map((comment, idx) => {
                            return (
                                <Stack spacing={0} display="flex" direction="row">
                                    <ReplyIcon color={"primary"} sx={{padding: "10px", fontSize: 40}}/>
                                    <Comment handle_scroll={p.handle_scroll} cookies={p.cookies}
                                             setCookies={p.setCookies} depth={p.depth + p.idx.toString() + "."}
                                             idx={idx + (page - 1) * COMMENT_OF_COMMENT_PIECES + 1} comment={comment}
                                             set_is_commenting_on_post={p.set_is_commenting_on_post}
                                             set_post_or_comment_id_commented_on={p.set_post_or_comment_id_commented_on}
                                             submit_success={p.submit_success} page={page + p.page} action={p.action}
                                             set_action={p.set_action}/>
                                </Stack>
                            )
                        })}
                    </Stack>
                    :
                    <Box display="flex" justifyContent="center" sx={{width: '100%'}}>
                        <CircularProgress color="primary"/>
                    </Box>)
                }
            </Stack>
        </div>
    )
}

function SendNewComment(p: { is_commenting_on_post: boolean, post_or_comment_id_commented_on: string, cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void, submit_success: boolean, set_submit_success: (value: (((prevState: boolean) => boolean) | boolean)) => void }) {
    const navigate = useNavigate()

    const [comment, set_comment] = useState({
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
    });

    useEffect(() => {
        if (!p.is_commenting_on_post) {
            api_get_comment_with_id(p.post_or_comment_id_commented_on).then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_comment(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            })
        }
    }, [p.is_commenting_on_post, p.post_or_comment_id_commented_on])

    const [comment_user_profile, set_comment_user_profile] = useState({student_id:"", name:"", sls_verification:false});

    useEffect(() => {
        if (comment.user_id.length > 0) {
            api_get_user_profile_with_student_id(comment.user_id).then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_comment_user_profile(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            })
        }
    }, [comment])

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

    const [user_profile, set_user_profile] = useState({student_id:"", name:"", sls_verification:false});

    useEffect(() => {
        if (p.cookies.token) {
            api_get_user_profile().then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_user_profile(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    p.setCookies("token", "", {path: "/", sameSite: 'none', secure: true})
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            })
        } else {
            set_user_profile({student_id:"", name:"", sls_verification:false});
        }
    }, [p.cookies.token])

    const [image_files_selected, set_image_files_selected] = useState([{name: "", url: "", file: new File([], "")}])
    const [other_files_selected, set_other_files_selected] = useState([{name: "", url: "", file: new File([], "")}])

    const [image_files_order, set_image_files_order] = useState([0])
    const [other_files_order, set_other_files_order] = useState([0])

    const handleImageFile = (files: FileList | null) => {
        if (files) {
            if (files.length > 0) {
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

    const handleOtherFile = (files: FileList | null) => {
        if (files) {
            if (files.length > 0) {
                let _other_files_selected = [];
                let _other_files_order = [];
                for (let i = 0; i < files.length; i++) {
                    _other_files_selected.push({
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                        file: files[i]
                    })
                    _other_files_order.push(i);
                }
                set_other_files_selected(_other_files_selected)
                set_other_files_order(_other_files_order)
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
                _files.push({category: "image", name: image_files_selected[image_files_order[i]].name})
            }
        }
        if (other_files_selected[0].name.length > 0) {
            for (let i = 0; i < other_files_order.length; i++) {
                _files.push({category: "other", name: other_files_selected[other_files_order[i]].name})
            }
        }
        set_files(_files)
    }

    useEffect(() => {
        sync_with_files();
    }, [image_files_selected, other_files_selected, image_files_order, other_files_order])


    const [content, set_content] = useState("");
    const [content_error_text, set_content_error_text] = useState("");
    const [files, set_files] = useState([{category: "", name: ""}]);
    const [submit_clicked, set_submit_clicked] = useState(false);

    const check_comment_content = (comment_content: string) => {
        if (comment_content.length == 0) {
            set_content_error_text("内容不能为空")
        } else {
            set_content_error_text("")
        }
    }

    const handleComment = async () => {
        check_comment_content(content)
        // 检查合法，是否允许发送
        if (!p.cookies.token) {
            p.set_submit_success(false);
            set_submit_clicked(false);
            navigate(`/error`, {replace: false, state: {error: "抱歉，请登录后再试"}})
        } else if (content_error_text.length == 0 && content.length > 0) {
            set_submit_clicked(true);
            const comment_id = _hash(p.cookies.token + time_stamp.toString());
            if (files.length > 0) {
                const result = await api_submit_files(comment_id, image_files_selected.concat(other_files_selected), image_files_order.concat(other_files_order.map((v) => {
                    return v + image_files_selected.length
                })));
                if (result.status == API_STATUS.SUCCESS) {
                    const result = await api_submit_new_comment(p.is_commenting_on_post, p.post_or_comment_id_commented_on, comment_id, content, time_stamp, files);
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
                const result = await api_submit_new_comment(p.is_commenting_on_post, p.post_or_comment_id_commented_on, comment_id, content, time_stamp, files);
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
                        sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                        发送成功
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center"
                     sx={{width: '100%'}}>
                    <Typography sx={{fontSize: 'subtitle1.fontSize'}}>
                        You've Submitted Your Comment Successfully.
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
                                            <Grid xs={12}>
                                                <Box sx={{
                                                    paddingTop: '20px',
                                                    paddingLeft: '20px',
                                                    paddingRight: '20px'
                                                }}>
                                                    <Box alignItems="center" sx={{width: '100%'}}>
                                                        <Typography color="text.secondary" sx={{
                                                            fontSize: 'subtitle2.fontSize',
                                                            WebkitLineClamp: "2",
                                                            display: "-webkit-box",
                                                            WebkitBoxOrient: "vertical"
                                                        }}>
                                                            {p.is_commenting_on_post ? "评论本帖" : "评论 " + comment_user_profile.name + "：" + (comment.content)}
                                                        </Typography>
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
                                                                check_comment_content(event.target.value);
                                                            }}
                                                            error={content_error_text.length != 0}
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
                                                    <Grid xs={8}>
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
                                                                    <Link to={'/login'} style={{textDecoration: "none"}}>
                                                                        <Typography sx={{fontSize: 'subtitle2.fontSize'}}>
                                                                            评论需先登录
                                                                        </Typography>
                                                                    </Link>
                                                                }
                                                            </Box>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {image_files_selected[0].name.length > 0 &&
                                            <div>
                                                <Stack spacing={1} display="flex" justifyContent="center"
                                                       alignItems="center"
                                                       sx={{width: '100%'}}>
                                                    <Box display="flex" justifyContent="start" alignItems="center"
                                                         sx={{width: '90%', height: '100%'}}>
                                                        <Typography color="text.secondary"
                                                                    sx={{fontSize: 'subtitle2.fontSize'}}>
                                                            提示：单击图片调整顺序
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" justifyContent="start" alignItems="center"
                                                         sx={{width: '95%'}}>
                                                        <Grid container spacing={0}>
                                                            {image_files_selected.map((image_file, idx) => {
                                                                return (
                                                                    <Grid xs={image_files_selected.length > 1 ? 4 : 8}
                                                                          display="flex" justifyContent="center"
                                                                          alignItems="center"
                                                                          sx={image_files_selected.length > 1 ? {height: '150px'} : {height: '300px'}}>
                                                                        <Badge
                                                                            badgeContent={image_files_order.indexOf(idx) + 1}
                                                                            color="primary"
                                                                            sx={{width: '90%', height: '90%'}}
                                                                            anchorOrigin={{
                                                                                horizontal: 'left',
                                                                                vertical: 'top'
                                                                            }}>
                                                                            <Box border="1px solid grey"
                                                                                 onClick={() => {
                                                                                     handleImageFileOrder(idx)
                                                                                 }} sx={{
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                backgroundImage: String('url(' + image_file.url + ')'),
                                                                                backgroundSize: 'contain',
                                                                                backgroundPosition: 'center center',
                                                                                backgroundRepeat: 'no-repeat',
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
                                                <Stack spacing={2} display="flex" justifyContent="center"
                                                       alignItems="center"
                                                       sx={{width: '100%'}}>
                                                    <Box display="flex" justifyContent="start" alignItems="center"
                                                         sx={{width: '90%', height: '100%'}}>
                                                        <Typography color="text.secondary"
                                                                    sx={{fontSize: 'subtitle2.fontSize'}}>
                                                            提示：单击附件调整顺序
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" justifyContent="start" alignItems="center"
                                                         sx={{width: '90%'}}>
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
                                            handleComment()
                                        }}>发送评论</Button>
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{height: '40px', width: '100%'}}/>
                </Paper>
            </div>
        )
    }
}

function PostAndItsComments(p: { handle_scroll: () => void, post_id: string, cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void, set_is_commenting_on_post: (value: (((prevState: boolean) => boolean) | boolean)) => void, set_post_or_comment_id_commented_on: (value: (((prevState: (string | undefined)) => (string | undefined)) | string | undefined)) => void, submit_success: boolean }) {
    const navigate = useNavigate()

    const [page, setPage] = React.useState(1);
    const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const [post, set_post] = useState({
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
        favorite_ids: [""]
    });
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
    const [num_comments, set_num_comments] = useState(0);

    const [action, set_action] = useState(1);


    useEffect(() => {
        api_get_post_with_id(p.post_id).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_post(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [action])

    useEffect(() => {
        api_get_comments(p.post_id, COMMENT_PIECES, page).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_comments(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [page, p.submit_success, action])


    useEffect(() => {
        api_get_comments(p.post_id, MAX_PIECES, 1).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_num_comments(Math.ceil(result.data.length / COMMENT_PIECES));
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [page, p.submit_success, action])

    return (
        <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}}>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Stack spacing={2} sx={{width: '80%'}}>
                    {page == 1 && (post.title.length > 0 ?
                        <Post handle_scroll={p.handle_scroll} post={post} cookies={p.cookies} setCookies={p.setCookies}
                              set_is_commenting_on_post={p.set_is_commenting_on_post}
                              set_post_or_comment_id_commented_on={p.set_post_or_comment_id_commented_on}
                              action={action} set_action={set_action}/>
                        :
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                            <CircularProgress color="primary"/>
                        </Box>)
                    }
                    {comments.length > 0 ? comments[0].comment_id.length > 0 ?
                            comments.map((comment, idx) => {
                                return <Comment handle_scroll={p.handle_scroll} cookies={p.cookies}
                                                setCookies={p.setCookies} depth=""
                                                idx={idx + (page - 1) * COMMENT_PIECES + 1} comment={comment}
                                                set_is_commenting_on_post={p.set_is_commenting_on_post}
                                                set_post_or_comment_id_commented_on={p.set_post_or_comment_id_commented_on}
                                                submit_success={p.submit_success} page={page} action={action}
                                                set_action={set_action}/>
                            })
                            :
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <CircularProgress color="primary"/>
                            </Box>
                        :
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                            <Typography color='grey' sx={{fontSize: 'subtitle1.fontSize'}}>
                                暂无评论
                            </Typography>
                        </Box>
                    }
                </Stack>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Pagination showFirstButton showLastButton count={num_comments} page={page} onChange={handlePage}
                            color="primary"/>
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
        </Paper>
    )
}

function PostContent(p: { post_id: string | undefined, cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!p.post_id) {
            navigate(`/error`, {replace: false, state: {error: "该帖子不存在"}})
        }
    }, [])

    const [is_commenting_on_post, set_is_commenting_on_post] = useState(true)
    const [post_or_comment_id_commented_on, set_post_or_comment_id_commented_on] = useState(p.post_id)

    const [submit_success, set_submit_success] = useState(false);

    const scroll_ref = useRef<null | HTMLDivElement>(null);
    const handle_scroll = () => {
        if (scroll_ref.current) {
            scroll_ref.current.scrollIntoView({block: 'end', behavior: "smooth"});
        }
    }

    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(to right, #B1B8BF, #B1B8BF, #ABB3BA, #A9B1B7, #AAB1B8)',
            borderRadius: '20px'
        }}>
            <Box sx={{
                width: '100%',
                backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/images/others/home_sls_1.png' + ')'),
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
                borderRadius: '20px'
            }}>
                <Box sx={{height: '10px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <TopMenu/>
                </Box>
                <Box sx={{height: '20px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Stack spacing={2} sx={{width: '80%'}}>
                        <Box sx={{height: '10px', width: '100%'}}/>
                        {p.post_id &&
                            <PostAndItsComments handle_scroll={handle_scroll} post_id={p.post_id} cookies={p.cookies}
                                                setCookies={p.setCookies}
                                                set_is_commenting_on_post={set_is_commenting_on_post}
                                                set_post_or_comment_id_commented_on={set_post_or_comment_id_commented_on}
                                                submit_success={submit_success}/>}
                        <Box sx={{height: '10px', width: '100%'}}/>
                        {p.post_id && post_or_comment_id_commented_on &&
                            <SendNewComment is_commenting_on_post={is_commenting_on_post}
                                            post_or_comment_id_commented_on={post_or_comment_id_commented_on}
                                            cookies={p.cookies} setCookies={p.setCookies}
                                            submit_success={submit_success} set_submit_success={set_submit_success}/>}
                        <Box sx={{height: '50px', width: '100%'}} ref={scroll_ref}/>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default PostContent;
