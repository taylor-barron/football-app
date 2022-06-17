import os
from dotenv import dotenv_values, load_dotenv

load_dotenv()
config = dotenv_values(".env")

# get scores and times of scores
def getTimeAndScoreArrays(gameJSON):

    # arrays to hold scores
    awayArray = []
    homeArray = []

    quarterArray = []
    timeArray = []

    # get all scores
    for quarter in gameJSON[config['QUARTERS']]:
        for score in quarter[config['ALL_SCORES']]:
            # get time, get score differential
            awayArray.append(int(score[config['AWAY_SCORES']]))
            homeArray.append(int(score[config['HOME_SCORES']]))
            quarterArray.append(quarter[config['WHICH_QUARTER']])
            timeArray.append(score[config['TIME_OF_SCORE']])


    # process data for closeness
    # arrays are given first values as games start 0-0 which merits 100 closeness score until first actual score
    counter = 0
    closenessScoreArray = [100]
    timeStampArray = [0]
    while counter < len(awayArray):
        totalAwayScore = awayArray[counter]
        totalHomeScore = homeArray[counter]

        currentCloseness = abs(totalAwayScore - totalHomeScore)

        # logic for 1 & 2pt attempts to factor in all at once
        if (awayArray[counter] - awayArray[counter - 1] == 6) or (homeArray[counter] - homeArray[counter - 1] == 6):
            try:
                # 6 pts and there was an exp or 2 pt conversion
                if timeArray[counter] == timeArray[counter + 1]:
                    totalAwayScore = awayArray[counter + 1]
                    totalHomeScore = homeArray[counter + 1]
                    currentCloseness = abs(totalAwayScore - totalHomeScore)

                    gameTime = calcGamePercentage(quarterArray[counter], timeArray[counter])
                    currentClosenessScore = closenessScore(currentCloseness)

                    closenessScoreArray.append(currentClosenessScore)
                    timeStampArray.append(gameTime)

                # no extra point or 2pt conversion
                else:
                    gameTime = calcGamePercentage(quarterArray[counter], timeArray[counter])
                    currentClosenessScore = closenessScore(currentCloseness)
                    
                    closenessScoreArray.append(currentClosenessScore)
                    timeStampArray.append(gameTime)

            # handle index exception if there is not additional score
            except:
                gameTime = calcGamePercentage(quarterArray[counter], timeArray[counter])
                currentClosenessScore = closenessScore(currentCloseness)

                closenessScoreArray.append(currentClosenessScore)
                timeStampArray.append(gameTime)                    

        # logic to ignore 1 & 2pt try scores on next iteration
        elif (awayArray[counter] - awayArray[counter - 1] == 1) or (homeArray[counter] - homeArray[counter - 1] == 1):
            pass
        elif ((awayArray[counter] - awayArray[counter - 1] == 2) or (homeArray[counter] - homeArray[counter - 1] == 2) and timeArray[counter] == timeArray[counter - 1]):
            pass

        # all other scores
        else:
            gameTime = calcGamePercentage(quarterArray[counter], timeArray[counter])
            currentClosenessScore = closenessScore(currentCloseness)

            closenessScoreArray.append(currentClosenessScore)
            timeStampArray.append(gameTime)        

        # prepare values for next iteration
        counter += 1

    return timeStampArray, closenessScoreArray, currentCloseness

# calculates what percentage of game is over at time of score
# usually should take (quarterArray[counter], timeArray[counter])
def calcGamePercentage(quarter, currentTime):

    if quarter == "1ST QUARTER":
        newTimeMarker = currentTime
        splitTimeMarker = (newTimeMarker.split(":"))
        minutesPercentage = float(splitTimeMarker[0]) / 15
        secondsPercentage = float(splitTimeMarker[1]) / 60 / 15
        totalTimePercentage = 25 * (1 - (minutesPercentage + secondsPercentage))
    elif quarter == "2ND QUARTER":
        newTimeMarker = currentTime
        splitTimeMarker = (newTimeMarker.split(":"))
        minutesPercentage = float(splitTimeMarker[0]) / 15
        secondsPercentage = float(splitTimeMarker[1]) / 60 / 15
        totalTimePercentage = 25 + (25 * (1 - (minutesPercentage + secondsPercentage)))
    elif quarter == "3RD QUARTER":
        newTimeMarker = currentTime
        splitTimeMarker = (newTimeMarker.split(":"))
        minutesPercentage = float(splitTimeMarker[0]) / 15
        secondsPercentage = float(splitTimeMarker[1]) / 60 / 15
        totalTimePercentage = 50 + (25 * (1 - (minutesPercentage + secondsPercentage)))
    elif quarter == "4TH QUARTER":
        newTimeMarker = currentTime
        splitTimeMarker = (newTimeMarker.split(":"))
        minutesPercentage = float(splitTimeMarker[0]) / 15
        secondsPercentage = float(splitTimeMarker[1]) / 60 / 15
        totalTimePercentage = 75 + (25 * (1 - (minutesPercentage + secondsPercentage)))
    elif quarter == "OT":
        totalTimePercentage = 100

    return totalTimePercentage

