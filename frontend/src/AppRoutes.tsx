import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/AuthRoutes/Login"
import { Signup } from "./pages/AuthRoutes/Signup"
import { UserProfile } from "./pages/UserProfile"
import { Discover } from "./pages/Discover"
import { Book } from "./pages/Book"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            {/* user profile */}
            <Route path="/userProfile" element={<UserProfile></UserProfile>}></Route>
            {/* book lists */}
            <Route path="/discover" element={<Discover></Discover>}></Route>
            {/* individual book  */}
            <Route path="/:id" element={<Book></Book>}></Route>
        </Routes>
    )
}
