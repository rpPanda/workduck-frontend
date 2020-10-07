import {API} from "aws-amplify";

export async function createRemoteSession():Promise<any>{
    return await API.post("workduck", "/session", {
        body: {
            "name": "frontent-session",
            "deviceArn": "arn:aws:devicefarm:us-west-2::device:E4438F5D016544A8BB8557C459084F9D",
            "projectArn": "arn:aws:devicefarm:us-west-2:418506370286:project:a77ad979-c2ab-4c06-a26e-d7a74ac06415"
        }
    })
}

export async function getRemoteSession(sessionId: string):Promise<any>{
    return await API.get("workduck", `/session/${sessionId}`, {})
}

export async function stopRemoteSession(sessionId: string):Promise<any>{
    return await API.get("workduck", `/session/${sessionId}/stop`, {})
}

export async function createProject(){
    return await API.post("workduck", "/project", {
        body:{
            "name" : "frontend-1"
        }
    })
}

export async function getProject(){
    return await API.get("workduck", "/project/arn:aws:devicefarm:us-west-2:418506370286:project:93333ea0-febb-4166-9cd1-468edd4b274b", {})
}
