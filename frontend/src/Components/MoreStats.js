
const MoreStats = ({ scoreRating, explosivenessScore, importanceScore, talentScore, penaltyScore }) => {

    return (
        <div>
            <div>
                <p>Score Rating:</p>
                <p>{scoreRating}</p>
            </div>
            <div>
                <p>Explosiveness Rating:</p>
                <p>{explosivenessScore}</p>
            </div>
            <div>
                <p>Importance Rating:</p>
                <p>{importanceScore}</p>
            </div>
            <div>
                <p>Talent Rating:</p>
                <p>{talentScore}</p>
            </div>
            <div>
                <p>Penalty Rating:</p>
                <p>{penaltyScore}</p>
            </div>
        </div>
    )
}

export default MoreStats