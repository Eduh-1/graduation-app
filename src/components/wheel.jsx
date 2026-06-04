import { Wheel } from "react-custom-roulette";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function SpinWheel({ user }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spun, setSpun] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Check if already spun
  useEffect(() => {
    if (localStorage.getItem(user.name)) {
      setSpun(true);
      setShowResult(true);
    }
  }, [user.name]);

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const data = user.wheelOptions.map((option) => ({
    option,
  }));

  const shareResult = () => {
    const text = `I just got "${user.result}" on Edwin's Graduation Wheel 🎓`;

    if (navigator.share) {
      navigator.share({
        title: "Graduation Wheel",
        text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("Result copied to clipboard!");
    }
  };

  const handleSpin = () => {
    if (spun || localStorage.getItem(user.name)) return;

    const correctIndex = data.findIndex(
      (item) => item.option === user.result
    );

    setPrizeNumber(correctIndex);
    setMustSpin(true);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={250}
        />
      )}

      <h1
        className="fade-in"
        style={{
          fontSize: "2.5rem",
          marginBottom: "10px",
        }}
      >
        🎓 Graduation Friendship Wheel
      </h1>

      <p
        className="fade-in"
        style={{
          opacity: 0.9,
          marginBottom: "25px",
        }}
      >
        Hello {user.name}! Spin the wheel and discover your friendship title.
      </p>

      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={[
          "#3b82f6",
          "#8b5cf6",
          "#2563eb",
          "#7c3aed",
        ]}
        textColors={["#ffffff"]}
        outerBorderColor="#ffffff"
        innerBorderColor="#ffffff"
        radiusLineColor="#ffffff"
        onStopSpinning={() => {
          setMustSpin(false);
          setSpun(true);

          localStorage.setItem(user.name, "spun");

          setTimeout(() => {
            setShowResult(true);
            setShowConfetti(true);
          }, 800);
        }}
      />

      {!spun ? (
        <button
          className="pop-in"
          onClick={handleSpin}
          style={{
            marginTop: "25px",
            padding: "15px 30px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "14px",
            border: "none",
            cursor: "pointer",
            color: "white",
            background:
              "linear-gradient(135deg, #6366f1, #3b82f6)",
            boxShadow:
              "0 10px 25px rgba(59,130,246,0.4)",
          }}
        >
          SPIN THE WHEEL 🎡
        </button>
      ) : (
        <p
          style={{
            marginTop: "15px",
            fontWeight: "bold",
          }}
        >
          🎉 Result finalized. No more tries.
        </p>
      )}

      {showResult && (
        <div
          className="fade-in pop-in"
          style={{
            marginTop: "25px",
            padding: "25px",
            borderRadius: "18px",
            maxWidth: "450px",
            marginLeft: "auto",
            marginRight: "auto",

            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              marginBottom: "10px",
            }}
          >
            {user.result}
          </h2>

          <p
            style={{
              lineHeight: "1.6",
            }}
          >
            {user.message}
          </p>

          <button
            onClick={shareResult}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: "#10b981",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Share Result 🔗
          </button>
        </div>
      )}
    </div>
  );
}