import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./Context/AppContext";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import GSignup from "./Pages/Signup/GAuthSignUp";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddHospital from "./Pages/AddHospital/AddHospital";
import HospitalInfo from "./Pages/HospitalInfo/HospitalInfo";
import AddPatient from "./Pages/AddPatient/AddPatient";
import PatientPastHistory from "./Pages/PatientPastHistory/PatientPastHistory";
import Appointment from "./Pages/Appointment/Appointment";
import SearchPatient from "./Pages/SearchPatient/SearchPatient";

const App = () => {
  return (
    <AppProvider>
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
            path="/edit-hospital/:id"
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
            path="/editPatient/:patientId"
            element={
              <ProtectedRoute>
                <AddPatient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patientPastHistory/:patientId"
            element={
              <ProtectedRoute>
                <PatientPastHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointment/:patientId"
            element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/searchPatient"
            element={
              <ProtectedRoute>
                <SearchPatient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointment/:patientId/:appointmentId"
            element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;