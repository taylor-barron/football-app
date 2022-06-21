
const Week = ({ week, year }) => {

    return (
        <div>
            <h2><a href={'/games/' + year + '/' + week}>{ week }{' '}</a></h2>
        </div>
    )
}

export default Week;