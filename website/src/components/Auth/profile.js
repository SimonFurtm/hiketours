import useAuthContext from "./useAuthContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
    const { user } = useAuthContext();
    if (!user) {
        return <Navigate replace to="/login" />;
    }
    return (
        <>
            <h1>Profile</h1>
        </>
    );
};

export default Profile;