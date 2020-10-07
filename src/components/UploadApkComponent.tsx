import React, {useState} from "react";
import {Button, Grid} from "@material-ui/core";
import {DropzoneDialog} from "material-ui-dropzone";
import {Farmer} from "../farmer";
import actions from '../test-2-action.json'
import {createRemoteSession, getRemoteSession} from "../awsClient/devicefarmClient";
import {sleep} from "../libs/helper";
export default function UploadApk(){
    const [open,setOpen] = useState(false);
    const farmerInit = Farmer()

    // const handleSave = (files: any) =>{
    //     setFiles(files)
    //     setOpen(false)
    // }
    const handleClose = () => {
        setOpen(false)
    }

    const handleClick = async () => {
        let resp = await createRemoteSession()
        const objectId = resp.objectId
        const deviceX = resp.device.resolution.width;
        const deviceY = resp.device.resolution.height;
        while(!resp.endpoint){
            resp = await getRemoteSession(objectId)
            console.log(resp)
            await sleep(10000)
            console.log(resp.endpoint)
        }
        if(resp.endpoint) {
            farmerInit.mount({
                timeout: 10000,
                endpoint: resp.endpoint,
                elementId: 'container',
                dimensions: {x: 600, y: 1024},
                deviceResolution: deviceX && deviceY ? {x: deviceX, y: deviceY} : undefined,
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                logCallback: function (state: any, message: any) {
                }
            })
        }
    }

    const handleActions = async () => {
        const resultTemp: any = [];
        let temp: any = []
        actions.map((action) => {
            temp.push(action)
            // console.log(temp)
            if (action.message === 'TouchUpMessage') {
                resultTemp.push(temp)
                temp = []
            }
        })
        console.log(resultTemp)
        for (let i = 0; i < resultTemp.length; i++){
            await sleep(3000)
            console.log(resultTemp[i])
            farmerInit.performActions(resultTemp[i])
        }
    }

    const handleScroll = async () => {
        farmerInit.scrollVertical()
    }

    const handleSave = async () => {
        farmerInit.saveToFile('test-1-action')
    }

    return (
        <div className="homeSubRoot">
            <DropzoneDialog
                fullWidth
                maxWidth={"md"}
                open={open}
                onSave={handleSave}
                acceptedFiles={['.app', '.apk']}
                filesLimit={1}
                maxFileSize={5000000}
                onClose={handleClose}
            />
            <Grid container spacing={2} justify={"center"}>
                <Grid item xs={12}>
                    <Button variant={"contained"} onClick={handleClick}>Upload APK</Button>
                </Grid>
                <Grid item xs={5} style={{textAlign: 'center'}}>
                    <div id="terminal">
                        <div id="container">
                        </div>
                    </div>
                </Grid>
                <Grid item container xs={12} style={{textAlign: 'center'}}>
                    <Grid item xs={3}>
                        <Button variant={"contained"} onClick={handleScroll}>Scroll</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant={"contained"} onClick={handleActions}>Perform</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant={"contained"} onClick={handleSave}>Save Action</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant={"contained"} color={"secondary"} onClick={handleSave}>Stop []</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
