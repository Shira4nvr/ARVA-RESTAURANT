import { useState } from "react";
import axios from "axios";
import "./ChatbotWidget.css";

export default function ChatbotWidget() {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");

	const sendMessage = async () => {
		const trimmed = input.trim();
		if (!trimmed) return;

		const userMessage = { sender: "user", text: trimmed };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");

		try {
			const res = await axios.post("/api/chat/recommend", { message: trimmed });
			const reply = res?.data?.reply ?? res?.data?.recommendation ?? res?.data?.response ?? "";
			setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
		} catch (err) {
			setMessages((prev) => [...prev, { sender: "bot", text: "Error. Intenta de nuevo." }]);
		}
	};

	return (
		<div className={`chatbot-widget ${open ? "open" : ""}`}>
			<button className="chatbot-toggle" onClick={() => setOpen(!open)} type="button">
				💬
			</button>
			{open && (
				<div className="chatbot-panel">
					<div className="chatbot-messages">
						{messages.map((m, i) => (
							<div key={i} className={m.sender}>
								{m.text}
							</div>
						))}
					</div>
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && sendMessage()}
						placeholder="Escribe tu consulta..."
					/>
					<button onClick={sendMessage} type="button">
						Enviar
					</button>
				</div>
			)}
		</div>
	);
}
