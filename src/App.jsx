import { Routes, Route,useParams, Navigate } from "react-router-dom";
import { users } from "./data/users";
import SpinWheel from "./components/wheel";
import Family from "./pages/Family";


function Home() {
  return (
    <div className="center">
       <div className="glass-card" style={{ padding: "40px" }}>
     <h1 className="main-title">
         🎓 Graduation Celebration
      </h1>
      <p>Welcome to something special</p>
      </div>
    </div>
  );
}

function Access() {
  const { code } = useParams();
  const user = users[code];

  if (!user) {
    return (
      <div className="center">
        <h1>❌ Invalid Link</h1>
      </div>
    );
  }

  return user.role === "friend" ? (
    <Navigate to={`/friend/${code}`} />
  ) : (
    <Navigate to={`/family/${code}`} />
  );
}

function Friend() {
  const { code } = useParams();
  const user = users[code];

  return (
    <div className="center">
      <div
        className="glass-card glow-friend"
        style={{ padding: "30px", maxWidth: "700px" }}
        >
        <h1>🎡 Welcome {user.name}</h1>
         <p>Spin the wheel to discover your friendship result</p>
         <SpinWheel user={user} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/access/:code" element={<Access />} />
      <Route path="/friend/:code" element={<Friend />} />
      <Route path="/family/:code" element={<Family />} />
    </Routes>
  );
}