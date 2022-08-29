import img from '../Assets/Images/wooden-surface-product-background.png';

function Info () {

    return (
        <div className={"publicContent infoProduct"}>
            <img className={"image"} src={img}/>
            <div className={"description"}>
                <h1>FindME Device <em>V1.0</em></h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id orci mi. Vestibulum ornare congue velit, vel eleifend enim varius non. Suspendisse maximus auctor odio tincidunt dignissim. Maecenas imperdiet elementum tempus. Sed in diam efficitur erat congue imperdiet sed quis dolor. In libero nulla, posuere sed dui non, tristique porttitor orci. Ut vitae rhoncus metus, nec tincidunt elit. Donec enim leo, sollicitudin a sem ut, pulvinar ultrices nunc.
                <br/>
                <br/>
                <h2>A partire da 129<em>$</em></h2>
            </div>
        </div>
    );
}

export default Info;