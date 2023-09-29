
import "./Navbar.css"
export default function Navbar() {
    const username = localStorage.getItem("username")
    // const history = useHistory()
    // const navToLink = (path) => {
    //     history.push(path)
    // }
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
        {/* <div className="navbar--link-separator"></div>
        <div className="navbar--link-container">
            <a href="/history">History</a>
        </div> */}
        <div className="navbar--link-separator"></div>
        <div className="navbar--link-container">
            { username ?
                <a href="/history">{username}</a> :
                <a href="/login">Login</a>
            }
        </div>
        <div className="navbar--link-separator"></div>
        {/* <div className="navbar--link-container">
            <a href="/super">Play Super</a>
        </div> */}
    </nav>
  )
}
