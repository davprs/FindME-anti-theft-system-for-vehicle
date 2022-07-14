import axios from "axios";
import cookie from "cookie";
const API_URL = "http://127.0.0.1:5000/api/auth/";

class AuthService {

    parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }

    /**
     * send request to check if credentials are right
     * @param email
     * @param password
     * @returns {Promise<AxiosResponse<any>>}
     */
    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email,
                password
            })
            .then(res => {
                if (res.data) {
                    document.cookie = "token=" + JSON.stringify(res.data.token);
                    localStorage.setItem("brand", res.data.brand)
                }
                return res.data;
            });
    }

    /**
     * removes cookies
     */
    logout() {
        document.cookie = "token=; Max-Age=0;secure";
        localStorage.removeItem("brand")
    }

    /**
     * send credentials to server, store response token
     * @param username
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     * @param plate
     * @param deviceID
     * @param brand
     * @returns {Promise<AxiosResponse<any>>}
     */
    register(username, firstName, lastName, email, password, plate, deviceID, brand) {
        return axios.post(API_URL + "signup", {
            username, firstName, lastName, email, password, plate, deviceID, brand
        })
        .then((response) => {
            localStorage.setItem("brand", response.data.brand)
            document.cookie = "token=" + JSON.stringify(response.data.token);

        })
    }

    /**
     * check if token is right by sending it to server
     * @param token
     * @returns {Promise<AxiosResponse<any>>}
     */
    verifyToken(token) {
        return axios.post(API_URL + "verify/" + token);
    }

    getToken(){
        if (document.cookie.indexOf('token') === -1) {
            throw new Error("token not found");
        }
        return cookie.parse(document.cookie)['token'];
    }

    getCurrentUser() {
        return this.parseJwt(cookie.parse(document.cookie)['token']);
    }
}
export default new AuthService();