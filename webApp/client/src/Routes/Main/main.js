import MainHeader from '../../Components/MainHeader'
import './main.style.scss';
import {
    MainPublicPages,
    MainPublicPathNames, MainPublicPaths
} from "../index";
import {useEffect} from "react";


function Main(){
    useEffect(() => {
        document.title = "FindME"
    }, []);
    return (
        <>
            <MainHeader paths={MainPublicPaths}
                        pathNames={MainPublicPathNames}
                        pages={MainPublicPages}/>
        </>);
}


export default Main;