import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import GetWeeks from "../Functions/GetWeeks";
import Week from "./Week";

const Year = ({ year }) => {
    const [ showWeeks, setShowWeeks ] = useState(false)
    const [ weeks, setWeeks ] = useState([])

    useEffect(() => {

        GetWeeks( year ).then((res) => {
            setWeeks(res)
        })
    }, [])

    return (
        <div>
            <div>
                <h2><a href={'/weeks/' + year}>{ year }{' '}</a></h2>
                <Button
                    text={"Show Weeks"}
                    cssClass={"show-weeks-button"}
                    onClick={() => {setShowWeeks(!showWeeks)}}
                    color={"red"}
                />
            </div>
            {showWeeks && weeks.map((week, index) => (
                <Week key={index} week={week.name} year={year} />
            ))}
        </div>
    )
}

export default Year;