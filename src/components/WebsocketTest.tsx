import React, {useEffect, useState} from "react";


export function WebsocketTest(props: any) {
    function handleClick() {
        const {farmerInit} = props
        farmerInit.mount({
            timeout: 10000,
            endpoint: 'XYZ',
            elementId: 'container1',
            dimensions: {x: 600, y: 1000},
            deviceResolution: {x: 1080, y: 2160},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            logCallback: function (state: any, message: any) {
            }
        })
    }
    return (
        <div id="terminal">
            <button onClick={handleClick}>Click</button>
            <div id="container1">
            </div>
        </div>
    )
}
