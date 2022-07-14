import {useEffect} from "react";

function Switch ({switchId, handleSwitch, checked}) {
    useEffect(() => {
        if (checked()){
            document.getElementById(switchId).checked = true;
        }
    }, []);
    return (
        <>
            <label className="switch">
                <input id={switchId} type="checkbox" onClick={handleSwitch}/>
                <span className="slider round"/>
            </label>
        </>
    ) ;
}

export default Switch;