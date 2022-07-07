import '../Routes/Dashboard/dashboard.style.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight} from '@fortawesome/fontawesome-free-solid';
import DeviceInfo from "./DeviceInfo";
import {useEffect, useState} from "react";
import {getBrandImagePath, pathToBrandImage} from "../Helpers/carBrandHelpers";


function MainDashboard() {
    const [[brand, brandImage], setBrand] = useState(['loading..', null]);
    function getBrand() {
        return localStorage.getItem("brand");
    }

    useEffect(() => {
        const newBrand = getBrand();
        getBrandImagePath(newBrand)
            .then(imgPath => {
                setBrand([newBrand, pathToBrandImage(newBrand + " logo", imgPath.data)])
            })
            .catch(err => setBrand([newBrand, pathToBrandImage(newBrand + " logo", null)]));
    }, []);

    return (
        <>
            <div className={"carPicker"}>
                {brandImage}
                <p className={"carModel"}>{brand}</p>
                <a className={"selectCar"}>
                    <FontAwesomeIcon icon={faAngleDoubleRight}/>
                </a>
            </div>

            <DeviceInfo/>
        </>);
}


export default MainDashboard;