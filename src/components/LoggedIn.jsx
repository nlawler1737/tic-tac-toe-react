import { logout } from "../utils/auth";

export default function LoggedIn() {
    function handleLogoutButton() {
        logout()
    }
    return (
        <div className="login">
            <div className="login--modal">
                <div className="login--title">Already Logged In</div>
                <button onClick={handleLogoutButton} className="login--submit">
                    Logout
                </button>
            </div>
        </div>
    );
}
