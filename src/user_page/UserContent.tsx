import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {API_STATUS, MAX_PIECES, SERVER_PORT, SERVER_URL, USER_POST_PIECES} from "../config";
import TopMenu from "../home_page/TopMenu";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {CookieSetOptions} from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import {
    api_get_favorite_posts_with_student_id,
    api_get_posts_with_student_id,
    api_get_sls_member_profile, api_get_sls_member_profile_with_student_id,
    api_get_user_profile,
    api_get_user_profile_with_student_id,
    api_submit_sls_member_image,
    api_submit_sls_member_profile_update,
} from "../api/api";
import Post from '../forum_page/Post';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import Backdrop from "@mui/material/Backdrop";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";


function UserProfile(p: { student_id: string }) {
    const navigate = useNavigate()

    const [user_profile, set_user_profile] = useState({student_id: "", name: "", sls_verification: false});

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

    useEffect(() => {
        document.title = `用户中心 - ${user_profile.name} - 山林寺课题组`
    }, [user_profile])

    const [sls_member_profile, set_sls_member_profile] = useState({
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
    });

    useEffect(() => {
        if (user_profile.sls_verification) {
            api_get_sls_member_profile_with_student_id(user_profile.student_id).then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_sls_member_profile(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            })
        }
    }, [user_profile])

    return (
        <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}} color={"p"}>
            <Box sx={{height: '40px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    用户信息
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    User Profile
                </Typography>
            </Box>
            <Box sx={{height: '20px', width: '100%'}}/>
            {user_profile.name.length > 0 ?
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Stack display="flex" justifyContent="center" alignItems="start" direction="row" spacing={0}
                           sx={{width: '80%'}}>
                        <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '33.3%'}}>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                    账号
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <Typography sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                    {user_profile.student_id}
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '33.3%'}}>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                    昵称
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <Typography sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                    {user_profile.name}
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '33.3%'}}>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                    山林寺身份认证
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                                {user_profile.sls_verification ?
                                    <Link href={sls_member_profile.url} underline="hover">
                                        <Avatar sx={{
                                            bgcolor: "#1463d8",
                                            height: "24px",
                                            width: "96px",
                                            fontSize: "subtitle2.fontSize"
                                        }} variant="rounded">
                                            山林寺认证
                                        </Avatar>
                                    </Link>
                                    :
                                    <Typography sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                        未认证
                                    </Typography>
                                }
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
                :
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <CircularProgress color="primary"/>
                </Box>
            }
            <Box sx={{height: '40px', width: '100%'}}/>
        </Paper>
    )
}

