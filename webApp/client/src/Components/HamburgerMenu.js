import {Link} from "react-router-dom";
import {HOME_PATH, HOME_PATH_COMP} from "../Routes";

const toggleMenu = (event) => {
    event.stopPropagation()
    let el = event.target;
    el.classList.toggle("openMenu");
}

function HamburgerMenu({handleClick, currentPage, closeMenu, paths, pathNames}) {
    const menuItems = Array.from(paths, (path, index) => {
        return (
            <li key={index.toString()}
                className={(currentPage=== path || (currentPage === HOME_PATH_COMP && path === HOME_PATH)) ? "sel" : "" ||
                    index === paths.length - 1 ? "lastItem": ""}>
                <Link to={path} onClick={()=> {closeMenu();handleClick(path)}}>{pathNames[index]}</Link>
            </li>
        )
    });

    return (
        <>
            <div className="menuContainer" onClick={toggleMenu}>
                <div className="menuIcon">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>

                <ul className="menu">
                    {menuItems}
                </ul>

            </div>

        </>
    );
}



export default HamburgerMenu;
