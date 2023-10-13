import React from 'react';
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

function TopMenu() {
    return (
        <Stack display="flex" justifyContent="center" direction="row"
               divider={<Divider orientation="vertical" flexItem/>} spacing={2} sx={{height: '30px'}}>
            <Link to={`/`}>
                <Button color='secondary'
                        sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3, height: "30px"}}>首页</Button>
            </Link>
            <Button color='secondary' sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>课题组概况</Button>
            <Button color='secondary' sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>研究成果</Button>
            <Link to={`/forum`}>
                <Button color='secondary'
                        sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3, height: "30px"}}>山林寺论坛</Button>
            </Link>
            <Button color='secondary' sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>联系我们</Button>
        </Stack>
    )
}

export default TopMenu;
