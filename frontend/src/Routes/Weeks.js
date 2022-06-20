import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GetWeeks from "../Functions/GetWeeks";

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
            weeks go here {year} 
        </div>
    )
}

export default Weeks;