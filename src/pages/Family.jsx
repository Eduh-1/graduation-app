import { useParams } from "react-router-dom";
import { useState } from "react";
import { users } from "../data/users";

function Family() {
  const { code } = useParams();

  const [showLetter, setShowLetter] = useState(false);
  const [showMemory, setShowMemory] = useState(false);

  const user = users[code];

  if (!user) {
    return (
      <div className="center">
        <h1>Invalid Link</h1>
      </div>
    );
  }

  return (
    <div className="center">
     <div
  className={`fade-in pop-in ${
    user.role === "parent"
      ? "glow-parent"
      : "glow-sibling"
  }`}
  style={{
    maxWidth: "700px",
    padding: "30px",
    borderRadius: "20px",

    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(14px)",

    boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
  }}
>
        <h1>🎓 Graduation Tribute</h1>

        <h2>Dear {user.name} ❤️</h2>

        <p style={{ lineHeight: "1.8", fontSize: "18px" }}>
          {user.message}
        </p>

        {user.role === "parent" && (
          <>
            {!showLetter ? (
              <button
                className="tribute-btn"
                onClick={() => setShowLetter(true)}
              >
                Open Graduation Letter 💌
              </button>
            ) : (
              <div className="letter-card">
                <p style={{ whiteSpace: "pre-line" }}>
                  {user.letter}
                </p>
              </div>
            )}
          </>
        )}

        {user.role === "sibling" && (
          <>
            {!showMemory ? (
              <button
                className="tribute-btn"
                onClick={() => setShowMemory(true)}
              >
                View Favorite Memory 📸
              </button>
            ) : (
              <div className="letter-card">
                <h3>{user.memoryTitle}</h3>
                <p>{user.memory}</p>
              </div>
            )}
          </>
        )}

        <hr style={{ margin: "25px 0", opacity: 0.3 }} />

        <p>With love and gratitude,</p>
        <h3>Edwin Ngugi 🎓</h3>
        <p>Class of 2026</p>

      </div>
    </div>
  );
}

export default Family;