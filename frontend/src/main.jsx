import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout.jsx"
import Logout from "./pages/Logout.jsx"
import MyMessages from "./pages/MyMessages.jsx"
import Board from "./pages/Board.jsx"
import SignUp from "./pages/SignUp.jsx"
import SignIn from "./pages/SignIn.jsx"
import AuthGuard from "./components/AuthGuard.jsx"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Board />} />
                    <Route path="my-messages" element={<AuthGuard><MyMessages /></AuthGuard>} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
