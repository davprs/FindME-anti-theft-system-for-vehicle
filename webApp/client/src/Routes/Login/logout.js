import {Navigate} from 'react-router-dom';
import {useEffect} from "react";
import authService from "../../Auth/auth.service";
import {HOME_PATH_COMP} from "../index";

function Logout(){

    useEffect(()=>{
        authService.logout()
    }, []);

    return (
        <>
            <Navigate to={HOME_PATH_COMP}/>
        </>
    );
}


export default Logout;