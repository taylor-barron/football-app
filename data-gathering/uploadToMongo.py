
from datetime import datetime
import requests
import json
import datetime
import pymongo
import os
from dotenv import dotenv_values, load_dotenv

load_dotenv()
config = dotenv_values(".env")

def getBasicGameInfo(gameID):

    gameURL = config['GAME_URL'] + gameID + config['BASIC_INFO']
        
    #         # using requests library to retrieve get request from data source
    page = requests.get(gameURL)

    #         # convert response to useable json
    gameJSON = json.loads(page.text)

    # works, color
    awayColor = gameJSON[config['AWAY']][config['COLOR']]
    homeColor = gameJSON[config['HOME']][config['COLOR']]

    # get epoch time
    epochTime = gameJSON[config['START_INFO']][config['EPOCH_TIME']]
    convertedEpochTime = str(datetime.datetime.fromtimestamp(int(epochTime)))

    # split time up into useable info
    splitDateAndTime = convertedEpochTime.split(" ")
    dateToSplit = splitDateAndTime[0].split("-")
    year = dateToSplit[0]
    month = dateToSplit[1]
    day = dateToSplit[2]


    timeToSplit = splitDateAndTime[1].split(":")
    time = timeToSplit[0]
    time = float(time)
    minutes = timeToSplit[1]
    minutes = float(minutes)
    if minutes != 0:
        time = time + 0.5

    # determine timeslot
    if time <= 13.5:
        timeSlot = "Early"
    elif time <= 17.5:
        timeSlot = "Afternoon" 
    elif time <= 21:
        timeSlot = "Evening"
    else:
        timeSlot = "Late"

    return homeColor, awayColor, year, month, day, time, timeSlot

# # Upload game info to db # #
def sendToDB(quarter, startTime, homeColor, awayColor, homeTeam, awayTeam, scoreScore, importanceScore, explosivenessScore, talentScore, penaltyScore, timeSlot, gameID, year, month, day, week):
    client = pymongo.MongoClient(config['MONGO_CLIENT'])
    db = client[year]
    collection = db[week]

    date = month + "-" + day

    gameIDArray = gameID.split("/")
    gameID = int(gameIDArray[2])

    # quarter can be 1-4 obviously or 5 for OT or 6 for completed
    gameInfo = {

        "quarter": quarter,
        "startTime": startTime,
        "homeColor": homeColor,
        "awayColor": awayColor,
        "homeTeam": homeTeam,
        "awayTeam": awayTeam,
        "scoreScore": scoreScore,
        "importanceScore": importanceScore,
        "explosivenessScore": explosivenessScore,
        "talentScore": talentScore,
        "penaltyScore": penaltyScore
    }

    collection.find_one_and_update(
        # filter, set, upsert
        {
            "date" : date,
            "timeSlot" : timeSlot,
            "gameID": gameID

        }, { '$set': {

            "gameInfo" : gameInfo

            }
        },
        upsert=True
    )
