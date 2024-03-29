from dotenv import dotenv_values, load_dotenv
from calendar import c
import requests
import json
from bs4 import BeautifulSoup
import cfbSource
import functions
import uploadToMongo

load_dotenv()
config = dotenv_values(".env")

## GET SCORES ##
 #"week1"
week = 'week' + config['WEEK']
 #"2021"
year = config['YEAR']

# get page
URL = config['STARTING_PAGE_URL'] + config['YEAR'] + '/' + config['ALT_WEEK'] + "/" + config['FINAL_MODIFIER']
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

results = soup.find(id=config['STARTING_PAGE_SELECTOR'])

games = results.find_all("div", class_=config['STARTING_PAGE_CLASS'])

# # SET UP IF STATEMENT IF GAME.length.quarter != 6

# get game id
for game in games:
    
    # get game identifier from href in a element
    gameID = game.find('a')['href']
    # source for game scoring summary
    gameURL = config['GAME_URL'] + gameID + config['SCORES_TIMES']
    
    # using requests library to retrieve get request from data source
    page = requests.get(gameURL)

    # convert response to useable json
    gameJSON = json.loads(page.text)
    # print(gameJSON['meta']['teams'][0])
    try:
        if gameJSON['meta']['teams'][0]['homeTeam'] == 'false':
            awayTeam = gameJSON['meta']['teams'][0]['shortname']
            homeTeam = gameJSON['meta']['teams'][1]['shortname']
            print( homeTeam, awayTeam)
        else:
            awayTeam = gameJSON['meta']['teams'][1]['shortname']
            homeTeam = gameJSON['meta']['teams'][0]['shortname']
            print( homeTeam, awayTeam)
    except:
        try:
            awayTeam = gameJSON[config['TEAM_SELECTOR_1']][config['TEAM_SELECTOR_2']][0][config['TEAM_SELECTOR_3']]
            homeTeam = gameJSON[config['TEAM_SELECTOR_1']][config['TEAM_SELECTOR_2']][1][config['TEAM_SELECTOR_3']]
        except Exception as e:
            print('team name error', e)
            continue

# # generate arrays of scores and the percentage of the game completed when scores take place + end of game closeness # #

    timeAndScoreArray = functions.getTimeAndScoreArrays(gameJSON)
    timeStampArray = timeAndScoreArray[0]
    closenessScoreArray = timeAndScoreArray[1]
    currentCloseness = timeAndScoreArray[2]

# # process data here for closeness and comebacks after generating above arrays # #

    finalClosenessScore = functions.calcGameClosenessScore(closenessScoreArray, timeStampArray)
    finalComebackScore = functions.calcGameComebackScore(closenessScoreArray)

# # calc spread score # #

    finalSpreadScore = cfbSource.calcSpreadScore(homeTeam, awayTeam, currentCloseness)

# # final score score # #

    finalScoreScore = functions.finalscoringScore(finalClosenessScore, finalComebackScore, finalSpreadScore)

# # calc explosive plays # #

        # source for play by play
    gameURL = config['GAME_URL'] + gameID + config['PLAYS']
    
        # using requests library to retrieve get request from data source
    page = requests.get(gameURL)

        # convert response to useable json
    gameJSON = json.loads(page.text)

    finalExplosivePlaysScore = functions.calcExplosivePlays(gameJSON)

# # talent index # #

    finalTalentScore = cfbSource.calcTalentScore(homeTeam, awayTeam)

# # game importance

    # historical record + phase in record
    finalImportanceScore = cfbSource.calcImportanceScore(homeTeam, awayTeam, int(config['YEAR']))

# # lack of penalties
    gameURL = config['GAME_URL'] + gameID + config['STATS']
    page = requests.get(gameURL)
    gameJSON = json.loads(page.text)

    finalPenaltyScore = functions.finalPenaltyScore(gameJSON)

# # get basic game info for storage # #
    infoArray = uploadToMongo.getBasicGameInfo(gameID)
    homeColor = infoArray[0]
    awayColor = infoArray[1]
    dbYear = infoArray[2]
    month = infoArray[3]
    day = infoArray[4]
    startTime = infoArray[5]
    timeSlot = infoArray[6]
    quarter = 6

# # upload to db
    uploadToMongo.sendToDB(quarter, startTime, homeColor, awayColor, homeTeam, awayTeam, finalScoreScore, finalImportanceScore, finalExplosivePlaysScore, finalTalentScore, finalPenaltyScore, timeSlot, gameID, dbYear, month, day, week)

# # TEST DELETE LATER:!!!!!!!

    # # results print, later change to update db
    print("\n", homeTeam, awayTeam, finalScoreScore, "\nImportance: ", finalImportanceScore, "Closeness: ", finalClosenessScore, "Comeback: ", finalComebackScore, "\nExplosive:", finalExplosivePlaysScore, "Spread: ", finalSpreadScore, "Talent: ", finalTalentScore, "\nPenalty Score:", finalPenaltyScore)

# # IF LAST GAME FOR DAY == 6 SET CRON FOR NEXT DAY'S FIRST GAME

# # IF LAST GAME FOR WEEK == 6 SET CRON FOR POST WEEK DRIVER MID DAY SUNDAY FOR CORRECTIONS

# # ELSE RUN AGAIN