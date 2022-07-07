import axios from "axios";
const API_URL = "http://127.0.0.1:5000/api/car_brand/image/";


export const getBrandImage = (newBrand) => {
    return axios.get(API_URL + newBrand);
}

export const pathToBrandImage = (alt, path) => {
    return <img className={"manufacturerLogo"} src={path} alt={alt}/>
}