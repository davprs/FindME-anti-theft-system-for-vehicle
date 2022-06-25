import fullIcon from '../Assets/Images/icon+text.png'
import HamburgerMenu from "./HamburgerMenu";
import {Link} from "react-router-dom";
import {HOME_PATH, PATH_DICT, PATH_DICT_INV} from "../Routes";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {wrap} from "popmotion";

const pages = [
    <img src={"https://ilbolive.unipd.it/sites/default/files/2018-12/hi-tech.jpg"}/>,
    <img src={"https://ilbolive.unipd.it/sites/default/files/2018-12/hi-tech.jpg"}/>,
    <p>ciao</p>,
];
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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

function MainHeader(){
    const [[currentPage, direction], setCurrentPage] = useState([0, 0]);

    const pageIndex = wrap(0, pages.length, currentPage);

    const paginate = (newDirection) => {
        setCurrentPage([currentPage + newDirection, newDirection]);
    };
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

    console.log(PATH_DICT_INV)

    return (
        <>
            <nav>
                <Link to={HOME_PATH} onClick={()=>{closeMenu(); changePage(HOME_PATH)}}><img src={fullIcon} className={"fullIcon"} alt="logo FindME"/></Link>
                    <HamburgerMenu handleClick={changePage} currentPage={window.location.pathname} closeMenu={closeMenu}/>

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
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                >{pages[pageIndex]}
                </motion.div>
            </AnimatePresence>

        </>
    );
}

export default MainHeader;