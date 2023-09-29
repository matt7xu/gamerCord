import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Servers from "./components/Server";
import LandingPage from "./components/LandingPage";
import AllServers from "./components/Server/AllServers";
import ServerDetail from "./components/Server/ServerDetail";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser?.id.toString()

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {sessionUser ? <Servers userId={userId} /> : null}
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            {/* {sessionUser ? <Redirect to="/servers/@me" /> : <LandingPage />} */}
            {sessionUser ? null : <LandingPage />}
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/guild-discovery">
            <AllServers />
          </Route>
          <Route path="/servers/:id">
            <ServerDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