function SlsMemberProfile(p: { cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void }) {
    const navigate = useNavigate()

    const [sls_member_profile, set_sls_member_profile] = useState({
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
    });


    const [update_submitted, set_update_submitted] = useState(false);
    const [update_success, set_update_success] = useState(false);
    const [image_success, set_image_success] = useState(false);

    const [is_editing, set_is_editing] = useState(false)

    const [email, set_email] = useState("");
    const [email_error_text, set_email_error_text] = useState("");
    const check_email = (email: string) => {
        set_email_error_text("")
    }
    const [phone_number, set_phone_number] = useState("");
    const [phone_number_error_text, set_phone_number_error_text] = useState("");
    const check_phone_number = (phone_number: string) => {
        set_phone_number_error_text("")
    }
    const [url, set_url] = useState("");
    const [url_error_text, set_url_error_text] = useState("");
    const check_url = (url: string) => {
        if (url.length == 0) {
            set_url_error_text("个人主页不能为空")
        } else {
            set_url_error_text("")
        }
    }
    const [introduction, set_introduction] = useState("");
    const [introduction_error_text, set_introduction_error_text] = useState("");
    const check_introduction = (introduction: string) => {
        set_introduction_error_text("")
    }
    const [paper_years, set_paper_years] = useState([""]);
    const [paper_years_error_texts, set_paper_years_error_texts] = useState([""]);
    const check_paper_years = (paper_years: string[]) => {
        set_paper_years_error_texts(paper_years.map((value) => {
            if (value.length == 0) {
                return "年份不能为空";
            } else {
                return "";
            }
        }))
    }
    const [papers, set_papers] = useState([[""]]);
    const [papers_error_texts, set_papers_error_texts] = useState([[""]]);
    const check_papers = (papers: string[][]) => {
        set_papers_error_texts(papers.map((value) => {
            return value.map((value) => {
                if (value.length == 0) {
                    return "论文不能为空";
                } else {
                    return "";
                }
            })
        }))
    }

    useEffect(() => {
        if (p.cookies.token) {
            api_get_sls_member_profile().then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_sls_member_profile(result.data);
                    set_email(result.data.email);
                    check_email(result.data.email);
                    set_phone_number(result.data.phone_number);
                    check_phone_number(result.data.phone_number);
                    set_url(result.data.url);
                    check_url(result.data.url);
                    set_introduction(result.data.introduction);
                    check_introduction(result.data.introduction);
                    set_paper_years(result.data.paper_years);
                    check_paper_years(result.data.paper_years);
                    set_papers(result.data.papers);
                    check_papers(result.data.papers);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    p.setCookies("token", "", {path: "/"})
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            })
        } else {
            set_sls_member_profile({
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
            });
        }
    }, [p.cookies.token, update_success, image_success])

    const handle_year_removing = (idx_of_paper_years: number) => {
        set_paper_years(paper_years.filter((val_of_paper_years_looking_for, idx_of_paper_years_looking_for) => {
            return idx_of_paper_years_looking_for != idx_of_paper_years;
        }));
        check_paper_years(paper_years.filter((val_of_paper_years_looking_for, idx_of_paper_years_looking_for) => {
            return idx_of_paper_years_looking_for != idx_of_paper_years;
        }));
        set_papers(papers.filter((val_of_papers_of_specific_year, idx_of_papers_of_specific_year) => {
            return idx_of_papers_of_specific_year != idx_of_paper_years;
        }));
        check_papers(papers.filter((val_of_papers_of_specific_year, idx_of_papers_of_specific_year) => {
            return idx_of_papers_of_specific_year != idx_of_paper_years;
        }));
    };

    const handle_year_adding = () => {
        set_paper_years(paper_years.concat([""]));
        check_paper_years(paper_years.concat([""]));
        set_papers(papers.concat([[]]));
        check_papers(papers.concat([[]]));
    };

    const handle_paper_adding = (idx_of_paper_years: number) => {
        set_papers(papers.map((val_of_papers_of_specific_year, idx_of_papers_of_specific_year) => {
            if (idx_of_papers_of_specific_year == idx_of_paper_years) {
                return val_of_papers_of_specific_year.concat([""]);
            } else {
                return val_of_papers_of_specific_year;
            }
        }));
        check_papers(papers.map((val_of_papers_of_specific_year, idx_of_papers_of_specific_year) => {
            if (idx_of_papers_of_specific_year == idx_of_paper_years) {
                return val_of_papers_of_specific_year.concat([""]);
            } else {
                return val_of_papers_of_specific_year;
            }
        }));
    };

    const handle_paper_removing = (idx_of_paper_years: number, idx_of_papers: number) => {
        set_papers(papers.map((val_of_papers_of_specific_year, idx_of_papers_of_specific_year) => {
            return val_of_papers_of_specific_year.filter((val_of_papers_looking_for, idx_of_papers_looking_for) => {
                return !(idx_of_papers_of_specific_year == idx_of_paper_years && idx_of_papers == idx_of_papers_looking_for);
            })
        }));
        check_papers(papers.map((val_of_papers_of_specific_year, idx_of_papers_of_specific_year) => {
            return val_of_papers_of_specific_year.filter((val_of_papers_looking_for, idx_of_papers_looking_for) => {
                return !(idx_of_papers_of_specific_year == idx_of_paper_years && idx_of_papers == idx_of_papers_looking_for);
            })
        }));
    };

    const handleImageFile = async (files: FileList | null) => {
        if (files) {
            if (files.length > 0) {
                let _image_files_selected = [];
                let _image_files_order = [];
                for (let i = 0; i < files.length; i++) {
                    _image_files_selected.push({
                        name: files[i].name,
                        file: files[i]
                    })
                    _image_files_order.push(i);
                }
                set_update_submitted(true);
                const result = await api_submit_sls_member_image(_image_files_selected, _image_files_order);
                if (result.status == API_STATUS.SUCCESS) {
                    set_image_success(true);
                    set_update_submitted(false);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    set_image_success(false);
                    set_update_submitted(false);
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    set_image_success(false);
                    set_update_submitted(false);
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            }
        }
    }

    const handle_submit_sls_member_profile_update = async () => {
        check_email(email)
        check_phone_number(phone_number)
        check_url(url)
        check_introduction(introduction)
        check_paper_years(paper_years)
        check_papers(papers)
        // 检查合法，是否允许提交山林寺认证更新
        if (email_error_text.length == 0 && phone_number_error_text.length == 0 && url_error_text.length == 0 && introduction_error_text.length == 0 && paper_years_error_texts.reduce((sum, current) => sum + current.length, 0) == 0 && papers_error_texts.reduce((sum, current) => sum + current.reduce((sum, current) => sum + current.length, 0), 0) == 0) {
            set_update_submitted(true);
            const result = await api_submit_sls_member_profile_update(email, phone_number, url, introduction, paper_years, papers);
            if (result.status == API_STATUS.SUCCESS) {
                set_update_success(true);
                set_update_submitted(false);
                set_is_editing(false)
            } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                set_update_success(false);
                set_update_submitted(false);
                navigate(`/error`, {replace: false, state: {error: result.reasons}})
            } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                set_update_success(false);
                set_update_submitted(false);
                navigate(`/error`, {replace: false, state: {error: null}})
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
            <Paper elevation={12} sx={{width: '100%', borderRadius: '20px'}} color={"p"}>
                <Box sx={{height: '40px', width: '100%'}}/>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                        山林寺认证信息
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                    <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                        SLS Member Profile
                    </Typography>
                </Box>
                <Box sx={{height: '20px', width: '100%'}}/>
                {sls_member_profile.name.length > 0 ?
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                        <Stack display="flex" justifyContent="center" alignItems="center" spacing={5}
                               sx={{width: '100%'}}>
                            <Grid container spacing={0} sx={{width: "80%"}} display="flex" justifyContent="center"
                                  alignItems="center">
                                <Grid xs={4}>
                                    <Stack display="flex" justifyContent="center" alignItems="center" spacing={0}
                                           sx={{paddingRight: '20%'}}>
                                        <img
                                            src={sls_member_profile.image + "?counter=" + Math.random()}
                                            alt={sls_member_profile.name}
                                            style={{paddingTop: '3%', paddingBottom: '3%'}}
                                            width="100%"
                                            loading="lazy"
                                        />
                                        <Button variant="outlined"
                                                sx={{fontSize: 'subtitle1.fontSize', height: '30px'}}>
                                            更换照片
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
                                                accept='image/png'
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    handleImageFile(event.target.files);
                                                }}
                                            />
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid xs={8}>
                                    <Stack display="flex" justifyContent="center" alignItems="center" spacing={5}
                                           sx={{width: '100%'}}>
                                        <Stack display="flex" justifyContent="center" alignItems="start" direction="row"
                                               spacing={0}
                                               sx={{width: '100%'}}>
                                            <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>}
                                                   sx={{width: '33.3%'}}>
                                                <Box display="flex" justifyContent="center" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Typography color="text.secondary"
                                                                sx={{fontSize: 'subtitle1.fontSize'}}>
                                                        姓名
                                                    </Typography>
                                                </Box>
                                                <Box display="flex" justifyContent="center" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Typography
                                                        sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                                        {sls_member_profile.name}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                            <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>}
                                                   sx={{width: '33.3%'}}>
                                                <Box display="flex" justifyContent="center" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Typography color="text.secondary"
                                                                sx={{fontSize: 'subtitle1.fontSize'}}>
                                                        学号
                                                    </Typography>
                                                </Box>
                                                <Box display="flex" justifyContent="center" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Typography
                                                        sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                                        {sls_member_profile.student_id}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                            <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>}
                                                   sx={{width: '33.3%'}}>
                                                <Box display="flex" justifyContent="center" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Typography color="text.secondary"
                                                                sx={{fontSize: 'subtitle1.fontSize'}}>
                                                        简介
                                                    </Typography>
                                                </Box>
                                                <Box display="flex" justifyContent="center" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Typography
                                                        sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                                        {sls_member_profile.description}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                        <Stack display="flex" justifyContent="center" alignItems="start" direction="row"
                                               spacing={0}
                                               sx={{width: '100%'}}>
                                            <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>}
                                                   sx={{width: '33.3%'}}>
                                                <Box display="flex" justifyContent="center" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Typography color="text.secondary"
                                                                sx={{fontSize: 'subtitle1.fontSize'}}>
                                                        电子邮件
                                                    </Typography>
                                                </Box>
                                                {is_editing ?
                                                    <Box display="flex" justifyContent="center" alignItems="center"
                                                         sx={{width: '100%'}}>
                                                        <TextField
                                                            id="outlined-multiline-flexible"
                                                            value={email}
                                                            multiline
                                                            minRows={1}
                                                            maxRows={1}
                                                            sx={{width: "90%"}}
                                                            size="small"
                                                            color="primary"
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                set_email(event.target.value);
                                                                check_email(event.target.value);
                                                            }}
                                                            error={email_error_text.length != 0}
                                                            helperText={email_error_text}
                                                        />
                                                    </Box>
                                                    :
                                                    <Box display="flex" justifyContent="center" alignItems="center"
                                                         sx={{width: '100%'}}>
                                                        <Typography
                                                            sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                                            {sls_member_profile.email}
                                                        </Typography>
                                                    </Box>
                                                }
                                            </Stack>
                                            <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>}
                                                   sx={{width: '33.3%'}}>
                                                <Box display="flex" justifyContent="center" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Typography color="text.secondary"
                                                                sx={{fontSize: 'subtitle1.fontSize'}}>
                                                        电话号码
                                                    </Typography>
                                                </Box>
                                                {is_editing ?
                                                    <Box display="flex" justifyContent="center" alignItems="center"
                                                         sx={{width: '100%'}}>
                                                        <TextField
                                                            id="outlined-multiline-flexible"
                                                            value={phone_number}
                                                            multiline
                                                            minRows={1}
                                                            maxRows={1}
                                                            sx={{width: "90%"}}
                                                            size="small"
                                                            color="primary"
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                set_phone_number(event.target.value);
                                                                check_phone_number(event.target.value);
                                                            }}
                                                            error={phone_number_error_text.length != 0}
                                                            helperText={phone_number_error_text}
                                                        />
                                                    </Box>
                                                    :
                                                    <Box display="flex" justifyContent="center" alignItems="center"
                                                         sx={{width: '100%'}}>
                                                        <Typography
                                                            sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                                            {sls_member_profile.phone_number}
                                                        </Typography>
                                                    </Box>
                                                }
                                            </Stack>
                                            <Stack spacing={1} divider={<Divider orientation="horizontal" flexItem/>}
                                                   sx={{width: '33.3%'}}>
                                                <Box display="flex" justifyContent="center" alignItems="center"
                                                     sx={{width: '100%'}}>
                                                    <Typography color="text.secondary"
                                                                sx={{fontSize: 'subtitle1.fontSize'}}>
                                                        个人主页
                                                    </Typography>
                                                </Box>
                                                {is_editing ?
                                                    <Box display="flex" justifyContent="center" alignItems="center"
                                                         sx={{width: '100%'}}>
                                                        <TextField
                                                            id="outlined-multiline-flexible"
                                                            value={url}
                                                            multiline
                                                            minRows={1}
                                                            maxRows={1}
                                                            sx={{width: "90%"}}
                                                            size="small"
                                                            color="primary"
                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                set_url(event.target.value);
                                                                check_url(event.target.value);
                                                            }}
                                                            error={url_error_text.length != 0}
                                                            helperText={url_error_text}
                                                        />
                                                    </Box>
                                                    :
                                                    <Box display="flex" justifyContent="center" alignItems="center"
                                                         sx={{width: '100%'}}>
                                                        <Typography
                                                            sx={{fontWeight: 'bold', fontSize: 'subtitle1.fontSize'}}>
                                                            {sls_member_profile.url}
                                                        </Typography>
                                                    </Box>
                                                }
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Stack display="flex" justifyContent="center" alignItems="start" direction="row" spacing={0}
                                   sx={{width: '80%'}}>
                                <Stack display="flex" justifyContent="center" alignItems="center" spacing={1}
                                       divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '100%'}}>
                                    <Box display="flex" justifyContent="center" alignItems="center"
                                         sx={{width: '100%'}}>
                                        <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                            个人介绍
                                        </Typography>
                                    </Box>
                                    {is_editing ?
                                        <Box display="flex" justifyContent="center" alignItems="center"
                                             sx={{width: '100%'}}>
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                value={introduction}
                                                multiline
                                                minRows={1}
                                                maxRows={5}
                                                sx={{width: "90%"}}
                                                size="small"
                                                color="primary"
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    set_introduction(event.target.value);
                                                    check_introduction(event.target.value);
                                                }}
                                                error={introduction_error_text.length != 0}
                                                helperText={introduction_error_text}
                                            />
                                        </Box>
                                        :
                                        <Box display="flex" justifyContent="start" alignItems="center"
                                             sx={{width: '90%'}}>
                                            <Typography color="text.secondary"
                                                        sx={{fontSize: 'subtitle1.fontSize'}}>
                                                {sls_member_profile.introduction}
                                            </Typography>
                                        </Box>
                                    }
                                </Stack>
                            </Stack>
                            <Stack display="flex" justifyContent="center" alignItems="start" direction="row" spacing={0}
                                   sx={{width: '80%'}}>
                                <Stack display="flex" justifyContent="center" alignItems="center" spacing={1}
                                       divider={<Divider orientation="horizontal" flexItem/>} sx={{width: '100%'}}>
                                    <Box display="flex" justifyContent="center" alignItems="center"
                                         sx={{width: '100%'}}>
                                        <Typography color="text.secondary" sx={{fontSize: 'subtitle1.fontSize'}}>
                                            论文
                                        </Typography>
                                    </Box>
                                    {is_editing ?
                                        <Stack spacing={1} sx={{width: '100%'}}>
                                            {paper_years.map((val_of_paper_years, idx_of_paper_years) => {
                                                return (
                                                    <Stack display="flex" justifyContent="center" alignItems="center"
                                                           spacing={1} sx={{width: '100%'}}>
                                                        <Box display="flex" justifyContent="start" alignItems="center"
                                                             sx={{width: '100%'}}>
                                                            <TextField
                                                                id="outlined-multiline-flexible"
                                                                value={val_of_paper_years}
                                                                multiline
                                                                minRows={1}
                                                                maxRows={5}
                                                                sx={{width: "20%"}}
                                                                size="small"
                                                                color="primary"
                                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                    set_paper_years(paper_years.map((val_of_paper_years_looking_for, idx_of_paper_years_looking_for) => {
                                                                        if (idx_of_paper_years_looking_for == idx_of_paper_years) {
                                                                            return event.target.value;
                                                                        } else {
                                                                            return val_of_paper_years_looking_for;
                                                                        }
                                                                    }));
                                                                    check_paper_years(paper_years.map((val_of_paper_years_looking_for, idx_of_paper_years_looking_for) => {
                                                                        if (idx_of_paper_years_looking_for == idx_of_paper_years) {
                                                                            return event.target.value;
                                                                        } else {
                                                                            return val_of_paper_years_looking_for;
                                                                        }
                                                                    }));
                                                                }}
                                                                error={paper_years_error_texts[idx_of_paper_years].length != 0}
                                                                helperText={paper_years_error_texts[idx_of_paper_years]}
                                                            />
                                                            <Box sx={{width: '10px'}}/>
                                                            <IconButton color="error"
                                                                        onClick={() => handle_year_removing(idx_of_paper_years)}>
                                                                <RemoveCircleOutlineIcon/>
                                                            </IconButton>
                                                        </Box>
                                                        {papers[idx_of_paper_years].map((val_of_papers, idx_of_papers) => {
                                                            return (
                                                                <Box display="flex" justifyContent="center"
                                                                     alignItems="center" sx={{width: '100%'}}>
                                                                    <TextField
                                                                        id="outlined-multiline-flexible"
                                                                        value={val_of_papers}
                                                                        multiline
                                                                        minRows={1}
                                                                        maxRows={2}
                                                                        sx={{width: "80%"}}
                                                                        size="small"
                                                                        color="primary"
                                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                            set_papers(papers.map((val_of_papers_of_specific_year, idx_of_papers_of_specific_year) => {
                                                                                return val_of_papers_of_specific_year.map((val_of_papers_looking_for, idx_of_papers_looking_for) => {
                                                                                    if (idx_of_papers_of_specific_year == idx_of_paper_years && idx_of_papers == idx_of_papers_looking_for) {
                                                                                        return event.target.value;
                                                                                    } else {
                                                                                        return val_of_papers_looking_for;
                                                                                    }
                                                                                })
                                                                            }));
                                                                            check_papers(papers.map((val_of_papers_of_specific_year, idx_of_papers_of_specific_year) => {
                                                                                return val_of_papers_of_specific_year.map((val_of_papers_looking_for, idx_of_papers_looking_for) => {
                                                                                    if (idx_of_papers_of_specific_year == idx_of_paper_years && idx_of_papers == idx_of_papers_looking_for) {
                                                                                        return event.target.value;
                                                                                    } else {
                                                                                        return val_of_papers_looking_for;
                                                                                    }
                                                                                })
                                                                            }));
                                                                        }}
                                                                        error={papers_error_texts[idx_of_paper_years][idx_of_papers].length != 0}
                                                                        helperText={papers_error_texts[idx_of_paper_years][idx_of_papers]}
                                                                    />
                                                                    <Box sx={{width: '10px'}}/>
                                                                    <IconButton color="error"
                                                                                onClick={() => handle_paper_removing(idx_of_paper_years, idx_of_papers)}>
                                                                        <RemoveCircleOutlineIcon/>
                                                                    </IconButton>
                                                                </Box>
                                                            )
                                                        })}
                                                        <Box display="flex" justifyContent="start" alignItems="center"
                                                             sx={{width: '90%'}}>
                                                            <IconButton color="primary"
                                                                        onClick={() => handle_paper_adding(idx_of_paper_years)}>
                                                                <AddCircleOutlineIcon/>
                                                            </IconButton>
                                                        </Box>
                                                    </Stack>
                                                )
                                            })}
                                            <Box display="flex" justifyContent="start" alignItems="center"
                                                 sx={{width: '100%'}}>
                                                <IconButton color="primary" onClick={() => handle_year_adding()}>
                                                    <AddCircleOutlineIcon/>
                                                </IconButton>
                                            </Box>
                                        </Stack>
                                        :
                                        sls_member_profile.paper_years.length > 0 ?
                                            <Stack spacing={0} sx={{width: '100%'}}>
                                                {sls_member_profile.paper_years.map((val, idx) => {
                                                    return (
                                                        <Stack display="flex" justifyContent="center"
                                                               alignItems="center"
                                                               spacing={0} sx={{width: '100%'}}>
                                                            <Box display="flex" justifyContent="start"
                                                                 alignItems="center"
                                                                 sx={{width: '100%'}}>
                                                                <Typography color="text.secondary" sx={{
                                                                    fontWeight: 'bold',
                                                                    fontSize: 'subtitle1.fontSize'
                                                                }}>
                                                                    {val + "："}
                                                                </Typography>
                                                            </Box>
                                                            {sls_member_profile.papers[idx].map((val, idx) => {
                                                                return (
                                                                    <Box display="flex" justifyContent="start"
                                                                         alignItems="center" sx={{width: '90%'}}>
                                                                        <Typography color="text.secondary"
                                                                                    sx={{fontSize: 'subtitle1.fontSize'}}>
                                                                            {"[" + (idx + 1) + "]" + " " + val}
                                                                        </Typography>
                                                                    </Box>
                                                                )
                                                            })}
                                                        </Stack>
                                                    )
                                                })}
                                            </Stack>
                                            :
                                            <Box display="flex" justifyContent="start" alignItems="center"
                                                 sx={{width: '90%'}}>
                                                <Typography color="text.secondary"
                                                            sx={{fontSize: 'subtitle1.fontSize'}}>
                                                    小僧正在努力中~
                                                </Typography>
                                            </Box>
                                    }
                                </Stack>
                            </Stack>
                            {is_editing ?
                                <Grid container spacing={0} sx={{width: "80%"}}>
                                    <Grid xs={9.8}>
                                        <Button fullWidth variant="outlined" color="primary" onClick={() => {
                                            handle_submit_sls_member_profile_update()
                                        }}
                                                sx={{fontSize: 'subtitle1.fontSize', height: '30px', letterSpacing: 3}}>
                                            保存
                                        </Button>
                                    </Grid>
                                    <Grid xs={0.2}/>
                                    <Grid xs={2}>
                                        <Button fullWidth variant="outlined" color="error" onClick={() => {
                                            set_is_editing(false)
                                        }}
                                                sx={{fontSize: 'subtitle1.fontSize', height: '30px', letterSpacing: 3}}>
                                            取消
                                        </Button>
                                    </Grid>
                                </Grid>
                                :
                                <Button onClick={() => {
                                    set_is_editing(true)
                                }} fullWidth variant="outlined"
                                        sx={{
                                            fontSize: 'subtitle1.fontSize',
                                            height: '30px',
                                            width: "80%",
                                            letterSpacing: 3
                                        }}>
                                    编辑
                                </Button>
                            }
                        </Stack>
                    </Box>
                    :
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                        <CircularProgress color="primary"/>
                    </Box>
                }
                <Box sx={{height: '40px', width: '100%'}}/>
            </Paper>
        </div>
    )
}

