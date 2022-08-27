import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import {wrap} from "popmotion";
import SignupForm from "./SignupForm";
import SignupNavigationButtons from "./SignupNavigationButtons";
import LoginFormPage from "./LoginFormPage";
import authService from "../Auth/auth.service";
import {useNavigate} from "react-router";
import {DASHBOARD_PATH} from "../Routes";
import {createToastWarning} from "./Toast";

const LoginBody = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [formInputData, setFormInputData] = useState({
        email:'',
        password:''
    });
    const navigate = useNavigate();

    /**
     * Updates form state
     * @param event
     */
    const handleInputChange = (event) => {
        const inputFieldValue = event.target.value;
        const inputFieldName = event.target.id;
        const NewInputValue = {...formInputData, [inputFieldName]:inputFieldValue}
        setFormInputData(NewInputValue);
    }

    /**
     * page => currentPageNumber + direction
     * @param newDirection
     */
    const paginate = (newDirection) => {
        if (page + newDirection >=  0){
            setPage([page + newDirection, newDirection]);
        }
    };

    /**
     * send credentials to server and check responses
     * @param event
     */
    const handleFormSubmit =(event)=>{
        event.preventDefault();
        const hasEmptyInput = !Object.values(formInputData).every(res=>{
            console.log(res!=="");
            return res!=="";
        });
        if(hasEmptyInput)
        {
            createToastWarning('🚀 Ci siamo quasi! 🚀 Ricorda di riempire tutti i campi 😊');
            return;
        }

        authService.login(formInputData.email, formInputData.password)
            .then(async (resData) => await localStorage.setItem("brand", resData.brand))
            .then(() => console.log(authService.getCurrentUser()))
            .then(() => navigate(DASHBOARD_PATH))
            .catch((error) => {
                createToastWarning('Email o Password non corretti😅');
                console.log(error);
            });
    }

    const pages = [
        <SignupForm fields={[["Email", "email"], ["Password", "password"]]}
                    formInputData={formInputData}
                    isSignup={false}
                    containsPassword={true}
                    handleInputChange={handleInputChange} />
    ];
    const pageIndex = wrap(0, pages.length, page);

    return (
        <>
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

export default LoginBody;