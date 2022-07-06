import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Year = ({ year }) => {
    const [showWeeks, setShowWeeks] = useState(false)

    return (
        <div>
            <h2><a href={'/weeks/' + year}>{ year }{' '}</a></h2>
            <Button
                text={"Show Weeks"}
                cssClass={"show-weeks-button"}
                onClick={() => {setShowWeeks(!showWeeks)}}
                color={"red"}
            />
        </div>
    )
}

export default Year;