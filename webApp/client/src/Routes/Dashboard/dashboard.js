import authService from "../../Auth/auth.service";
import MainHeader from "../../Components/MainHeader";
import {
    LOGIN_PATH, HOME_PATH_COMP,
    MainUserPaths, MainUserPathNames
} from "../index";
import MainDashboard from "../../Components/MainDashboard";
import {useEffect, useState} from "react";

import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router";
import DashboardSettings from "../../Components/DashboardSettings";


function Dashboard() {
    const [isLoggedIn, setLogIn] = useState(null);
    const [darkTheme, setDarkTheme] = useState(JSON.parse(localStorage.getItem('themeDark')));
    const navigate = useNavigate();
    const lightThemeBG = "#B32D30";
    const darkThemeBG = '#801810';

    function toggleHtmlTheme () {
        document.querySelector("html").classList.toggle("light");
        document.querySelector("html").classList.toggle("dark");
    }

    const pages = [
        <MainDashboard />,
        <DashboardSettings toggleHtmlTheme={toggleHtmlTheme} darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
    ];

    useEffect(() => {
        Promise.resolve()
            .then(() => authService.getToken())
            .then(token => authService.verifyToken(token))
            .then(async res => {
                console.log(res)
                await setLogIn(true);
                console.log(isLoggedIn)
            })
            .catch((err) => {
                console.log(err);
                setLogIn(false);
                navigate(LOGIN_PATH);
            });
        console.log(JSON.parse(localStorage.getItem('themeDark')))
        if (JSON.parse(localStorage.getItem('themeDark'))){
            setDarkTheme(true);
        } else {
            setDarkTheme(false);
        }

        document.title = "Dashboard FindME";

    }, []);

    useEffect( () => {
        if (darkTheme){
            if (document.querySelector("html").classList.contains("light")){
                toggleHtmlTheme();
            }
            console.log('setting dark background')
            document.body.style.backgroundColor = darkThemeBG;
            localStorage.setItem('themeDark', 'true');
        } else {
            if (document.querySelector("html").classList.contains("dark")){
                toggleHtmlTheme();
            }
            document.body.style.backgroundColor = lightThemeBG;
            localStorage.setItem('themeDark', 'false');
        }

        return function cleanup() {
            if (document.querySelector("html").classList.contains("dark")){
                toggleHtmlTheme();
            }
            document.body.style.backgroundColor = null;
        }
    }, [darkTheme])


    if (isLoggedIn === null){
        return <p>Loading..</p>
    } else if (isLoggedIn === true){
        return (
            <div id={"userPage"}>
                <MainHeader paths={MainUserPaths}
                            pathNames={MainUserPathNames}
                            pages={pages}/>
            </div>);
    } else {
        return <Navigate to={HOME_PATH_COMP}/>;
    }

}

export default Dashboard;