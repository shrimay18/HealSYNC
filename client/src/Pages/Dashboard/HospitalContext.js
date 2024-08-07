// import React, { createContext, useState } from 'react';

// export const HospitalContext = createContext();

// export const HospitalProvider = ({ children }) => {
//     const [hospitals, setHospitals] = useState([]);

//     const addHospital = (hospital) => {
//         console.log(hospital);
//         setHospitals([...hospitals, hospital]);
//     };

//     return (
//         <HospitalContext.Provider value={{ hospitals, addHospital }}>
//             {children}
//         </HospitalContext.Provider>
//     );
// };
