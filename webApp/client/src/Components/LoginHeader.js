import icon from '../Assets/Images/icon.png'
import {Link} from "react-router-dom";
import {HOME_PATH} from "../Routes";

function LoginHeader(){
    return (
        <Link to={HOME_PATH}>
        <div className={"loginHeader"}>
            <img className={"loginHeaderImg"} src={icon}/>
        </div>
        </Link>
    );


}

export default LoginHeader;