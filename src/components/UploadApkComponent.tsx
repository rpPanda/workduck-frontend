import React, {useState} from "react";
import {Button} from "@material-ui/core";
import {DropzoneDialog} from "material-ui-dropzone";

export default function UploadApk(){
    const [files,setFiles] = useState<any>([])
    const [open,setOpen] = useState(false);

    const handleSave = (files: any) =>{
        setFiles(files)
        setOpen(false)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    return(
        <div className="homeSubRoot">
            <Button variant={"contained"} onClick={handleOpen}>Upload APK</Button>
            <DropzoneDialog
                fullWidth
                maxWidth={"md"}
                open={open}
                onSave={handleSave}
                acceptedFiles={['.app','.apk']}
                filesLimit={1}
                maxFileSize={5000000}
                onClose={handleClose}
            />
        </div>
    )
}