import axios from "axios";
import { BACKEND_URL } from "../config";

// Fetches the internal room ID using the URL slug
async function getRoomId(slug: string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.id;
}

// Fetches the chat message history for a specific room ID
async function getChats(roomId: string) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.messages;
}

export default async function ChatRoom({
    params
}: {
    params: {
        slug: string
    }
}) {
    // In Next.js 15, params must be awaited
    const slug = (await params).slug;
    const roomId = await getRoomId(slug);
    
    // Fetch messages using the retrieved roomId
    const messages = await getChats(roomId);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Room: {slug}</h1>
            <div style={{ marginTop: "20px" }}>
                {messages.map((msg: any, index: number) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        {msg.message}
                    </div>
                ))}
            </div>
        </div>
    );
}