# score closeness function
def closenessScore(currentCloseness):

    if currentCloseness < 4:
        score = 100
    elif currentCloseness < 8:
        score = 90
    elif currentCloseness < 9:
        score = 85
    elif currentCloseness < 11:
        score = 70
    elif currentCloseness < 15:
        score = 55
    elif currentCloseness < 17:
        score = 40
    elif currentCloseness < 22:
        score = 30
    elif currentCloseness < 25:
        score = 20
    elif currentCloseness < 29:
        score = 10
    else:
        score = 0

    return score

# score rates games closeness and comeback scores and returns highest grade
def calcGameClosenessScore(closenessScoreArray, timeStampArray):
    totalScore = 0
    counter = 0
    while counter < len(closenessScoreArray):

        if counter == 0:
            previousTimeStamp = timeStampArray[counter]
        else:
            # calc percentage of game
            lengthOfScore = timeStampArray[counter] - previousTimeStamp
            # multiply times score
            totalScore += (lengthOfScore * closenessScoreArray[counter])
            previousTimeStamp = timeStampArray[counter]
            if timeStampArray[counter] == 100:
                totalScore += 200

        counter += 1

    return (totalScore / 105)

# calculate comeback score
def calcGameComebackScore(closenessScoreArray):
    counter = 0
    lowestScore = 100
    while counter < len(closenessScoreArray):
        if closenessScoreArray[counter] < lowestScore:
            lowestScore = closenessScoreArray[counter]
            lowestScoreIndex = counter + 1
        counter += 1

    try:
        counter2 = lowestScoreIndex
        onTheWayUp = 0
        while counter2 < len(closenessScoreArray):
            if ((closenessScoreArray[counter2] > lowestScore) and (closenessScoreArray[counter2] > onTheWayUp)):
                onTheWayUp = closenessScoreArray[counter2]
            counter2 += 1
            
        comebackScore = 1.2 * (onTheWayUp - lowestScore)
        if comebackScore < 0:
            comebackScore = 0
    except:
        comebackScore = 0

    return comebackScore

