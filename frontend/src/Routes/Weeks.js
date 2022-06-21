import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GetWeeks from "../Functions/GetWeeks";
import Week from "../Components/Week";

const Weeks = () => {
    const {year} = useParams();
    const [weeks, setWeeks] = useState([])

    useEffect(() => {

        GetWeeks({ year }).then((res) => {
            setWeeks(res)
        })
        
    }, [])

    return (
        <div>
            {weeks.map((week, index) => (
                <Week key={index} week={week.name} year={year} />
            ))}
        </div>
    )
}

export default Weeks;