import PasswordStrengthBar from 'react-password-strength-bar';
import {useNavigate} from "react-router";
import {SIGNUP_PATH} from "../Routes";

const SignupForm = (props) => {

    let fieldCreated;
    const navigate = useNavigate();

    if (props.showPlate) {
        const notPlate = props.fields.filter(([_, plate]) => plate !== 'plate');
        const plate = props.fields.filter(([_, plate]) => plate === 'plate');
        const fieldNotPlate = Array.from(notPlate, (field, index) => {
            return (
                <>
                    <label htmlFor={field[1]}>{field[0]} :</label>
                    <input id={field[1]} type={"text"}
                           placeholder={field[0] + ".."}
                           value={props.formInputData[field[1]]}
                           onChange={props.handleInputChange}/>
                    <br/>
                </>);
        });
        const fieldPlate = Array.from(plate, (field, index) => {
            return (
                <>
                    <div className="car-plate-wrapper">
                        <span className="registration-ui">
                            <input id={field[1]}
                                   type={"text"}
                                   placeholder={field[0] + ".."}
                                   value={props.formInputData[field[1]]}
                                   onChange={props.handleInputChange}/>
                        </span>
                    </div>
                    <br/>
                </>);
        });
        fieldCreated = fieldNotPlate;
        fieldCreated.push(fieldPlate);
    } else if (props.containsPassword) {
        fieldCreated = Array.from(props.fields, (field, index) => {
            return (
                <>
                    <label htmlFor={field[1]}>{field[0]} :</label>
                    <input id={field[1]}
                           type={field[1].includes("password") ? "password": "text"}
                           placeholder={field[0] + ".."}
                           value={props.formInputData[field[1]]}
                           onChange={props.handleInputChange}/>
                    <br/>


                </>);
        });
        if(props.isSignup) {
            fieldCreated.push(
                <>
                    <PasswordStrengthBar className={"passwordStrengthBar"} password={props.formInputData.password}/>
                </>
            );
        } else {
            fieldCreated.push(
                <>
                    <p>non hai un account? <u><a onClick={()=>navigate(SIGNUP_PATH)} style={{cursor: "pointer"}}>Creane uno!</a></u></p>
                </>
            );
        }
    } else {
        fieldCreated = Array.from(props.fields, (field, index) => {
            return (
                <>
                    <label htmlFor={field[1]}>{field[0]} :</label>
                    <input id={field[1]} type={"text"}
                           placeholder={field[0] + ".."}
                           value={props.formInputData[field[1]]}
                           onChange={props.handleInputChange}/>
                    <br/>
                </>);
        });
    }



    return (
            <div className={"signupFormFrame"}>
                {fieldCreated}
            </div>
    );
}

export default SignupForm;