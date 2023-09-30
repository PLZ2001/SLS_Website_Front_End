import {createTheme} from "@mui/material/styles";
import * as CryptoJS from "crypto-js";

// 域名
const SERVER_URL = '127.0.0.1';
const SERVER_PORT = '4000';

// 主题
const THEME = createTheme({
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

function _hash(data: string) {
    return CryptoJS.SHA256(CryptoJS.enc.Hex.parse(data)).toString(CryptoJS.enc.Hex);
}

export {THEME, SERVER_URL, SERVER_PORT, _hash};
