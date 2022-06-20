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
            {timeSlots.map((games, index) => (
                <TimeSlot key={index} gamesArray={games} />
            ))}
        </div>
    )

}

export default Date;