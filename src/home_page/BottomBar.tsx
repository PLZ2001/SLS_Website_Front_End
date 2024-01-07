import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function BottomBar() {
    return (
        <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
            <Box sx={{height: '3px', width: '100%'}}/>
            <Grid container spacing={0}>
                <Grid xs={0.25}/>
                <Grid xs={9}>
                    <Stack display="flex" justifyContent="start" direction="row"
                           divider={<Divider orientation="vertical" flexItem/>} spacing={2} sx={{height: '40px'}}>
                        <Box display="flex" justifyContent="center" alignItems="center"
                             sx={{paddingTop: '5px', height: '30px'}}>
                            <Typography sx={{fontSize: 'subtitle1.fontSize'}}>
                                © 2023 电力能源互联及其智能化研究所-山林寺课题组 版权所有
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center"
                             sx={{paddingTop: '5px', height: '30px'}}>
                            <Link href="https://github.com/PLZ2001" underline="hover"
                                  sx={{fontSize: 'subtitle1.fontSize'}}>
                                技术支持：PLZ2001
                            </Link>
                        </Box>
                    </Stack>
                </Grid>
                <Grid xs={2.5} display="flex" justifyContent="end">
                    <Box sx={{paddingTop: '5px', height: '30px'}}>
                        <Link href={'/admin_login'} underline="hover">
                            <Button variant="outlined" sx={{fontSize: 'subtitle1.fontSize', height: '30px'}}>
                                管理员登录
                            </Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid xs={0.25}/>
            </Grid>
            <Box sx={{height: '3px', width: '100%'}}/>
        </Box>
    )
}

export default BottomBar;
