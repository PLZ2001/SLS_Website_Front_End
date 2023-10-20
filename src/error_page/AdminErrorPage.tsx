import React, {useEffect, useState} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';

import TopBar from '../home_page/TopBar';
import BottomBar from "../home_page/BottomBar";
import ErrorBoard from "./ErrorBoard";
import {THEME} from "../config";
import * as Cookie from "react-cookie";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";


function AdminErrorPage() {
    const [cookies, setCookies] = Cookie.useCookies(["token"])
    const {state: {error}} = useLocation()

    const navigate = useNavigate()

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
                <Typography>{error?error:"抱歉，出了些问题"}</Typography>
            </Box>
        </Box>
    );
}

export default AdminErrorPage;
