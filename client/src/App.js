// // Client/src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./Pages/Login/Login";
// import Signup from "./Pages/Signup/Signup";
// import GSignup from "./Pages/Signup/GAuthSignUp";
// import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
// import Dashboard from "./Pages/Dashboard/Dashboard";
// import AddHospital from "./Pages/AddHospital/AddHospital";
// import HospitalInfo from "./Pages/HospitalInfo/HospitalInfo";
// import AddPatient from "./Pages/AddPatient/AddPatient";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/google-signup" element={<GSignup />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/add-hospital" element={<AddHospital />} />
//           <Route path="/hospitalInfo" element={<HospitalInfo />} />
//           <Route path="/addPatient" element={<AddPatient />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



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
      </Routes>
    </Router>
  );
};

export default App;
