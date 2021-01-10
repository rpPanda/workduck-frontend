import React, {useState} from "react";
import {Button, Paper, TextField} from "@material-ui/core";
import xmlText from "./hierarchy"
// @ts-ignore
import XMLParser from "react-xml-parser"

// const ENDPOINT = "http://localhost:4000";
// const socket = socketIOClient(ENDPOINT);

export function Websocket2() {
    const xml = new XMLParser().parseFromString(xmlText)
    // console.log(xml)
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [list, setList] = useState<any[]>([])

    function matchBoundingBox(arr: Array<any>, result: Array<any>): Array<any> {
        for (let i = 0; i < arr.length; i++) {
            const bound = arr[i].attributes.bounds.split('[').join('').split(']').map((val: string) => {
                return val.split(",").map((v: string) => parseInt(v))
            })
            // console.log(bound[0][0],bound[0][1],bound[1][0],bound[1][1])
            // console.log(x,y)
            if (bound[0][0] < x && bound[1][0] > x && bound[0][1] < y && bound[1][1] > y) {
                // setList([...list,arr[i].attributes])
                result.push(arr[i].attributes)
                console.log(arr[i].attributes)
                return matchBoundingBox(arr[i].children, result)
            }
        }
        return result;
    }

    function findClick() {
        console.log("here")
        const parent = xml.children
        setList(matchBoundingBox(parent, []))
    }

    function onChangeX(event: any) {
        setX(event.target.value)
    }

    function onChangeY(event: any) {
        setY(event.target.value)
    }

    function showList(item: any) {
        return (
            <div>
                <Paper>
                    <p>{item["resource-id"]}</p>
                    <p>{item["class"]}</p>
                </Paper>
            </div>
        )
    }

    return (
        <div>
            <TextField type={"number"} label={"X"} value={x} onChange={onChangeX}/><br/>
            <TextField type={"number"} label={"Y"} value={y} onChange={onChangeY}/><br/>
            {list.map((item: any) => {
                return showList(item)
            })}
            <Button onClick={findClick}>Click</Button>
        </div>
    )
}
