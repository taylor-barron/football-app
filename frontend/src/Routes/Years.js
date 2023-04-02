import { useState, useEffect } from "react";

import GetYears from "../Functions/GetYears";
import Year from "../Components/Year";

const Years = () => {
    const [years, setYears] = useState([])

    useEffect(() => {

        GetYears().then((res) => {
            setYears(res);
        })

    }, [])

    return(
        <div>
            <div className="years-c">
                {years.map((year, index) => (
                    <Year key={index} year={year} />
                ))}
            </div>
        </div>
    )
}

export default Years;