
const GetWeeks = async (year) => {

    const yearJSON = { year }

    console.log(yearJSON)

    const res = await fetch(process.env.REACT_APP_HEROKU + "weeks", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(yearJSON)
    })

    const weeks = await res.json()

    return weeks
}

export default GetWeeks;