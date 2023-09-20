import {
    createBrowserRouter,
    RouterProvider,
    Routes,
    Route,
} from "react-router-dom";
import "./index.css";
import Login from "./authentication/login";
import Register from "./authentication/register";
import Projects from "./projects/projectList";
import Home from './Home';
import Backlog from './Backlog/backlog';

const PublicRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<div>Edit Project</div>} />
            <Route path="/projects/:projectId/backlog" element={<Backlog />} />
        </Routes>
    );
};
export default PublicRoutes;