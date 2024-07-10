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

const App = () => {
    return (
        <Router>
          <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
    );
};

export default App;
