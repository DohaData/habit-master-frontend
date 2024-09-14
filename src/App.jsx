import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
// import LogoutPage from "./pages/LogoutPage/LogoutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
// import HabitsPage from "./pages/HabitsPage/HabitsPage";
// import HabitsTrackerPage from "./pages/HabitsTrackerPage/HabitsTrackerPage";
// import YourHabitsPage from "./pages/YourHabitsPage/YourHabitsPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer.jsx';

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
        <Route path="/what-is-a-habit" element={<WhatIsAHabitPage />} />
        <Route path="/how-to-build-a-habit" element={<HowToBuildAHabitPage />} />
      </Routes>
      <Footer />
    </div>
)};

export default App;
