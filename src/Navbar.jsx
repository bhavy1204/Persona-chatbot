export default function Navbar({ onBotChange }) {
    const handleClick = async (botId) => {
        await fetch(`http://localhost:5000/reset/${botId}`, { method: "POST" });
        onBotChange(botId);
    };

    return (
        <div style={{ display: "flex", gap: "20px", padding: "10px", background: "#eee" }}>
            <div style={{ cursor: "pointer" }} onClick={() => handleClick("hitesh")}>Hitesh Choudhary</div>
            <div style={{ cursor: "pointer" }} onClick={() => handleClick("piyush")}>Piyush Garg</div>
        </div>
    );
}
