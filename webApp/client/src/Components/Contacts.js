function Contacts () {
    return (
        <>
            <div className={"contactsContainer"}>
                <div className={"openTime"}>
                    <div className={"titleTime"}>Orari</div>
                    <ul className={"days"}>
                        <li>lunedì</li>
                        <li>martedì</li>
                        <li>mercoledì</li>
                        <li>giovedì</li>
                        <li>venerì</li>
                        <li>sabato</li>
                        <li>domenica</li>
                    </ul>

                    <ul className={"hours"}>
                        <li>07:00-15:00</li>
                        <li>07:00-15:00</li>
                        <li>07:00-15:00</li>
                        <li>07:00-15:00</li>
                        <li>07:00-15:00</li>
                        <li>07:00-12:00</li>
                        <li>chiusi</li>
                    </ul>
                </div>
                <div className={"contacts"}>
                    <div className={"title"}>Contatti</div>
                    <div className={"email1"}>
                        info: <a href={"mailto:davide.crisante3@studio.unibo.it"}>info@findme.it</a>
                    </div>
                    <div className={"email2"}>
                        reclami: <a href={"mailto:davide.crisante3@studio.unibo.it"}>claims@findme.it</a>
                    </div>

                    <div className={"tel"}>
                        telefono: <a href={"tel:119"}>+39 333 333 3333</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contacts;