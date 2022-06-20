
const GetWeeks = async (year) => {

    const yearJSON = { year }

    const res = await fetch("http://localhost:4000/weeks", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(yearJSON)
    })

    const weeks = await res.json()
    console.log(weeks)

    return weeks
}

export default GetWeeks;