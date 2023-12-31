import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import "./LandingPage.css"

function LandingPage() {

  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="landingpageDiv">
      <h1>IMAGINE A PLACE...</h1>
      <div className="landing_page_p1">...where you can belong to a school club, a gaming group, or a worldwide community. <br></br>Where just you and a handful of friends can spend time together. <br></br>A place that makes it easy to talk every day and hang out more often.</div>
      <div className="landing_page_p1">Let's       <OpenModalButton
          buttonText="Sign In"
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />
        to start the fun! <i className="fas fa-hand-peace fa-3x all_server_icon"></i> </div>
    </div >
  )
}

export default LandingPage;
