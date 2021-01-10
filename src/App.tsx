import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router, useHistory,
} from "react-router-dom";
import Main from "./components/MainComponent";
import {AppContext} from "./libs/contextLib";
import {Auth} from "aws-amplify";
import Loading from "./components/LoadingComponent";
import './App.css';

export default function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const history = useHistory();
    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        setIsloading(true);
        try {
            await Auth.currentSession();
            setIsAuth(true);
        } catch (e) {
            console.log(e)
            if (e !== 'No current user') {
                alert(e.message)
            }
        } finally {
            setIsloading(false)
        }
    }

    return (
        <div className="App">
            <AppContext.Provider value={{isAuth, setIsAuth}}>
                <Router>
                    <Main/>
                </Router>
                <Loading isLoading={isLoading}/>
            </AppContext.Provider>
        </div>
    );
}