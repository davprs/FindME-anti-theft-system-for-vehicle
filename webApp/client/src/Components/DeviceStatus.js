import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBatteryFull,
    faBatteryHalf,
    faBatteryQuarter,
    faBatteryThreeQuarters,
    faLocationCrosshairs
} from "@fortawesome/free-solid-svg-icons";

/**
 * get the right battery icon depending battery level
 * @param level
 * @returns {IconDefinition}
 */
function getIcon (level){
    switch (level) {
        case 1:
            return faBatteryQuarter;
            break;
        case 2:
            return faBatteryHalf;
            break;
        case 3:
            return faBatteryThreeQuarters;
            break;
        case 4:
            return faBatteryFull;
            break;
    }
}

export function DeviceStatus({internetSignal}) {
    return (
        <div className={"internetSignal signal-bars mt1 sizing-box s-" + internetSignal}>
            <div className={"icon"}>
                <div className="first-bar bar"/>
                <div className="second-bar bar"/>
                <div className="third-bar bar"/>
                <div className="fourth-bar bar"/>
            </div>
            <div>internet</div>
        </div>
    );
}

export function DeviceGPSSignal({gpsSignal}) {
    return (
        <div className={"gpsSignal"}>
            <FontAwesomeIcon className={"gpsIcon s-" + gpsSignal} icon={faLocationCrosshairs} />
            <div>GPS</div>
        </div>
    );
}

export function DeviceBatteryLevel({batteryLevel}) {
    return (
        <div className={"batteryLevel"}>
            <FontAwesomeIcon className={"batteryIcon s-" + batteryLevel} icon={getIcon(batteryLevel)} />
            <br/>
            <div>batteria</div>
        </div>
    );
}

