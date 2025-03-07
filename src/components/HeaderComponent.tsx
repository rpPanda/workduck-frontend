import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import {useAppContext} from "../libs/contextLib";
import {AccountCircleOutlined} from "@material-ui/icons";
import {Menu, MenuItem} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Auth} from 'aws-amplify'
import Loading from "./LoadingComponent";
import MainListItems from "./DrawerListComponent";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
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
        overflowX: "hidden",
        position: 'relative',
        whiteSpace: 'nowrap',
        height: "100vh",
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
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));


export default function MenuAppBar() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const {isAuth, setIsAuth} = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClick = () => {
        history.push("/profile");
        handleClose()
    }
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await Auth.signOut();
            setIsAuth(false);
            history.push("/signin");
        } catch (e) {
            alert(e.message)
        } finally {
            setIsLoading(false)
            handleClose()
        }
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignIn = () => {
        history.push("/signin");
        handleClose()
    };
    const handleSignUp = () => {
        history.push("/signup");
        handleClose()
    };

    return (
        <div>
            <CssBaseline/>
            <Loading isLoading={isLoading}/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    {isAuth && <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>}
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <IconButton onClick={handleClick} color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <AccountCircleOutlined fontSize={"large"}/>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: -50,
                    horizontal: 'center'
                }}
            >
                {isAuth && [<MenuItem onClick={handleProfileClick}>Profile</MenuItem>,
                    <MenuItem onClick={handleProfileClick}>My account</MenuItem>,
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>]}
                {!isAuth && [<MenuItem onClick={handleSignIn}>Log In</MenuItem>,
                    <MenuItem onClick={handleSignUp}>Sign Up</MenuItem>]
                }
            </Menu>
            {isAuth && <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <Divider/>
                <List><MainListItems/></List>
                <Divider/>
            </Drawer>}
        </div>
    );
}
