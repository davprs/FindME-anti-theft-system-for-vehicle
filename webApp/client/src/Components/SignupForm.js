import PasswordStrengthBar from 'react-password-strength-bar';
import {useState} from "react";

const SignupForm = (props) => {

    let fieldCreated;

    if (props.showPlate) {
        fieldCreated = Array.from(props.fields, (field, index) => {
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
        fieldCreated.push(
            <>
                <PasswordStrengthBar className={"passwordStrengthBar"} password={props.formInputData.password} />
            </>
        );
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