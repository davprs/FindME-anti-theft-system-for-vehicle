import Main from './Main/main'
import Login from './Login/login'
import PageNotFound from "./PageNotFound/pageNotFound";
import Dashboard from "./Dashboard/dashboard";
import Home from "../Components/Home";
import Info from "../Components/Info";

function objectFlip(obj) {
    return Object.keys(obj).reduce((ret, key) => {
        ret[obj[key]] = key;
        return ret;
    }, {});
}

export const HOME_PATH = "/home";
export const HOME_PATH_COMP = "/";
export const INFO_PATH = "/info";
export const CONTACTS_PATH = "/contatti";
export const LOGIN_PATH = "/login";
export const SIGNUP_PATH = "/signup";
export const LOGOUT_PATH = "/logout";
export const DASHBOARD_PATH = "/dashboard";
export const SETTINGS_PATH = DASHBOARD_PATH + "/settings";

export const PATH_DICT = Object.assign({[HOME_PATH_COMP]: 0},
    ...[HOME_PATH, INFO_PATH, CONTACTS_PATH,
        LOGIN_PATH, DASHBOARD_PATH, SIGNUP_PATH,
        LOGOUT_PATH, SETTINGS_PATH].map((path, index) => ({[path]: index})));


export const PATH_DICT_INV = objectFlip(PATH_DICT)

export const MainPublicPages = [
    <Home />,
    <Info />,
    <p>ciao</p>,
];
export const MainPublicPathNames = ["Home", "Info", "Contatti", "Login"];
export const MainPublicPaths = [HOME_PATH, INFO_PATH, CONTACTS_PATH, LOGIN_PATH];

export {Main, Login, PageNotFound, Dashboard};