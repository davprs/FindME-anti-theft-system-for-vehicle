import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const SignupNavigationButtons = ({paginate, prev, next, isFirst, isLast, formSubmit}) => {

    const buttonActionOnClick = (direction) => {
        if (isFirst && direction === prev) {
            return () => navigate("/");
        } else if (isLast && direction === next) {
            console.log("LAST")
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