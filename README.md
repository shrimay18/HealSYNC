# HealSYNC 🏥

A comprehensive healthcare management system designed to streamline hospital operations, patient management, and medical record keeping. HealSYNC provides an integrated platform for healthcare professionals to manage patient information, hospital data, and medical histories efficiently.

## 🌟 Project Description

HealSYNC is a full-stack web application that digitizes and simplifies healthcare workflows. The platform enables healthcare providers to:

- **Manage Patient Records**: Store and access comprehensive patient information including personal details, contact information, and medical history
- **Hospital Administration**: Maintain hospital profiles with registration details, contact information, and location data
- **Medical History Tracking**: Document and retrieve patient medical histories, appointments, and doctor's notes
- **Secure Authentication**: Support for traditional username/password authentication and Google OAuth integration
- **User Management**: Role-based access control for doctors, administrators, and other healthcare professionals

## ✨ Key Features

### Patient Management
- Add and update patient profiles with detailed information (demographics, contact details, emergency contacts)
- Search and filter patient directories
- Track patient appointments and medical visits
- Upload and manage patient documents (PDF support)

### Hospital Information System
- Register and manage multiple hospital profiles
- Store hospital registration numbers and contact details
- Maintain location information (street, area, landmark, pincode)
- Edit and update hospital information

### Medical Records
- Document patient medical history
- Add doctor's notes and observations
- Track past medical history and treatments
- Secure storage and retrieval of medical data

### Authentication & Security
- Secure user registration and login
- Google OAuth 2.0 integration for streamlined authentication
- Session management with Express sessions
- Password encryption using bcrypt
- Protected routes and role-based access control

## 🛠️ Tech Stack

### Frontend
- **React** (v18.3.1) - UI framework
- **React Router DOM** (v6.24.1) - Client-side routing
- **Axios** - HTTP client for API requests
- **TailwindCSS** (v3.4.4) - Utility-first CSS framework
- **FontAwesome** - Icon library
- **React Phone Input** - Phone number input component

### Backend
- **Node.js** with **Express.js** (v4.19.2) - Server framework
- **MongoDB** with **Mongoose** (v8.4.5) - Database and ODM
- **Passport.js** - Authentication middleware
- **Google OAuth 2.0** - Third-party authentication
- **JWT** (jsonwebtoken) - Token-based authentication
- **bcrypt/bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **Nodemon** - Auto-restart server during development
- **Create React App** - React project scaffolding

## 📁 Project Structure

```
HealSYNC/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   │   ├── AddNotes/
│   │   │   ├── Card/
│   │   │   ├── Navbar/
│   │   │   ├── PDFUpload/
│   │   │   └── ...
│   │   ├── Pages/          # Application pages
│   │   │   ├── Login/
│   │   │   ├── Signup/
│   │   │   ├── Dashboard/
│   │   │   ├── AddHospital/
│   │   │   ├── AddPatient/
│   │   │   ├── PatientPastHistory/
│   │   │   └── ...
│   │   ├── Context/        # React Context for state management
│   │   └── App.js          # Main application component
│   └── package.json
│
├── server/                 # Node.js backend application
│   ├── controllers/        # Request handlers
│   ├── models/            # MongoDB schemas
│   │   ├── Users.js
│   │   ├── Patients.js
│   │   ├── Hospitals.js
│   │   ├── doctorNotes.js
│   │   └── patientHistory.js
│   ├── Routes/            # API route definitions
│   ├── Middleware/        # Custom middleware
│   ├── Hooks/             # Custom hooks
│   ├── passport.js        # Passport configuration
│   ├── index.js           # Server entry point
│   └── package.json
│
└── package.json           # Root package configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shrimay18/HealSYNC.git
   cd HealSYNC
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Configure environment variables**
   
   Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:3000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm start
   ```
   The React app will run on `http://localhost:3000` (or another port if 3000 is occupied)

### Production Deployment

The application is currently deployed at: [https://healsync-nm7z.onrender.com](https://healsync-nm7z.onrender.com)

## 📋 API Routes

The backend provides the following API endpoints:

- `/signup` - User registration
- `/login` - User authentication
- `/auth` - Google OAuth authentication
- `/dashboard` - Dashboard data
- `/hospital` - Hospital management
- `/patientHistory` - Patient medical history
- `/notes` - Doctor's notes

## 🔐 Authentication

HealSYNC supports two authentication methods:

1. **Traditional Authentication**: Username and password with bcrypt hashing
2. **Google OAuth 2.0**: Streamlined authentication using Google accounts

Session management is handled using Express sessions with secure cookie configuration.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- [@shrimay18](https://github.com/shrimay18)

## 🙏 Acknowledgments

- Built with Create React App
- Uses MongoDB for database management
- Implements Passport.js for authentication
- Styled with TailwindCSS

---

**Note**: This is an educational/demonstration project for healthcare management. For production use in real healthcare settings, ensure compliance with relevant healthcare data regulations (HIPAA, GDPR, etc.) and implement additional security measures.
