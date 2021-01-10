import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import {deepOrange} from "@material-ui/core/colors";
import {Avatar} from "@material-ui/core";
import InteractiveList from "./ProfileListComponent";
import {getUser} from "../awsClient/profileClient";
import {useHistory} from 'react-router-dom';
import {GetUserResponse} from "../awsClient/models/profileModels";
import Loading from "./LoadingComponent";

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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        width: "auto",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    square: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        fontSize: 48,
        width: "auto",
        height: "100%"
    },
    fixedHeight: {
        height: 240,
    },
}));


export default function Dashboard() {
    const [user, setUser] = useState<GetUserResponse | undefined>();
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const history = useHistory();
    useEffect(() => {
        onLoad();
    })

    async function onLoad() {
        try {
            const user = await getUser()
            setUser(user)
        } catch (e) {
            history.push("/")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Container className={classes.container}>
                <Grid style={{"width": "100%"}} container spacing={3}>
                    <Grid item xs={12} md={8} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <Avatar variant="square" className={classes.square}>
                                Panda Boss
                            </Avatar>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <InteractiveList userInfo={user}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper className={classes.paper}>
                        </Paper>
                    </Grid>
                </Grid>
                <Box pt={4}>
                    <Copyright/>
                </Box>
            </Container>
            <Loading isLoading={loading}/>
        </div>
    );
}
