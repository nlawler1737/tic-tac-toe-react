import "./Home.css";

export default function Home() {
    return (
        <div className="home">
            <div className="play-buttons">
                <a id="play-classic-button" className="play-button" href="/classic">
                    <div className="play-button--subtitle">Play</div>
                    <div className="play-button--title">Classic</div>
                </a>
                {/* <a id="play-super-button" className="play-button" href="/super">
                    <div className="play-button--subtitle">Play</div>
                    <div className="play-button--title">Super</div>
                </a> */}
            </div>
        </div>
    );
}
