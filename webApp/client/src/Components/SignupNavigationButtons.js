import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {HOME_PATH_COMP} from "../Routes";

const SignupNavigationButtons = ({paginate, prev, next, isFirst, isLast, formSubmit}) => {

    const buttonActionOnClick = (direction) => {
        if (isFirst && direction === prev) {
            return () => navigate(HOME_PATH_COMP);
        } else if (isLast && direction === next) {
            return (evt) => formSubmit(evt);
        }

        return () => paginate(direction);
    }

    const navigate = useNavigate();


    return (
        <>
            <div className={"signupButtons"}>
                <button className={"prevBtn"}
                        type={"button"}
                        component={Link}
                        to="../ciao"
                        onClick={()=>buttonActionOnClick(prev)()}>
                    <div>Indietro</div>
                </button>
                <button className={"nextBtn"}
                        type={`${isLast ? "submit" : "button" }`}
                        onClick={(evt)=>buttonActionOnClick(next)(evt)}>
                    <div>Avanti</div>
                </button>
            </div>
        </>
    )
}

export default SignupNavigationButtons;