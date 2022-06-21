
const GetGames = async (info) => {

    const res = await fetch(process.env.REACT_APP_HEROKU + "games", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(info)
    })

    const games = await res.json()

    return games
}

export default GetGames;