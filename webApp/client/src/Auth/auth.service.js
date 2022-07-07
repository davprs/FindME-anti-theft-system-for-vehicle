import axios from "axios";
import cookie from "cookie";
const API_URL = "http://127.0.0.1:5000/api/auth/";

class AuthService {

    parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }

    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email,
                password
            })
            .then(res => {
                console.log("login : " + res.data.brand)
                if (res.data) {
                    document.cookie = "token=" + JSON.stringify(res.data.token);
                    localStorage.setItem("brand", res.data.brand)
                }
                return res.data;
            });
    }

    logout() {
        document.cookie = "token=; Max-Age=0;secure";
        localStorage.removeItem("brand")
    }

    register(username, firstName, lastName, email, password, plate, deviceID, brand) {
        console.log("sending : " + username, firstName, lastName, email, password, plate, deviceID, brand)
        return axios.post(API_URL + "signup", {
            username, firstName, lastName, email, password, plate, deviceID, brand
        })
        .then((response) => {
            console.log(response.data)
            localStorage.setItem("brand", response.data.brand)
            document.cookie = "token=" + JSON.stringify(response.data.token);

        })
    }
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