import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

function Map({position, date, alarm}) {

    const [timeNow, setTime] = useState(new Date());

    setTimeout(() => {
        setTime(new Date());
    }, 1000);

    let dateDiff = () => {
        let diffSec = Math.floor((timeNow - date.getTime()) / 1000);
        let diffMin = Math.floor(diffSec / 60);
        if (diffSec < 0) {
            diffSec = 0;
        }
        if(diffSec < 10) {
            return "" + diffSec + " secondi";
        } else if (diffSec >= 10 && diffSec < 60) {
            return "meno di un minuto"
        } else if (diffSec >= 60) {
            return "" + diffMin + " minuti";
        } else if (diffMin >= 24) {
            return "" + Math.floor(diffMin/24) + " giorni";
        }
        return 0;
    }

    return (
        <div className={"map-container-update"}>
            {position ? (
                <>
                    <p>Ultimo aggiornamento {dateDiff()} fa</p>
                    <GoogleMap zoom={15 + alarm*3} center={position} mapContainerClassName="map-container">
                        <Marker position={position}/>
                    </GoogleMap>
                </>
                ) : (
                    <p>Il dispositivo non ha ancora trasmesso alcuna informazione..</p>
                )}
        </div>
    );
}
const render = (status) => {
    switch (status) {
        case Status.LOADING:
            return <p>Loading..</p>;
        case Status.FAILURE:
            return <p>Errore..</p>;
        /*case Status.SUCCESS:
            return <Map />;*/
    }
};

function DeviceLocation({position, date, alarm}) {
    return (
        <Wrapper apiKey={"AIzaSyA5dmUkhAySaqlDlZRmV12bq_TRZc1_QWI"} render={render} >
            <Map position={position}
                 date={date}
                 alarm={alarm}/>
        </Wrapper>
    );
}
export default DeviceLocation;