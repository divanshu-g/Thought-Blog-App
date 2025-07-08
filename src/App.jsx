import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import Create from "./pages/Create";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./components/layout/MAinLayout";

function App() {
  return (
    <>
      <ToastContainer position="bottom-center" autoClose={3000} />
      <Routes>

        <Route element={<MainLayout/>}>
        <Route path="/" element={<Home />} />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              {" "}
              <Create />{" "}
            </PrivateRoute>
          }
        />
        <Route path="/profile" element={<Profile/>}/>

        <Route path="/fullBlog/:id" element={<BlogDetails />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