def calcExplosivePlays(gameJSON):
    
    explosiveScore = 0
    try:
        for quarter in gameJSON[config['QUARTERS']]:
            for possession in quarter[config['POSSESSIONS']]:
                for play in possession[config['PLAY']]:
                    
                    playText = play[config['DESCRIPTION']]

                    if "rush" in playText:
                        try: 
                            # substrings
                            sub1 = " rush for"
                            sub2 = " yard"
                            # get index of substrings
                            idx1 = playText.index(sub1)
                            idx2 = playText.index(sub2)

                            # iterate through string to extract rush
                            rushLength = ''
                            for idx in range(idx1 + len(sub1) + 1, idx2):
                                rushLength = rushLength + playText[idx]

                        # handle alternate wording for rush plays
                        except:
                            try:
                                # substrings
                                sub1 = " gain of"
                                sub2 = " yard"
                                # get index of substrings
                                idx1 = playText.index(sub1)
                                idx2 = playText.index(sub2)

                                # iterate through string to extract rush
                                rushLength = ''
                                for idx in range(idx1 + len(sub1) + 1, idx2):
                                    rushLength = rushLength + playText[idx]
                            
                            # handle exception for rush plays with loss or no gain
                            except:
                                try:
                                    if "loss" in playText or "no gain" in playText:
                                        rushLength = 0

                                # handle unknown exceptions by logging details to console
                                except Exception as e:
                                    print("rush error", e)
                                    print(playText)

                            rushLength = int(rushLength)

                            if rushLength > 50:
                                explosiveScore += 5
                            elif rushLength > 40:
                                explosiveScore += 4
                            elif rushLength > 30:
                                explosiveScore += 3
                            elif rushLength > 20:
                                explosiveScore += 2
                            elif rushLength >= 10:
                                explosiveScore += 1
                
                    elif "pass complete" in playText:
                        try:
                            # substrings
                            sub1 = " for"
                            sub2 = " yard"
                            # get index of substrings
                            idx1 = playText.index(sub1)
                            idx2 = playText.index(sub2)

                            # iterate through string to extract rush
                            passLength = ''
                            for idx in range(idx1 + len(sub1) + 1, idx2):
                                passLength = passLength + playText[idx]
                    
                            passLength = int(passLength)
                            if passLength > 50:
                                explosiveScore += 5
                            elif passLength > 40:
                                explosiveScore += 4
                            elif passLength > 30:
                                explosiveScore += 3
                            elif passLength > 20:
                                explosiveScore += 2
                            elif passLength >= 10:
                                explosiveScore += 1

                        # handle exception for loss of yardage
                        except:
                            try:
                                if "loss" in playText:
                                    passLength = 0
                            # handle unknown exception by logging to console
                            except Exception as e:
                                print("complete pass error", e)

                    elif "kickoff" in playText and "return" in playText:
                        try:
                            playTextArray = playText.split("return ")
                            useablePlayTextArray = playTextArray[1].split()
                            returnLength = int(useablePlayTextArray[0])

                            if returnLength > 60:
                                explosiveScore += 5
                            elif returnLength > 50:
                                explosiveScore += 4
                            elif returnLength > 40:
                                explosiveScore += 3
                        # handle exception for muffed catch
                        except:
                            try:
                                if "muffed" in playText:
                                    explosiveScore += 1
                            # handle unknown exception by logging to console
                            except Exception as e:
                                print("kickoff error", e)
                                print(playText)

                    elif "punt" in playText and "return" in playText:

                        try:
                            playTextArray = playText.split("return ")
                            useablePlayTextArray = playTextArray[1].split()
                            returnLength = int(useablePlayTextArray[0])
                    
                            returnLength = int(returnLength)
                            if returnLength > 40:
                                explosiveScore += 4
                            elif returnLength > 30:
                                explosiveScore += 3
                            elif returnLength > 20:
                                explosiveScore += 2
                        # handle exception for muffed catch
                        except:
                            try:
                                if "muffed" in playText:
                                    explosiveScore += 1
                            # handle unknown exception by logging to console
                            except Exception as e:
                                print("punt error", e)
                                print(playText)

                    elif "yards GOOD" in playText:
                        # substrings
                        sub1 = " from"
                        sub2 = " yard"
                        # get index of substrings
                        idx1 = playText.index(sub1)
                        idx2 = playText.index(sub2)

                        # iterate through string to extract rush
                        kickLength = ''
                        for idx in range(idx1 + len(sub1) + 1, idx2):
                            kickLength = kickLength + playText[idx]
                    
                        kickLength = int(kickLength)
                        if kickLength > 60:
                            explosiveScore += 3
                        elif kickLength > 50:
                            explosiveScore += 2
                        elif kickLength > 40:
                            explosiveScore += 1

                    elif "intercepted" in playText:
                        explosiveScore += 4

                    elif "sacked" in playText:
                        explosiveScore += 2

                    if "SAFETY" in playText:
                        explosiveScore += 3

                    if "TOUCHDOWN" in playText:
                        explosiveScore += 5

                    if "fumble" in playText:
                        explosiveScore += 2

    # handle exception when individual play data is not available
    except Exception as e:
        print("individual play data not available", e)
        explosiveScore = 25

    
    return (explosiveScore / 1.6)

# Calculate Penalty Score
def finalPenaltyScore(gameJSON):

    awayPenaltyJSON = gameJSON[config['TEAM_SELECTOR_2']][0][config['ALL_STATS']][5][config['PENALTIES']]
    homePenaltyJSON = gameJSON[config['TEAM_SELECTOR_2']][1][config['ALL_STATS']][5][config['PENALTIES']]

    awayPenaltySplit = awayPenaltyJSON.split("-")
    awayPenaltyNumber = awayPenaltySplit[0]

    homePenaltySplit = homePenaltyJSON.split("-")
    homePenaltyNumber = homePenaltySplit[0]

    totalPenalties = int(homePenaltyNumber) + int(awayPenaltyNumber)

    if totalPenalties == 0:
        finalPenaltyScore = 100
    elif totalPenalties == 1:
        finalPenaltyScore = 98
    elif totalPenalties == 2:
        finalPenaltyScore = 96
    elif totalPenalties == 3:
        finalPenaltyScore = 94
    elif totalPenalties == 4:
        finalPenaltyScore = 90
    elif totalPenalties == 5:
        finalPenaltyScore = 80
    elif totalPenalties < 8:
        finalPenaltyScore = 70
    elif totalPenalties < 10:
        finalPenaltyScore = 60
    elif totalPenalties < 13:
        finalPenaltyScore = 50
    elif totalPenalties < 16:
        finalPenaltyScore = 40
    elif totalPenalties < 19:
        finalPenaltyScore = 30
    elif totalPenalties < 22:
        finalPenaltyScore = 20
    else:
        finalPenaltyScore = 0

    return finalPenaltyScore

# Calculate final closeness/comeback/spread score
def finalscoringScore(closeness, comeback, spread):

    # score score is highest of closeness and comeback scores
    if closeness > comeback:
        finalScore = closeness    
    else:
        finalScore = comeback

    # spread score is used as a modifier which adds to score score if spread was large
    spreadModifier = spread / 5

    finalScore = finalScore + spreadModifier

    return finalScore