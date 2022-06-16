import {Link} from "react-router-dom";
import {HOME_PATH, INFO_PATH, CONTACTS_PATH, LOGIN_PATH} from "../Routes/index";

const toggleMenu = (event) => {
    event.stopPropagation()
    let el = event.target;
    el.classList.toggle("openMenu");
}

function HamburgerMenu({handleClick, currentPage, closeMenu}) {
    return (
        <>
            <div className="menuContainer" onClick={toggleMenu}>
                <div className="menuIcon">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>

                <ul className="menu">
                    <li className={currentPage=== HOME_PATH || currentPage=== "/" ? "sel" : ""} >
                        <Link to={HOME_PATH} onClick={()=> {closeMenu();handleClick(HOME_PATH)}}>Home</Link>
                    </li>
                    <li className={currentPage=== INFO_PATH ? "sel" : ""}>
                        <Link to={INFO_PATH} onClick={()=>{closeMenu();handleClick(INFO_PATH)}}>Info</Link>
                    </li>
                    <li className={currentPage === CONTACTS_PATH ? "sel" : ""}>
                        <Link to={CONTACTS_PATH} onClick={()=>{closeMenu(); handleClick(CONTACTS_PATH)}}>Contatti</Link>
                    </li>
                    <li className={"loginItem"}>
                        <Link to={LOGIN_PATH} onClick={()=>{closeMenu(); handleClick(LOGIN_PATH)}}>Login</Link>
                    </li>
                </ul>

            </div>

        </>
    );
}



export default HamburgerMenu;
