
const GetYears = async () => {

    /*const res = await fetch(process.env.REACT_APP_HEROKU + "years", {
        method: 'GET',
        headers: {
        'Content-type': 'application/json',
    }
    })*/

    const res = await fetch("http://localhost:4000/years", {
        method: 'GET',
        headers: {
        'Content-type': 'application/json',
    }
    })

    const data = await res.json()
    
    let allYears = []
    for(let i = 0; i < data.length; i++) {
        allYears.push(data[i].Year)
    }
    return allYears;
}

export default GetYears;