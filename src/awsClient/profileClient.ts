import initializeAmplify from "./initialize-amplify";
import {Auth} from "aws-amplify";
import {SignInRequest, SignUpRequest} from "./models/profileModels";

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