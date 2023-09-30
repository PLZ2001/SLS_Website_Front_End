import React from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

function ShowBoard() {
    return (
        <Box sx={{width: '100%', backgroundImage: 'url(image/others/home_sls_1.png)', backgroundSize: 'cover', borderTopLeftRadius:'20px', borderTopRightRadius:'20px'}}>
            <Box sx={{height: '10px', width: '100%'}}/>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <Stack display="flex" justifyContent="center" direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} sx={{height: '30px'}}>
                    <Button color='secondary' sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>首页</Button>
                    <Button color='secondary' sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>课题组概况</Button>
                    <Button color='secondary' sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>活动纪实</Button>
                    <Button color='secondary' sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>研究成果</Button>
                    <Button color='secondary' sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>资料分享</Button>
                    <Button color='secondary' sx={{fontSize: 'subtitle1.fontSize', letterSpacing: 3}}>联系我们</Button>
                </Stack>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%'}}>
                <img src="image/others/home_slslogo_1.png" alt="山林寺logo" loading="lazy" width="30%" style={{paddingTop: '5%', paddingBottom: '3%'}}/>
            </Box>
        </Box>
    )
}

export default ShowBoard;
