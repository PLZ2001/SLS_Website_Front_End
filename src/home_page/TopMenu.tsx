import React from 'react';
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

function TopMenu() {
    return (
        <Stack display="flex" justifyContent="center" direction="row"
               divider={<Divider orientation="vertical" flexItem/>} spacing={2} sx={{height: '30px'}}>
            <Link href={'/'} underline="hover">
                <Button color='secondary'
                        sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3, height: "30px"}}>首页</Button>
            </Link>
            <Link href={'/annual'} underline="hover">
                <Button color='secondary'
                        sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3, height: "30px"}}>山林寺课题组</Button>
            </Link>
            <Link href={'/forum'} underline="hover">
                <Button color='secondary'
                        sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3, height: "30px"}}>山林寺论坛</Button>
            </Link>
            <Link href={'/contact'} underline="hover">
                <Button color='secondary'
                        sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3, height: "30px"}}>联系我们</Button>
            </Link>
        </Stack>
    )
}

export default TopMenu;
