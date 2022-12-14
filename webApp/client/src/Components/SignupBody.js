import {AnimatePresence, motion} from "framer-motion";
import {createRef, useEffect, useState} from "react";
import {wrap} from "popmotion";
import SignupForm from "./SignupForm";
import SignupNavigationButtons from "./SignupNavigationButtons";
import SignupFormProgress from "./SignupFormProgress";
import LoginFormPage from "./LoginFormPage";
import authService from "../Auth/auth.service";
import {useNavigate} from "react-router";
import {DASHBOARD_PATH} from "../Routes";
import {createToastWarning} from "./Toast";

const SignupBody = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [formInputData, setFormInputData] = useState({
        firstName:'',
        lastName:'',
        username:'',
        brand:'',
        deviceID:'',
        plate:'',
        email:'',
        password:'',
        passwordConfirm:''
    });
    const navigate = useNavigate();
    const SignupFormProgressRef = createRef();

    useEffect(() => {
        updateFormProgressBar();
    }, [page])

    /**
     * Updates form state
     * @param event
     */
    const handleInputChange = (event, newValue, id) => {
        let NewInputValue, inputFieldValue, inputFieldName;
        if(newValue){
            inputFieldValue = newValue;
            inputFieldName = id;
        } else {
            inputFieldValue = event.target.value;
            inputFieldName = event.target.id;
        }

        NewInputValue = {...formInputData, [inputFieldName]:inputFieldValue}

        setFormInputData(NewInputValue);
    }

    /**
     * page => currentPageNumber + direction
     * @param newDirection
     */
    const paginate = (newDirection) => {
        if (page + newDirection >=  0 && page + newDirection < pages.length){
            setPage([page + newDirection, newDirection]);
        }
    };

    /**
     * min-max standardization for progressBar
     * @returns {number}
     */
    const getPercent = () => {
        return page * 100/ (pages.length - 1);
    }


    const updateFormProgressBar = () => {
        SignupFormProgressRef.current.updatePercent();
    }

    const handleFormSubmit =(event)=>{
        event.preventDefault();
        const hasEmptyInput = !Object.values(formInputData).every(res=>{
            return res!=="";
        });
        if(hasEmptyInput)
        {
            createToastWarning('???? Ci siamo quasi! ???? Ricorda di riempire tutti i campi ????');
            return;
        }

        if(formInputData.password !== formInputData.passwordConfirm){
            createToastWarning('Le password non coincidono!');
            return;
        }

        authService.register(formInputData.username,
            formInputData.firstName, formInputData.lastName,
            formInputData.email, formInputData.password,
            formInputData.plate, formInputData.deviceID,
            formInputData.brand)
            .then(() => navigate(DASHBOARD_PATH))
            .catch((error) => {
                createToastWarning('Email o Username gi?? in uso. Prova a cambiarli!');
                console.log(error);
            });
    }

    const pages = [
        <SignupForm fields={[["Nome", "firstName"], ["Cognome", "lastName"], ["Username", "username"]]}
                    formInputData={formInputData}
                    handleInputChange={handleInputChange} />,
        <SignupForm fields={[["Targa", "plate"], ["Codice dispositivo", "deviceID"], ["Marca", "brand"]]}
                    showPlate={true}
                    containsPassword={false}
                    formInputData={formInputData}
                    handleInputChange={handleInputChange}/>,
        <SignupForm fields={[["Email", "email"], ["Password", "password"], ["Conferma Password", "passwordConfirm"]]}
                    showPlate={false}
                    containsPassword={true}
                    isSignup={true}
                    formInputData={formInputData}
                    handleInputChange={handleInputChange}/>
    ];
    const pageIndex = wrap(0, pages.length, page);

    return (
        <>
            <SignupFormProgress ref={SignupFormProgressRef} nSteps={pages.length} getPercent={getPercent}/>
            <AnimatePresence custom={direction} exitBeforeEnter={true}>
                <LoginFormPage page={page}
                               direction={direction}
                               pageIndex={pageIndex}
                               pages={pages}
                               paginate={paginate}/>
            </AnimatePresence>
            <SignupNavigationButtons paginate={paginate}
                                     prev={-1}
                                     next={1}
                                     isFirst={page === 0}
                                     isLast={page === pages.length - 1}
                                     formSubmit={handleFormSubmit}/>
        </>
    );

}

export default SignupBody;