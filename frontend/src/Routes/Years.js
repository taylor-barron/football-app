import { useState, useEffect } from "react";
import GetYears from "../Functions/GetYears";
import Year from "../Components/Year";

const Years = () => {
    const [years, setYears] = useState([])

    useEffect(() => {

        GetYears().then((res) => {
            setYears(res)
        })

    }, [])

    return(
        <div>
            {years.map((year, index) => (
                <Year key={index} year={year} />
                ))}
        </div>
    )
}

export default Years;

/*

            {years.map((year, index) => (
                <Year key={index} year={year} />
            ))}
*/