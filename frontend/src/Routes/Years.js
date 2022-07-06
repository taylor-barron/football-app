import { useState, useEffect } from "react";
import GetYears from "../Functions/GetYears";
import Year from "../Components/Year";
import Button from "../Components/Button";
import NavigationBar from "../Components/NavigationBar";
import Logo from "../Assets/favicon.ico"

const Years = () => {
    const [years, setYears] = useState([])

    useEffect(() => {

        GetYears().then((res) => {
            setYears(res);
        })

    }, [])

    return(
        <div>
            <NavigationBar
                css={"navigation-bar"}
                text={"navigation-text"}
                logo={Logo}
                logoCss={"navImg"}

            />
            <div>
                {years.map((year, index) => (
                    <Year key={index} year={year} />
                ))}
            </div>
        </div>
    )
}

export default Years;