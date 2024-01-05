import React, { useState, useEffect } from "react";
import useLocalStorage from "./helpers/useLocalStorage";
import { BrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import JoblyApi from "./JoblyApi"
import './App.css';
import UserContext from "./UserContext";
import NavBar from "./NavBar";
import RoutesList from "./RoutesList";

const TOKEN_NAME = "jobly_token";

function App() {

    const [token, setToken] = useLocalStorage(TOKEN_NAME);
    const [currentUser, setCurrentUser] = useState({ userInfo: null, infoLoaded: false });
    const [applicationIds, setApplicationIds] = useState(new Set([]));

    useEffect(
        function loadUserInfo() {
            console.debug("App useEffect loadUserInfo", "token: ", token);

            async function getCurrentUser() {
                if (token) {
                    try {
                        const { username } = jwtDecode(token);
                        
                        // put the token on the Api class so it can use it to call the API.
                        JoblyApi.token = token;
                        const currentUser = await JoblyApi.getCurrentUser(username);
                        console.debug("currentUser: ", currentUser);
                        setCurrentUser({
                            infoLoaded: true,
                            userInfo: currentUser
                        });
                        setApplicationIds(new Set(currentUser.applications));
                    } catch (err) {
                        console.error("App loadUserInfo: problem loading", err);
                        setCurrentUser({
                            infoLoaded: true,
                            userInfo: null
                        });
                    }
                } else {
                    setCurrentUser({
                        infoLoaded: true,
                        userInfo: null
                    });
                }
            }
            getCurrentUser();
        },
        [token]
    );

    /** Handles login */
    async function login(loginData) {
        let token = await JoblyApi.login(loginData);
        setToken(token);
    }

    /** Handles signup */
    async function signup(loginData) {
        let token = await JoblyApi.signup(loginData);
        setToken(token);
    }

    /** Handles logout.*/
    function logout() {
        setCurrentUser({
            infoLoaded: true,
            userInfo: null
        });
        setToken(null);
    }

    /** JOB */

    /** Return true if the user applied for the job. */
    function hasAppliedToJob(id) {
        return applicationIds.has(id);
    }

    /** Handles logout.*/
    function applyToJob(id) {
        if (hasAppliedToJob(id)) return;
        JoblyApi.applyToJob(currentUser.userInfo.username, id);
        setApplicationIds(new Set([...applicationIds, id]));
    }


    if (!currentUser.infoLoaded) return (<div> Loading ... </div>);

    return (
        <UserContext.Provider
            value={{
                currentUser: currentUser.userInfo,
                setCurrentUser,
                hasAppliedToJob,
                applyToJob
            }}
        >
            <div className="App">
                <BrowserRouter>
                    <NavBar logout={logout} />
                    <RoutesList login={login} signup={signup} currentUser={currentUser.data} />
                </BrowserRouter>
            </div>
        </UserContext.Provider>
    );
}

export default App;
