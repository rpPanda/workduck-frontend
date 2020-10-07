import React from 'react';
import {Button, createStyles, Grid, Step, StepLabel, Stepper, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import UploadApk from "./UploadApkComponent";
import {updateUser} from "../awsClient/profileClient";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);


export default function Home() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = async () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        await updateUser({username:"Yolo bitch",email:"yes@yes.com"})
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    function getSteps() {
        return ['Upload your APK or APP file', 'Go through your app', 'View your Workflow on your dashboard'];
    }

    return (
        <div className={classes.root}>
            {activeStep == 0 && <UploadApk/>}
            {activeStep == 1 && <UploadApk/>}
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button variant="contained" color="primary">Go to DashBoard</Button>
                    </div>
                ) : (
                    <div>
                        {/*<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>*/}
                        <div>
                            <Grid style={{padding:20}} spacing={3}
                                container justify="space-between"
                                  alignItems="center">
                                <Grid item>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
