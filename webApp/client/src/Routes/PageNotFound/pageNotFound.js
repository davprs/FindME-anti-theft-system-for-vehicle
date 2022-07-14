import './pageNotFound.style.scss';
import MainHeader from "../../Components/MainHeader";
import {
    MainPublicPages,
    MainPublicPathNames,
    MainPublicPaths
} from "../index";

function PageNotFound(){
    return (
        <>
            <MainHeader paths={MainPublicPaths}
                        pathNames={MainPublicPathNames}
                        pages={MainPublicPages}/>

            <div className={'notFoundContainer'}>
                <h1 className="first-four">4</h1>
                <div className="cog-wheel1">
                    <div className="cog1">
                        <div className="top"></div>
                        <div className="down"></div>
                        <div className="left-top"></div>
                        <div className="left-down"></div>
                        <div className="right-top"></div>
                        <div className="right-down"></div>
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </div>

                <div className="cog-wheel2">
                    <div className="cog2">
                        <div className="top"></div>
                        <div className="down"></div>
                        <div className="left-top"></div>
                        <div className="left-down"></div>
                        <div className="right-top"></div>
                        <div className="right-down"></div>
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </div>
                <h1 className="second-four">4</h1>
                <p className="wrong-para">Page not found!</p>
            </div>
        </>
    );
}


export default PageNotFound;