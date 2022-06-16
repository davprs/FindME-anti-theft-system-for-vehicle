import fullIcon from '../Assets/Images/icon+text.png'
import HamburgerMenu from "./HamburgerMenu";
import {Link} from "react-router-dom";
import {HOME_PATH} from "../Routes";
import {useState} from "react";

function MainHeader(){
    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    const handleClick = (pageIndex) => {
        setCurrentPage(pageIndex);
        console.log(window.location.pathname)
        console.log(pageIndex)
    }

    const closeMenu = ()=> {
        document.getElementsByClassName('menuContainer')
            .item(0).classList.remove("openMenu");
    }

    return (
        <>
            <nav>
                <Link to={HOME_PATH} onClick={()=>{closeMenu(); handleClick(HOME_PATH)}}><img src={fullIcon} className={"fullIcon"} alt="logo FindME"/></Link>
                    <HamburgerMenu handleClick={handleClick} currentPage={currentPage} closeMenu={closeMenu}/>

            </nav>

        </>
    );
}

export default MainHeader;