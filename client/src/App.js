import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import GSignup from "./Pages/Signup/GAuthSignUp";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddHospital from "./Pages/AddHospital/AddHospital";
import HospitalInfo from "./Pages/HospitalInfo/HospitalInfo";
import AddPatient from "./Pages/AddPatient/AddPatient";
import patientPastHistory from "./Pages/PatientPastHistory/PatientPastHistory";
import Appointment from "./Pages/Appointment/Appointment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/google-signup" element={<GSignup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-hospital"
          element={
            <ProtectedRoute>
              <AddHospital />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospitalInfo"
          element={
            <ProtectedRoute>
              <HospitalInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addPatient"
          element={
            <ProtectedRoute>
              <AddPatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patientPastHistory"
          element={
            <ProtectedRoute>
              <patientPastHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointment"
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
