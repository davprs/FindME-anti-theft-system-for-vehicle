import fullIcon from '../Assets/Images/icon+text.png'
import HamburgerMenu from "./HamburgerMenu";
import {Link} from "react-router-dom";
import {PATH_DICT} from "../Routes";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {wrap} from "popmotion";

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

function MainHeader({paths, pathNames, pages}){
    const [[currentPage, direction], setCurrentPage] = useState([0, 0]);

    const pageIndex = wrap(0, pages.length, currentPage);

    const changePage = (pageIndex) => {
        setCurrentPage([PATH_DICT[pageIndex], PATH_DICT[pageIndex] > currentPage? 1 : -1]);
    }

    const closeMenu = ()=> {
        document.getElementsByClassName('menuContainer')
            .item(0).classList.remove("openMenu");
    }
    useEffect(()=>{
        console.log(window.location.pathname);
        changePage(window.location.pathname)
    }, [window.location.pathname]);

    return (
        <>
            <nav>
                <Link to={paths[0]} onClick={()=>{closeMenu(); changePage(paths[0])}}><img src={fullIcon} className={"fullIcon"} alt="logo FindME"/></Link>
                    <HamburgerMenu handleClick={changePage}
                                   currentPage={window.location.pathname}
                                   closeMenu={closeMenu}
                                   paths={paths}
                                   pathNames={pathNames}
                    />

            </nav>
            <AnimatePresence custom={direction} exitBeforeEnter={true}>
                <motion.div
                    key={currentPage}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit={{x: direction*window.innerWidth, transition: {duration: 0.1}}}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}

                >{pages[pageIndex]}
                </motion.div>
            </AnimatePresence>

        </>
    );
}

export default MainHeader;