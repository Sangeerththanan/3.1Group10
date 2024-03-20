import { createContext, useState, useContext } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});

    const [adminLoggedIn, setAdminLoggedIn] = useState(false);
    const [employerLoggedIn, setEmployerLoggedIn] = useState(false);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, profile, setProfile, adminLoggedIn, setAdminLoggedIn, employerLoggedIn, setEmployerLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
}

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;