import Dashboard from "./Components/Dashboard"
import Login from "./Components/Login"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
					<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
