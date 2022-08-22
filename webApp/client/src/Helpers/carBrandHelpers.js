import axios from "axios";
import {serverStaticIP} from "./serverAddress";
const API_URL = "http://" + serverStaticIP + ":5000/api/car_brand/";


export const getBrandImagePath = (newBrand) => {
    return axios.get(API_URL + "image/" +  newBrand);
}

export const pathToBrandImage = (alt, path) => {
    return <img className={"manufacturerLogo"} src={path} alt={alt}/>
}

export const getKnownBrandNames = () => {
    return axios.get(API_URL + "names")
}