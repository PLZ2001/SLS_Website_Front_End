import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Box from "@mui/material/Box";
import {API_STATUS} from "../config";
import {useNavigate} from "react-router-dom";
import {api_get_fsmap} from "../api/api";
import {
    ChonkyActions,
    ChonkyFileActionData,
    FileArray,
    FileBrowser,
    FileContextMenu,
    FileData,
    FileHelper,
    FileList,
    FileNavbar,
    FileToolbar,
    setChonkyDefaults,
} from 'chonky';
import {ChonkyIconFA} from 'chonky-icon-fontawesome';
import CircularProgress from "@mui/material/CircularProgress";


function FTP(p:{FsMap:{rootFolderId:string, fileMap: {}}, path:string}) {
    const navigate = useNavigate()

    // @ts-ignore
    setChonkyDefaults({ iconComponent: ChonkyIconFA });

    const rootFolderId = p.FsMap.rootFolderId;
    const fileMap = (p.FsMap.fileMap as unknown) as {
        [fileId: string]: FileData & { childrenIds: string[] };
    };

    const useFiles = (currentFolderId: string): FileArray => {
        return useMemo(() => {
            const currentFolder = fileMap[currentFolderId];
            const files = currentFolder.childrenIds
                ? currentFolder.childrenIds.map((fileId: string) => fileMap[fileId] ?? null)
                : [];
            return files;
        }, [currentFolderId]);
    };

    const useFolderChain = (currentFolderId: string): FileArray => {
        return useMemo(() => {
            const currentFolder = fileMap[currentFolderId];

            const folderChain = [currentFolder];

            let parentId = currentFolder.parentId;
            while (parentId) {
                const parentFile = fileMap[parentId];
                if (parentFile) {
                    folderChain.unshift(parentFile);
                    parentId = parentFile.parentId;
                } else {
                    parentId = null;
                }
            }

            return folderChain;
        }, [currentFolderId]);
    };

    const useFileActionHandler = (
        setCurrentFolderId: (folderId: string) => void
    ) => {
        return useCallback(
            (data: ChonkyFileActionData) => {
                if (data.id === ChonkyActions.OpenFiles.id) {
                    const { targetFile, files } = data.payload;
                    const fileToOpen = targetFile ?? files[0];
                    if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                        window.location.href=`/ftp/${(p.path+fileToOpen.name+'/').replaceAll("/", ">")}`
                        return;
                    }
                    data.payload.files.map((f) => window.open(f.thumbnailUrl, `${f.id}`));
                }
            },
            [setCurrentFolderId]
        );
    };

    const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);
    const files = useFiles(currentFolderId);
    const folderChain = useFolderChain(currentFolderId);
    const handleFileAction = useFileActionHandler(setCurrentFolderId);


    return (
        <FileBrowser
            instanceId="山林寺FTP"
            files={files}
            folderChain={folderChain}
            onFileAction={handleFileAction}
            thumbnailGenerator={(file: FileData) =>
                file.thumbnailUrl ? file.thumbnailUrl + "?counter=" + Math.random() : null
            }
        >
            <FileNavbar />
            <FileToolbar />
            <FileList />
            <FileContextMenu />
        </FileBrowser>
    )
}

function FTPContent(p:{path:string}) {
    const navigate = useNavigate()

    const [FsMap, set_FsMap] = useState({rootFolderId:"", fileMap: {"": {
                id: "",
                name: "",
                isDir: true,
                childrenIds: [],
                childrenCount: 0
            },}});

    useEffect(() => {
        if (p.path.length>0) {
            api_get_fsmap(p.path).then((result) => {
                if (result.status == API_STATUS.SUCCESS) {
                    set_FsMap(result.data);
                } else if (result.status == API_STATUS.FAILURE_WITH_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: result.reasons}})
                } else if (result.status == API_STATUS.FAILURE_WITHOUT_REASONS) {
                    navigate(`/error`, {replace: false, state: {error: null}})
                }
            });
        }
    }, [p.path]);

    return (
        <div style={{width:'100%', height:`100vh`}}>
            {FsMap.rootFolderId.length>0 && p.path.length>0?
                <FTP FsMap={FsMap} path={p.path}/>
                :
                <Box display="flex" justifyContent="center" alignItems="center" sx={{width: '100%', height:`100vh`}}>
                    <CircularProgress color="primary"/>
                </Box>
            }
        </div>
    )
}

export default FTPContent;
