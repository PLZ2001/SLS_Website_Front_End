import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {_getDate, _hash, API_STATUS, MAX_PIECES, POST_PIECES, SERVER_PORT, SERVER_URL, USER_POST_PIECES} from "../config";
import TopMenu from "../home_page/TopMenu";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import {useNavigate} from "react-router-dom";
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
    api_get_user_profile_with_student_id,
    api_get_posts,
    api_get_user_profile,
    api_submit_an_action,
    api_submit_files,
    api_submit_new_post,
    api_get_posts_with_student_id,
    api_get_favorite_posts_with_student_id
} from "../api/api";
import Avatar from "@mui/material/Avatar";
import Post from'../forum_page/Post';


function UserProfile(p:{student_id:string}) {
    const navigate = useNavigate()

    const [user_profile, set_user_profile] = useState({student_id:"", name:"", sls_verification:false});

    useEffect(() => {
        api_get_user_profile_with_student_id(p.student_id).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_user_profile(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [p.student_id])

    return (
        <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}} color={"p"}>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    用户信息
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography sx={{fontSize: 'subtitle1.fontSize'}}>
                    User Profile
                </Typography>
            </Box>
            <Box sx={{height: '20px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                {user_profile.name.length > 0 ?
                    <Stack display="flex" justifyContent="center" alignItems="center" direction="row" spacing={2} sx={{width: '80%'}}>
                        <Stack spacing={0.1} sx={{width: '100%'}}>
                            <Card elevation={4} sx={{width: '100%', borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}}>
                                <Box  display="flex" justifyContent="center" alignItems="center" sx={{padding: '20px'}}>
                                    <Typography sx={{fontSize: 'h5.fontSize'}}>
                                        {user_profile.student_id}
                                    </Typography>
                                </Box>
                            </Card>
                            <Card elevation={4} sx={{width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>
                                <Box  display="flex" justifyContent="center" alignItems="center" sx={{padding: '10px'}}>
                                    <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                        账号
                                    </Typography>
                                </Box>
                            </Card>
                        </Stack>
                        <Stack spacing={0.1} sx={{width: '100%'}}>
                            <Card elevation={4} sx={{width: '100%', borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}}>
                                <Box  display="flex" justifyContent="center" alignItems="center" sx={{padding: '20px'}}>
                                    <Typography sx={{fontSize: 'h5.fontSize'}}>
                                        {user_profile.name}
                                    </Typography>
                                </Box>
                            </Card>
                            <Card elevation={4} sx={{width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>
                                <Box  display="flex" justifyContent="center" alignItems="center" sx={{padding: '10px'}}>
                                    <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                        昵称
                                    </Typography>
                                </Box>
                            </Card>
                        </Stack>
                        <Stack spacing={0.1} sx={{width: '100%'}}>
                            <Card elevation={4} sx={{width: '100%', borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}}>
                                <Box  display="flex" justifyContent="center" alignItems="center" sx={{padding: '20px'}}>
                                    <Typography sx={{fontSize: 'h5.fontSize'}}>
                                        {user_profile.sls_verification ?
                                            <Typography sx={{fontSize: 'h5.fontSize'}}>
                                                已认证
                                            </Typography>
                                        :
                                            <Typography sx={{fontSize: 'h5.fontSize'}}>
                                                未认证
                                            </Typography>
                                        }
                                    </Typography>
                                </Box>
                            </Card>
                            <Card elevation={4} sx={{width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}>
                                <Box  display="flex" justifyContent="center" alignItems="center" sx={{padding: '10px'}}>
                                    <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                        山林寺身份认证
                                    </Typography>
                                </Box>
                            </Card>
                        </Stack>
                    </Stack>
                :
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                        <CircularProgress color="primary"/>
                    </Box>
                }
            </Box>
            <Box sx={{height: '40px', width: '100%'}}/>
        </Paper>
    )
}

function UserPosts(p:{student_id:string}) {
    const navigate = useNavigate()

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

    // useEffect(() => {
    //     api_get_posts_with_student_id(USER_POST_PIECES, page, p.student_id).then((result) => {
    //         if (result.status == API_STATUS.SUCCESS) {
    //             set_posts(result.data);
    //         } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
    //             navigate(`/error`, {replace: false, state: {error: result.reasons}})
    //         } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
    //             navigate(`/error`, {replace: false, state: {error: null}})
    //         }
    //     })
    // }, [page])

    useEffect(() => {
        api_get_posts_with_student_id(MAX_PIECES, 1, p.student_id).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_num_posts(Math.ceil(result.data.length / POST_PIECES));
                set_posts(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [page])

    return (
        <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}} color={"p"}>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    发布的帖子
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography sx={{fontSize: 'subtitle1.fontSize'}}>
                    Posts Submitted
                </Typography>
            </Box>
            <Box sx={{height: '20px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Stack spacing={2} sx={{width: '80%'}}>
                    {posts.length > 0 ? posts[0].post_id.length > 0 ?
                            posts.slice((page-1)*POST_PIECES, page*POST_PIECES).map((post) => {
                                return <Post post={post} page={page}/>
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

function UserFavoritePosts(p:{student_id:string}) {
    const navigate = useNavigate()

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

    // useEffect(() => {
    //     api_get_favorite_posts_with_student_id(USER_POST_PIECES, page, p.student_id).then((result) => {
    //         if (result.status == API_STATUS.SUCCESS) {
    //             set_posts(result.data);
    //         } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
    //             navigate(`/error`, {replace: false, state: {error: result.reasons}})
    //         } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
    //             navigate(`/error`, {replace: false, state: {error: null}})
    //         }
    //     })
    // }, [page])

    useEffect(() => {
        api_get_favorite_posts_with_student_id(MAX_PIECES, 1, p.student_id).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_num_posts(Math.ceil(result.data.length / POST_PIECES));
                set_posts(result.data);
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                navigate(`/error`, {replace: false, state: {error: null}})
            }
        })
    }, [page])

    return (
        <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}} color={"p"}>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    收藏的帖子
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography sx={{fontSize: 'subtitle1.fontSize'}}>
                    Favorite Posts
                </Typography>
            </Box>
            <Box sx={{height: '20px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Stack spacing={2} sx={{width: '80%'}}>
                    {posts.length > 0 ? posts[0].post_id.length > 0 ?
                            posts.slice((page-1)*POST_PIECES, page*POST_PIECES).map((post) => {
                                return <Post post={post} page={page}/>
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

function UserContent(p: { cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void, student_id:string|undefined }) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!p.student_id) {
            navigate(`/error`, {replace: false, state: {error: "该用户不存在"}})
        }
    }, [])

    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(to right, #B1B8BF, #B1B8BF, #ABB3BA, #A9B1B7, #AAB1B8)',
            borderRadius: '20px'
        }}>
            <Box sx={{
                width: '100%',
                backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/images/others/home_sls_1.webp' + ')'),
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
                        {p.student_id && <UserProfile student_id={p.student_id}/>}
                        <Box sx={{height: '10px', width: '100%'}}/>
                        {p.student_id && <UserPosts student_id={p.student_id}/>}
                        <Box sx={{height: '10px', width: '100%'}}/>
                        {p.student_id && <UserFavoritePosts student_id={p.student_id}/>}
                        <Box sx={{height: '50px', width: '100%'}}/>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default UserContent;
