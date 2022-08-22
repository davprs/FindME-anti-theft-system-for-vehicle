import MainHeader from '../../Components/MainHeader'
import './main.style.scss';
import {
    MainPublicPages,
    MainPublicPathNames, MainPublicPaths
} from "../index";
import {useEffect} from "react";
import Footer from "../../Components/Footer";


function Main(){
    useEffect(() => {
        document.title = "FindME"
    }, []);
    return (
        <div id={"page"}>
            <MainHeader paths={MainPublicPaths}
                        pathNames={MainPublicPathNames}
                        pages={MainPublicPages}/>
            <Footer />
        </div>);
}


export default Main;