import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4000";
const socket = socketIOClient(ENDPOINT);

export function Websocket2() {

    const fileChangedHandler = (event: any) => {

        const file = event.target.files[0]
        if(file){
            const reader = new FileReader();
            reader.onload = function (evt) {
                const msg = {
                    filename: undefined
                };
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                msg.file = evt.target.result;
                msg.filename = file.name;
                socket.emit('base64 file', msg);
            };
            reader.readAsDataURL(file);
        }
    }

    const sendMessage = () => {

        // const container = document.getElementById('container');
        // const canvas = document.createElement('canvas');
        // canvas.width = 1000;
        // canvas.height = 1000;
        // canvas.setAttribute(
        //     'style', 'margin: 20px auto; display: block; box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.5), 0 4px 20px 0 rgba(0, 0, 0, 0.5)'
        // );
        // // @ts-ignore
        // container.appendChild(canvas);
        //
        // const imgContent = new Image();
        // imgContent.onload = function () {
        //     // stretch the image to fit the canvas
        //     // @ts-ignore
        //     canvas.getContext('2d').drawImage(imgContent, 0, 0, 1000, 1000);
        // };

        // controlSocket.onclose = function () {
        //     state = 'disconnected';
        //     logCallback(state, '[Control] Connection is closed');
        //     clearInterval(checkStatusIntervalId);
        //     setTimeout(function () {
        //         initControlSocket(endpoint, logCallback, timeOut);
        //     }, timeOut); // try to reconnect in 1 seconds
        // };

        // controlSocket.onerror = function () {
        //     state = 'disconnected';
        //     logCallback(state, '[Control] Connection error');
        //     clearInterval(checkStatusIntervalId);
        // };
        socket.emit("change_username", {
            username: "Go boi"
        });
        console.log("Emitted")
    }

    // return (
    //     <p>
    //         It's <time dateTime={response}>{response}</time>
    //     </p>
    // );
    return (
        <div>
            <Button onClick={sendMessage}>I am a button</Button>
            {/*<Button onClick={init}>Init</Button>*/}
            <input type="file" onChange={fileChangedHandler}/>
            <div id="container">
                <p>Taken from wikpedia</p>
                {/*<img src="data:image/png;base64," alt="Red dot"/>*/}
            </div>
            {/*{data && <img className="imgupload" src={data.file} height="400" width="400"/>}*/}
        </div>
    )
}
