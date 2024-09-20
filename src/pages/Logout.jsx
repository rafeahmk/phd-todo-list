import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContex"; // Importing the context to clear the token
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token and navigate to login
        setToken(null);
        navigate("/login");
    }, [setToken, navigate]);

    return (
        <div>
            <h1>Logging you out...</h1>
        </div>
    );
}
