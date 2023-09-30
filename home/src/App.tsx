import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import TopBar from './TopBar';
import ShowBoard from './ShowBoard';
import MainContent from "./MainContent";
import BottomBar from "./BottomBar";


function App() {
    // 主题
    const theme = createTheme({
        // 调色板
        palette: {
            // 主色调
            primary: {
                main: '#1463d8'
            },
            // 次色调
            secondary: {
                main: '#808080'
            },
        },
        // 字
        typography: {
            allVariants: {
                color: '#1463d8'
            },
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    // 取消按钮波浪效果
                    disableRipple: true,
                },
            },
            MuiButtonGroup: {
                defaultProps: {
                    // 取消按钮波浪效果
                    disableRipple: true,
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{width: '100%', backgroundColor: '#ffffff'}}>
                {/*顶部栏*/}
                <TopBar/>
                {/*展示栏*/}
                <ShowBoard/>
                {/*主体内容*/}
                <MainContent/>
                {/*底部栏*/}
                <BottomBar/>
            </Box>
        </ThemeProvider>
    );
}

export default App;
