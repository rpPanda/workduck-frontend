import initializeAmplify from "./initialize-amplify";
import {API, Auth} from "aws-amplify";
import {
    ConfirmSignUpRequest,
    GetUserResponse,
    SignInRequest,
    SignUpRequest,
    UpdateUserRequest
} from "./models/profileModels";

initializeAmplify()

export async function signIn(request: SignInRequest) {
    const user = await Auth.signIn(request.email, request.password);
    console.log(user)
}

export async function signUp(request: SignUpRequest) {
    await Auth.signUp({
        attributes: {
            email: request.email
        },
        username: request.username,
        password: request.password,
    });
}

export async function confirmSignUp(request: ConfirmSignUpRequest) {
    await Auth.confirmSignUp(request.username, request.code);
}

export async function updateUser(request:UpdateUserRequest){
    return await API.post("workduck", "/user", {
        body: request
    })
}

export async function getUser():Promise<GetUserResponse>{
    return await API.get("workduck", "/user", {})
}
