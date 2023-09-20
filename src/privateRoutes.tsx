import {
    Routes,
    Route
} from "react-router-dom";
import "./index.css";
import Projects from './projects/projectList';

const PrivateRoutes = () => {

    return (
        <Routes>
            <Route path="/projects" element={<Projects />} />
        </Routes>
    );
};
export default PrivateRoutes;