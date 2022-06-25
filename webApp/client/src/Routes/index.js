import Main from './Main/main'
import Login from './Login/login'
import PageNotFound from "./PageNotFound/pageNotFound";

function objectFlip(obj) {
    return Object.keys(obj).reduce((ret, key) => {
        ret[obj[key]] = key;
        return ret;
    }, {});
}

export const HOME_PATH = "/home";
export const INFO_PATH = "/info";
export const CONTACTS_PATH = "/contatti";
export const LOGIN_PATH = "/login";

export const PATH_DICT = Object.assign({"/": 0},
    ...[HOME_PATH, INFO_PATH, CONTACTS_PATH, LOGIN_PATH].map((path, index) => ({[path]: index})));


export const PATH_DICT_INV = objectFlip(PATH_DICT)

export {Main, Login, PageNotFound};