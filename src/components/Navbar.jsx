import "./Navbar.css"
export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="navbar--icon">#</div>
        <br />
        <div className="navbar--link-separator"></div>
        <div className="navbar--link-container">
            <a href="/">Home</a>
        </div>
        <div className="navbar--link-separator"></div>
        <div className="navbar--link-container">
            <a href="/classic">Play Classic</a>
        </div>
        <div className="navbar--link-separator"></div>
        {/* <div className="navbar--link-container">
            <a href="/super">Play Super</a>
        </div> */}
    </nav>
  )
}
