import axios from "axios";
const API_URL = "http://127.0.0.1:5000/api/car_brand/";


export const getBrandImagePath = (newBrand) => {
    return axios.get(API_URL + "image/" +  newBrand);
}

export const pathToBrandImage = (alt, path) => {
    return <img className={"manufacturerLogo"} src={path} alt={alt}/>
}

export const getKnownBrandNames = () => {
    return axios.get(API_URL + "names")
}