import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {_getDate, API_STATUS, SERVER_PORT, SERVER_URL} from "../config";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import {CardActionArea} from '@mui/material';
import Grid from "@mui/material/Grid";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import CircularProgress from "@mui/material/CircularProgress";
import {api_get_user_profile_with_student_id, api_submit_an_action,} from "../api/api";
import Avatar from "@mui/material/Avatar";

function Post(p: { post: { post_id: string, title: string, content: string, user_id: string, time: number, stat: { watch: number, like: number, favorite: number, comment: number }, files: { category: string, name: string }[], comment_ids: string[], watch_ids: string[], like_ids: string[], favorite_ids: string[], category: string }, submit_success?: boolean, page?: number }) {
    const navigate = useNavigate()

    const [post_user_profile, set_post_user_profile] = useState({student_id: "", name: "", sls_verification: false});

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
    }, [p.page, p.post, p.submit_success])

    const handleClickingPost = (post_id: string) => {
        api_submit_an_action("watch", true, post_id)
        window.open(`/post/` + post_id, '_blank')
    }

    return (
        <Card elevation={4} sx={{width: '100%', borderRadius: '20px'}}>
            <CardActionArea onClick={() => {
                handleClickingPost(p.post.post_id)
            }}>
                <Grid container spacing={0}>
                    <Grid xs={p.post.files.filter((val) => {
                        return val.category == "image"
                    }).length > 0 ? 9 : 12}>
                        <Box sx={{paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
                            <Stack display="flex" direction="row" alignItems="center" spacing={1} sx={{width: '100%'}}>
                                <Box display="flex" justifyContent="start" alignItems="center" sx={{width: '90%'}}>
                                    <Typography sx={{
                                        fontSize: 'h6.fontSize',
                                        display: "-webkit-box",
                                        WebkitLineClamp: "1",
                                        WebkitBoxOrient: "vertical"
                                    }}>
                                        {p.post.title}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="end" alignItems="center" sx={{width: '10%'}}>
                                    <Typography color="text.secondary"
                                                sx={{fontSize: 'subtitle2.fontSize'}}
                                                textAlign="end">
                                        {p.post.category == "resource" ? "资源天地" :
                                            p.post.category == "question" ? "答疑解惑" :
                                                p.post.category == "activity" ? "活动纪实" :
                                                    p.post.category == "fun" ? "畅所欲言" :
                                                        "未知版面"}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Box alignItems="center" sx={{width: '100%'}}>
                                <Typography color="text.secondary" sx={{
                                    fontSize: 'subtitle2.fontSize',
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical"
                                }}>
                                    {p.post.content}
                                </Typography>
                            </Box>
                        </Box>
                        <Grid container spacing={0}>
                            <Grid xs={4}>
                                <Stack display="flex" justifyContent="start" direction="row" spacing={1}
                                       sx={{height: '30px', padding: '20px'}}>
                                    <IconButton aria-label="favorite" size="small">
                                        <Stack alignItems="center" display="flex" justifyContent="start" direction="row"
                                               spacing={1}>
                                            <VisibilityOutlinedIcon/>
                                            <Box alignItems="center" sx={{width: '100%'}}>
                                                <Typography color="text.secondary"
                                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                                    {p.post.stat.watch}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </IconButton>
                                    <IconButton aria-label="thumb up" size="small">
                                        <Stack alignItems="center" display="flex" justifyContent="start" direction="row"
                                               spacing={1}>
                                            <ThumbUpOutlinedIcon/>
                                            <Box alignItems="center" sx={{width: '100%'}}>
                                                <Typography color="text.secondary"
                                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                                    {p.post.stat.like}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </IconButton>
                                    <IconButton aria-label="favorite" size="small">
                                        <Stack alignItems="center" display="flex" justifyContent="start" direction="row"
                                               spacing={1}>
                                            <FavoriteBorderOutlinedIcon/>
                                            <Box alignItems="center" sx={{width: '100%'}}>
                                                <Typography color="text.secondary"
                                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                                    {p.post.stat.favorite}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </IconButton>
                                    <IconButton aria-label="comment" size="small">
                                        <Stack alignItems="center" display="flex" justifyContent="start" direction="row"
                                               spacing={1}>
                                            <CommentOutlinedIcon/>
                                            <Box alignItems="center" sx={{width: '100%'}}>
                                                <Typography color="text.secondary"
                                                            sx={{fontSize: 'subtitle2.fontSize'}}>
                                                    {p.post.stat.comment}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </IconButton>
                                </Stack>
                            </Grid>
                            <Grid xs={8}>
                                <Stack display="flex" justifyContent="end" direction="row" alignItems="center"
                                       spacing={1}
                                       sx={{height: '30px', padding: '20px'}}>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Typography color="text.secondary" sx={{fontSize: 'subtitle2.fontSize'}}>
                                            {_getDate(p.post.time)}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        {post_user_profile.name.length > 0 ?
                                            <Typography sx={{fontSize: 'subtitle2.fontSize'}}>
                                                {post_user_profile.name}
                                            </Typography>
                                            :
                                            <CircularProgress size="10px" color="secondary"/>
                                        }
                                    </Box>
                                    {post_user_profile.sls_verification &&
                                        <Avatar sx={{
                                            bgcolor: "#1463d8",
                                            height: "24px",
                                            width: "96px",
                                            fontSize: "subtitle2.fontSize"
                                        }} variant="rounded">
                                            山林寺认证
                                        </Avatar>}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    {p.post.files.filter((val) => {
                            return val.category == "image"
                        }).length > 0 &&
                        <Grid xs={3}>
                            <Box sx={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/files/' + p.post.post_id + '/' + p.post.files.filter((val) => {
                                    return val.category == "image"
                                })[0].name + ')'),
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                                borderTopRightRadius: '20px',
                                borderBottomRightRadius: '20px'
                            }}/>
                        </Grid>
                    }
                </Grid>
            </CardActionArea>
        </Card>
    )
}

export default Post;
