import {Amplify} from "aws-amplify";
import config from "./config";

export default function initializeAmplify() {
    Amplify.configure({
        Auth: {
            mandatorySignIn: true,
            region: config.cognito.REGION,
            userPoolId: config.cognito.USER_POOL_ID,
            identityPoolId: config.cognito.IDENTITY_POOL_ID,
            userPoolWebClientId: config.cognito.APP_CLIENT_ID
        },
        Storage: {
            region: config.s3.REGION,
            bucket: config.s3.BUCKET,
            identityPoolId: config.cognito.IDENTITY_POOL_ID
        },
        API: {
            endpoints: [
                {
                    name: "workduck",
                    endpoint: config.apiGateway.URL,
                    region: config.apiGateway.REGION
                },
            ]
        }
    });
}