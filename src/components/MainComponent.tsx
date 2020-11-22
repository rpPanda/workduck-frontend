import React from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./HomeComponent";
import SignIn from "./SignInCompnent";
import SignUp from "./SignUpComponent";
import MenuAppBar from "./HeaderComponent";
import Profile from "./ProfileComponent";
import {makeStyles} from "@material-ui/core/styles";
import Result from "./ActionResult";
import {WebsocketTest} from "./WebsocketTest";
import {Websocket2} from "./Websocket2";
import {Farmer} from "../farmer1";

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    root: {
        display: 'flex',
    },
}))


export default function Main() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MenuAppBar/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Switch>
                    <Route path="/signin">
                        <SignIn/>
                    </Route>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                    <Route path="/result">
                        <Result/>
                    </Route>
                    <Route path="/test">
                        <Websocket2/>
                    </Route>
                    <Route path="/">
                        <WebsocketTest farmerInit={Farmer()}/>
                    </Route>
                </Switch>
            </main>
        </div>
    )
}
