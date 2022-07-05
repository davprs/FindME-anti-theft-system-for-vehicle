import authService from "../../Auth/auth.service";
import MainHeader from "../../Components/MainHeader";
import {HOME_PATH, INFO_PATH, CONTACTS_PATH, LOGIN_PATH, DASHBOARD_PATH, LOGOUT_PATH, HOME_PATH_COMP} from "../index";
import MainDashboard from "../../Components/MainDashboard";
import {useEffect, useState} from "react";

import { Navigate } from "react-router-dom";

const pages = [
    <MainDashboard />,
    <p>Change Device</p>,
];

function Dashboard() {

    const [isLoggedIn, setLogIn] = useState(null);

    console.log("auth : " + authService.getToken());
    authService.verifyToken(authService.getToken())
        .then(res => {
            console.log(res)
            setLogIn(true);
            console.log(isLoggedIn)
        })
        .catch((err) => {
            console.log(err);
            setLogIn(false);
        });


    useEffect(() => {
        document.body.style.backgroundColor = "#B32D30";
        document.title = "Dashboard FindME";

        return function cleanup() {
            document.body.style.backgroundColor = null;
        }
    }, []);


    if (isLoggedIn === null){
        return <p>Loading..</p>
    } else if (isLoggedIn === true){
        return (
            <>
                <MainHeader paths={[DASHBOARD_PATH, INFO_PATH, CONTACTS_PATH, LOGOUT_PATH]}
                            pathNames={["Dash Board", "Change Device", "Notifiche", "Logout"]}
                            pages={pages}/>
            </>);
    } else {
        return <Navigate to={HOME_PATH_COMP}/>;
    }

}

export default Dashboard;