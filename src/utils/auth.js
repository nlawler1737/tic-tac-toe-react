const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("userjwt")}`,
};

function putGameState(gameState, getUpdate) {
    console.log("putGameState")
    return fetch("http://localhost:5500/game-state",{
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
            gameState,
            getUpdate
        })
    }).then(data=>data.json()).then(json=>{
        console.log("put",json.data)
        return json.data
    }).catch(err=>{
        console.error(err)
    })
}

function joinQueue() {
    return fetch("http://localhost:5500/join-queue",{
        method: "POST",
        headers: headers,
    }).then(data=>data.json()).then(json=>{
        return json.data
    })
}

function authenticate(url, username, password, onErrFunc) {
    return fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            username,
            password,
        }),
    })
        .then((data) => data.json())
        .then((json) => {
            if (json.error) {
                onErrFunc(json.data.msg);
                return;
            }
            localStorage.setItem("userjwt", json.data.jwt);
            localStorage.setItem("username", username)
            window.location.href = "/";
        });
}
function register(username, password, onErrFunc) {
    authenticate("http://localhost:5500/register", username, password, onErrFunc)
}

function login(username, password, onErrFunc) {
    authenticate("http://localhost:5500/authenticate", username, password, onErrFunc)
}

function logout() {
    localStorage.removeItem("userjwt");
    localStorage.removeItem("username");
    window.location.href = "/";
}

export { register, login, logout, joinQueue, putGameState };
