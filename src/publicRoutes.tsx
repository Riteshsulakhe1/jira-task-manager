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
import { RouteKeys } from "./navigation/routekeys";
import Board from "./board/board";
import CreateOrganization from "./authentication/createOrganization";

const PublicRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path={RouteKeys.createOrg} element={<CreateOrganization />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<div>Edit Project</div>} />
            <Route path="/projects/:projectId/backlog" element={<Backlog />} />
            <Route path={"/projects/:projectId/" + RouteKeys.board} element={<Board />} />
        </Routes>
    );
};
export default PublicRoutes;