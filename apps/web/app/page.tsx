"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f7f6",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        padding: "40px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "100%",
        maxWidth: "320px"
      }}>
        <h2 style={{ margin: "0 0 10px 0", textAlign: "center", color: "#333" }}>Join a Room</h2>
        
        <input 
          value={roomId} 
          onChange={(e) => setRoomId(e.target.value)} 
          type="text" 
          placeholder="Enter Room ID"
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            fontSize: "16px",
            outline: "none"
          }}
        />

        <button 
          onClick={() => router.push(`/room/${roomId}`)}
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#0070f3",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0051bb"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#0070f3"}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}