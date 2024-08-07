// import React from 'react';
// import ReactDOM from 'react-dom';
// import Login from './Components/Login/login.jsx';
// import Signup from './Components/Signup/signup.jsx';
// import './App.css';
// import { BrowserRouter, Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//           <Route exact path="/" component={Login} />
//           <Route path="/signup" component={Signup} />
//       </Routes>
//    </BrowserRouter>
//   );
// }

// export default App;
// Client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import GSignup from './Pages/Signup/GAuthSignUp';
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoute';
import Dashboard from './Pages/Dashboard/Dashboard';
import AddHospital from './Pages/AddHospital/AddHospital';
import HospitalInfo from './Pages/HospitalInfo/HospitalInfo';
import AddPatient from './Pages/AddPatient/AddPatient';
import PatientPastHistory from './Pages/PatientPastHistory/PatientPastHistory';
import Appointment from './Pages/Appointment/Appointment';
const App = () => {
    return (
        <Router>
          <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/google-signup" element={<GSignup />} />
              {/*<ProtectedRoute path="/dashboard" element={<ProtectedRoute />} />*/}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-hospital" element={<AddHospital />} />
              <Route path="/hospitalInfo" element={<HospitalInfo />} />
              <Route path="/addPatient" element={<AddPatient />} />
              <Route path="/patientPastHistory" element={<PatientPastHistory />} />
              <Route path="/appointment" element={<Appointment />} />
          </Routes>
        </Router>
    );
};

export default App;
