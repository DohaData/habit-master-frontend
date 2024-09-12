import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignupPage.jsx";
// import LogoutPage from "./pages/LogoutPage/LogoutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
// import HabitsPage from "./pages/HabitsPage/HabitsPage";
// import HabitsTrackerPage from "./pages/HabitsTrackerPage/HabitsTrackerPage";
// import YourHabitsPage from "./pages/YourHabitsPage/YourHabitsPage";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/logout" element={<LogoutPage />} /> */}
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/habits" element={<HabitsPage />} />
        <Route path="/habits-tracker" element={<HabitsTrackerPage />} />
        <Route path="/your-habits" element={<YourHabitsPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
