import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useFormFields} from "../libs/hooksLib";
import {useHistory} from "react-router-dom";
import {useAppContext} from "../libs/contextLib";
import {confirmSignUp, signIn, signUp} from "../awsClient/profileClient";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignUp() {
    const classes = useStyles();
    const [fields, handleFieldChanges] = useFormFields({})
    const [registered, setRegistered] = useState(false)
    const history = useHistory();
    const {setIsAuth} = useAppContext();

    async function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault()
        if (!registered) {
            try {
                await signUp({email: fields.email, username: fields.email, password: fields.password})
                setRegistered(true);
            } catch (e) {
                alert(e.message)
            }
        } else {
            try {
                await confirmSignUp({username: fields.email, code: fields.code})
                await signIn({email:fields.email,password:fields.password})
                setIsAuth(true);
                history.push('/')
            } catch (e) {
                alert(e.message)
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleFieldChanges}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                disabled={registered}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleFieldChanges}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                disabled={registered}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleFieldChanges}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                disabled={registered}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleFieldChanges}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                disabled={registered}

                            />
                        </Grid>
                        {registered &&
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleFieldChanges}
                                variant="outlined"
                                required
                                fullWidth
                                name="code"
                                label="Code"
                                id="code"
                            />
                        </Grid>
                        }
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}