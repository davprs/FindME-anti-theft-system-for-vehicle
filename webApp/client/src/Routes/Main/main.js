import MainHeader from '../../Components/MainHeader'
import './main.style.scss';
import {HOME_PATH, INFO_PATH, CONTACTS_PATH, LOGIN_PATH, HOME_PATH_COMP} from "../index";
import {useEffect} from "react";

const pages = [
    <img src={"https://ilbolive.unipd.it/sites/default/files/2018-12/hi-tech.jpg"}/>,
    <img src={"https://ilbolive.unipd.it/sites/default/files/2018-12/hi-tech.jpg"}/>,
    <p>ciao</p>,
];

function Main(){
    useEffect(() => {
        document.title = "FindME"
    }, []);
    return (
        <>
            <MainHeader paths={[HOME_PATH, INFO_PATH, CONTACTS_PATH, LOGIN_PATH]}
                        pathNames={["Home", "Info", "Contatti", "Login"]}
                        pages={pages}/>
        </>);
}


export default Main;