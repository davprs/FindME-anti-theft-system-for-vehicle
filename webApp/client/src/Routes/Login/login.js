import './login.style.scss';
import LoginHeader from '../../Components/LoginHeader'
import LoginBody from "../../Components/LoginBody";
import authService from "../../Auth/auth.service";
import {DASHBOARD_PATH} from "../index";
import {useNavigate} from "react-router";
import {useEffect} from "react";

function Login(){
    const navigate = useNavigate();
    useEffect(() => {
        Promise.resolve()
            .then(() => authService.getToken())
            .then(async (token) => await authService.verifyToken(token))
            .then(() => navigate(DASHBOARD_PATH))
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <LoginHeader />
            <LoginBody />
        </>
    );
}


export default Login;