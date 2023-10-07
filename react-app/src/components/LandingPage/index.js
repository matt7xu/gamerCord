import "./LandingPage.css"

function LandingPage() {

  const handleReserve = () => {
    alert("Feature coming soon");
  }

  return (
    <div className="landingpageDiv">
      <h1>IMAGINE A PLACE...</h1>
      <div>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</div>
      <button onClick={handleReserve}className="landingButton">
        <i className="fas fa-download" /> Download for Mac
      </button>
      <button onClick={handleReserve} className="landingButton">
        Open Gamercord in your browser
      </button>
    </div >
  )
}

export default LandingPage;
