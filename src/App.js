/* eslint-disable no-unused-vars */
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import PageRoutes from "./routes/PageRoutes";

function App() {
    return (
    <SkeletonTheme baseColor="#e3e3e3" highlightColor="#444">
        <PageRoutes />
    </SkeletonTheme>
       
    );
}

export default App;
