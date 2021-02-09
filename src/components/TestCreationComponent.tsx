import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import Loading from "./LoadingComponent";
import {useHistory} from "react-router-dom";

export function TestCreationComponent(props: any) {
    const history = useHistory();
    const [isLoading,setIsLoading] = useState(false)
    async function submitTest() {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setIsLoading(false)
        console.log("203f32ef-9fa2-40e7-b30a-42f05e0451c1")
        console.log("2cdb3a3e-6918-471d-8f8e-fac800f92a4b")
        props.setI(props.num+1)
        if(props.num % 2 === 0) history.push('/test/203f32ef-9fa2-40e7-b30a-42f05e0451c1')
        else history.push('/test/2cdb3a3e-6918-471d-8f8e-fac800f92a4b')

    }
    return (
        <div style={{padding: 20,margin: 20}}>
            <TextField
                id="outlined-multiline-static"
                fullWidth
                label="Enter Test Workflow"
                multiline
                rows={20}
                placeholder="Write your test in simple english"
                variant="outlined"
            />
            <Button variant={"contained"} color={"primary"} onClick={submitTest}  style={{margin: 20}}>Create Test</Button>
            <Loading isLoading={isLoading}/>
        </div>
    )
}
