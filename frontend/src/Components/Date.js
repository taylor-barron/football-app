import { useEffect, useState } from "react";
import TimeSlot from "./TimeSlot";
import SortByTimeSlot from "../Functions/SortByTimeSlot";

const Date = ({ games }) => {
    const [ timeSlots, setTimeSlots ] = useState([])

    useEffect(() => {
        
        setTimeSlots(SortByTimeSlot( games ))

    }, [])

    return (
        <div>
            <h1>{games[0].date}</h1>
            {timeSlots.map((games, index) => (
                <TimeSlot key={index} gamesArray={games} />
            ))}<br></br>
        </div>
    )

}

export default Date;