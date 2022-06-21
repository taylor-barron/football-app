import { Link } from "react-router-dom";

const Year = ({ year }) => {

    return (
        <div>
            <h2><a href={'/weeks/' + year}>{ year }{' '}</a></h2>
        </div>
    )
}

export default Year;