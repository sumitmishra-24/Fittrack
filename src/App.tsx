/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import WorkoutPage from "./pages/WorkoutPage";
import DietPage from "./pages/DietPage";
import ProgressPage from "./pages/ProgressPage";

function Layout() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-[#CCFF00] selection:text-black">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="workout" element={<WorkoutPage />} />
          <Route path="diet" element={<DietPage />} />
          <Route path="progress" element={<ProgressPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
