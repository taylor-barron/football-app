const Week = ({ week, year }) => {

    let weekNumber = week.replace('week', '');

    return (

        <div className="week-c">

            <h3>{<a href={'/games/' + year + '/' + week}>{ weekNumber }{' '}</a>}</h3>

        </div>

    );
}

export default Week;