import {DeviceBatteryLevel, DeviceGPSSignal, DeviceStatus} from "./DeviceStatus";
import DeviceLocation from "./DeviceLocation";
import {io} from 'socket.io-client';
import {useEffect, useState} from "react";
import AuthService from "../Auth/auth.service";
import {AnimatePresence, motion} from "framer-motion";


function DashboardFootButtons({alarm}) {
    console.log(alarm)
    return (
        <div className={"dashboardFootButtons"}>
            <button className={"theft"}
                    disabled={!alarm}
                    onClick={()=>{window.location.href="tel:119"}}>
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

    const [[position, date, alarm, batteryLevel, gpsLevel, internetLevel], setData] = useState([null, new Date(), false, 4, 3, 4]);

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
        socket.emit('client connection', 'connection');
        socket.on('connect_error', () => {
            setTimeout(() => socket.connect(), 10000)
        })
        socket.on({username : username, email: email}.toString(), ([data, alarm]) => {
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

    const [isVisible, setVisible] = useState(false)
    useEffect(() => {
        setVisible(alarm);
    }, [alarm]);
    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        id={"alarm"}
                        initial="enter"
                        animate="center"
                        exit={{ opacity: 0 }}
                        onTap={() => setVisible(false)}>
                    <motion.div
                        id={"alarmContent"}
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        <h2>FURTO IN CORSO!</h2>
                        <h3>contatta le autorità competenti</h3>
                    </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={"deviceInfo"}>

                <DeviceStatus internetSignal={internetLevel} />
                <DeviceGPSSignal gpsSignal={gpsLevel} />
                <DeviceBatteryLevel batteryLevel={batteryLevel} />

                <DeviceLocation position={position} date={date} alarm={alarm}/>
                <DashboardFootButtons alarm={alarm}/>

            </div>
        </>
    );
}

export default DeviceInfo;