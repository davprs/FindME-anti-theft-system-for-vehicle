import {DeviceBatteryLevel, DeviceGPSSignal, DeviceStatus} from "./DeviceStatus";
import DeviceLocation from "./DeviceLocation";
import {io} from 'socket.io-client';
import {useEffect, useState} from "react";
import AuthService from "../Auth/auth.service";


function DashboardFootButtons({alarm}) {
    console.log(alarm)
    return (
        <div className={"dashboardFootButtons"}>
            <button className={"theft"}
                    disabled={!alarm}
                    onClick={()=>{window.location.href="tel:3392071583"}}>
                Furto
            </button>
            <button className={"help"}
                    onClick={()=>{window.location.href="mailto:davide.crisante3@studio.unibo.it"}}>
               Assistenza
            </button>
        </div>
    );
}

function DeviceInfo() {

    const [[position, date, alarm, batteryLevel, gpsLevel, internetLevel], setData] = useState([{lat: 42.5, lng: 14.1039731}, new Date(), false, 4, 3, 4]);

    useEffect(() => {
        const jsonToken = AuthService.getCurrentUser();
        const username = jsonToken.username;
        const email = jsonToken.email;

        const socket = io('http://localhost:4000', {
            withCredentials: true,
            extraHeaders: {
                "authorization": "bearer"
            }
        });
        socket.emit('client connection', 'ciao');
        socket.on('connect_error', () => {
            setTimeout(() => socket.connect(), 10000)
        })
        socket.on({username: '1', email: '1', alarm: false}.toString(), ([data, alarm]) => {
            setData([{lat: data.gpsPos.x, lng: data.gpsPos.y},
                new Date(data.updatedAt),
                alarm,
                data.bat,
                data.gpsSig,
                data.simSig
            ])
        })
        socket.on('disconnect', () => console.log("server disconnected"))
    }, []);

    return (
            <div className={"deviceInfo"}>
                <DeviceStatus internetSignal={internetLevel} />
                <DeviceGPSSignal gpsSignal={gpsLevel} />
                <DeviceBatteryLevel batteryLevel={batteryLevel} />

                <DeviceLocation position={position} date={date}/>
                <DashboardFootButtons alarm={alarm}/>

            </div>
    );
}

export default DeviceInfo;