function UserPosts(p: { student_id: string }) {
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

    useEffect(() => {
        api_get_posts_with_student_id(MAX_PIECES, 1, p.student_id).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_num_posts(Math.ceil(result.data.length / USER_POST_PIECES));
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
                <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    发布的帖子
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    Posts Submitted
                </Typography>
            </Box>
            <Box sx={{height: '20px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Stack spacing={2} sx={{width: '80%'}}>
                    {posts.length > 0 ? posts[0].post_id.length > 0 ?
                            posts.slice((page - 1) * USER_POST_PIECES, page * USER_POST_PIECES).map((post) => {
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

function UserFavoritePosts(p: { student_id: string }) {
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

    useEffect(() => {
        api_get_favorite_posts_with_student_id(MAX_PIECES, 1, p.student_id).then((result) => {
            if (result.status == API_STATUS.SUCCESS) {
                set_num_posts(Math.ceil(result.data.length / USER_POST_PIECES));
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
                <Typography textAlign="center" sx={{fontWeight: 'bold', fontSize: 'h5.fontSize', letterSpacing: 6}}>
                    收藏的帖子
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Typography textAlign="center" sx={{fontSize: 'subtitle1.fontSize'}}>
                    Favorite Posts
                </Typography>
            </Box>
            <Box sx={{height: '20px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Stack spacing={2} sx={{width: '80%'}}>
                    {posts.length > 0 ? posts[0].post_id.length > 0 ?
                            posts.slice((page - 1) * USER_POST_PIECES, page * USER_POST_PIECES).map((post) => {
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

function UserContent(p: { cookies: { token?: any }, setCookies: (name: "token", value: any, options?: (CookieSetOptions | undefined)) => void, student_id: string | undefined }) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!p.student_id) {
            navigate(`/error`, {replace: false, state: {error: "该用户不存在"}})
        }
    }, [])

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

    return (
        <Box sx={{
            width: '100%',
            background: 'linear-gradient(to right, #ADB5BB, #ADB5BB, #ACB4BA, #ABB3B9, #AAB0B7)',
            borderRadius: '20px',
            minHeight: 'calc(100vh - 92px)'
        }}>
            <Box sx={{
                width: '100%',
                backgroundImage: String('url(' + 'http://' + SERVER_URL + ':' + SERVER_PORT + '/images/others/home_sls_1.webp' + ')'),
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
                borderRadius: '20px',
                minHeight: 'calc(100vh - 92px)'
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
                        {user_profile.sls_verification && user_profile.student_id == p.student_id && <Box sx={{height: '10px', width: '100%'}}/>}
                        {user_profile.sls_verification && user_profile.student_id == p.student_id &&
                            <SlsMemberProfile cookies={p.cookies} setCookies={p.setCookies}/>}
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
