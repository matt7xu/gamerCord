import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Server from "./components/Server";
import LandingPage from "./components/LandingPage";
import Servers from "./components/Server";
import AllServers from "./components/Server/AllServers";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {sessionUser ? <Server /> : null}
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            {/* {sessionUser ? <Redirect to="/servers/@me" /> : <LandingPage />} */}
            {sessionUser ? null : <LandingPage />}
          </Route>
          <Route path="/servers/@me" >
            <Servers />
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
        </Switch>
      )}
    </>
  );
}

export default App;
