
const SortByGameRating = (games) => {

    for (let i = 0; i < games.length; i++) {

        const compositeScore = (games[i].gameInfo.scoreScore * 0.4) + (games[i].gameInfo.explosivenessScore * 0.25) + (games[i].gameInfo.importanceScore * 0.2) + (games[i].gameInfo.talentScore * 0.1) + (games[i].gameInfo.penaltyScore * 0.05)

        games[i].compositeScore = compositeScore;
    }

    let reverseSortedGames = games.sort(function(a, b) {return a.compositeScore - b.compositeScore})
    let sortedGames = reverseSortedGames.reverse()

    return sortedGames
}

export default SortByGameRating