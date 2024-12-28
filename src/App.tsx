import { BrowserRouter, Link, Route, Routes } from "react-router"
import './App.css'
import "@livekit/components-styles"
import Home from "./components/pages/Home"
import Conference from "./components/pages/Conference"
import axios from "axios"

function App() {

	axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
	
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/conference/:conferenceId" element={<Conference />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
