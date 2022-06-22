
const MoreStats = ({ scoreRating, explosivenessScore, importanceScore, talentScore, penaltyScore }) => {

    const formattedScoreRating = Math.round(scoreRating*100)/100;
    const formattedExplosivenessScore = Math.round(explosivenessScore*100)/100;
    const formattedImportanceScore = Math.round(importanceScore*100)/100;
    const formattedTalentScore = Math.round(talentScore*100)/100;
    const formattedPenaltyScore = Math.round(penaltyScore*100)/100;

    return (
        <div className="more-stats-container">
            <div className="more-stats-text-container">
                <p className="more-stats-text">Score Rating:</p>
                <p className="more-stats-text">{formattedScoreRating}</p>
            </div><hr className="h-rule"></hr>
            <div className="more-stats-text-container">
                <p className="more-stats-text">Explosiveness Rating:</p>
                <p className="more-stats-text">{formattedExplosivenessScore}</p>
            </div><hr className="h-rule"></hr>
            <div className="more-stats-text-container">
                <p className="more-stats-text">Importance Rating:</p>
                <p className="more-stats-text">{formattedImportanceScore}</p>
            </div><hr className="h-rule"></hr>
            <div className="more-stats-text-container">
                <p className="more-stats-text">Talent Rating:</p>
                <p className="more-stats-text">{formattedTalentScore}</p>
            </div><hr className="h-rule"></hr>
            <div className="more-stats-text-container">
                <p className="more-stats-text">Penalty Rating:</p>
                <p className="more-stats-text">{formattedPenaltyScore}</p>
            </div>
        </div>
    )
}

export default MoreStats