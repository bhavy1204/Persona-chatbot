import { useState } from "react";
import Navbar from "./Navbar";
import ChatApp from "./ChatApp";

export default function App() {
    const [botId, setBotId] = useState("hitesh"); // default bot

    return (
        <div>
            <Navbar onBotChange={setBotId} />
            <ChatApp botId={botId} />
        </div>
    );
}
