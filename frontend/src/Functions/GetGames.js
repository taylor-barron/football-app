
const GetGames = async (info) => {

    const res = await fetch("http://localhost:4000/games", {
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