import axios from "axios";
const API_URL = "http://127.0.0.1:5000/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(res => {
                if (res.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(res.data));
                }
                return res.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(username, email, password, plate, deviceNumber) {
        return axios.post(API_URL + "signup", {
            username, email, password, plate, deviceNumber
        })
        .then((response) => {
            console.log(response.data)
            document.cookie = `token=${response.data}`
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}
export default new AuthService();