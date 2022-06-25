import {motion} from "framer-motion";

const LoginFormPage = ({pages, paginate, page, direction, pageIndex}) => {

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

    return (
        <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit={{x: direction * window.innerWidth, transition: {duration: 0.1}}}

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
    );
}

export default LoginFormPage