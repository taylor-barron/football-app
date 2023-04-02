import { useState, useEffect } from "react";
import Button from "./Button";
import GetWeeks from "../Functions/GetWeeks";
import Week from "./Week";
import SortByWeeks from "../Functions/SortByWeeks";

const Year = ({ year }) => {

    const [ weeks, setWeeks ] = useState([])

    useEffect(() => {

        GetWeeks( year ).then((res) => {
            setWeeks(SortByWeeks(res))
        })

    }, [])

    return (
        <div>

            <div className="year-c">

                <h2>{ year }{' '}</h2>

                <div className="weeks-c">
                    {weeks.map((week, index) => (

                        <Week key={index} week={week.name} year={year} />

                    ))}
                </div>                

            </div>

            <hr className="year-hr"></hr>

        </div>
    );
}

export default Year;