import cfbd
import functions
import os
from dotenv import dotenv_values, load_dotenv

load_dotenv()
config = dotenv_values("data-gathering/.env")

# Helper method to format teams from website format to API format #
def formatTeam(team):

    team = team.replace('St.', 'State')
    team = team.replace('ii', "i'i")
    team = team.replace('Jose', 'José')
    team = team.replace('FIU', 'Florida International')
    team = team.replace('Ill.', 'Illinois')
    team = team.replace('Colo.', 'Colorado')
    team = team.replace('ETSU', 'East Tennessee State')
    team = team.replace('Miss.', 'Mississippi')
    team = team.replace('Fla.', 'Florida')
    team = team.replace('UTSA', 'UT San Antonio')
    team = team.replace('Southern U.', 'Southern')
    team = team.replace('Ark.', 'Arkansas')
    team = team.replace('Tenn.', 'Tennessee')
    team = team.replace('Southern California', 'USC')
    team = team.replace('UNI', 'Northern Iowa')
    team = team.replace('Massachusetts', 'UMass')
    team = team.replace('Mich.', 'Michigan')
    team = team.replace(' (FL)', '')
    team = team.replace('UConn', 'Connecticut')
    team = team.replace('ULM', 'Louisiana Monroe')
    team = team.replace(' West Point', '')
    team = team.replace('Wash.', 'Washington')
    team = team.replace('App', 'Appalachian')
    team = team.replace('Ky.', 'Kentucky')
    team = team.replace('Ga.', 'Georgia')
    team = team.replace('Saint', 'St')

    return team

# # Talent Score # #
# should be (team, awayTeam)
def calcTalentScore(homeTeam, awayTeam):

    homeTeam = formatTeam(homeTeam)
    awayTeam = formatTeam(awayTeam)

    configuration = cfbd.Configuration()
    configuration.api_key['Authorization'] = config['CFB_API']
    configuration.api_key_prefix['Authorization'] = 'Bearer'

    api_instance = cfbd.TeamsApi(cfbd.ApiClient(configuration))
    talent = api_instance.get_talent(year=int(config['YEAR']))

    counter = 0
    for i in talent:
        if talent[counter]._school == homeTeam:
            homeTalent = i._talent
        if talent[counter]._school == awayTeam:
            awayTalent = i._talent
        counter += 1
    
    try:
        homeTalent = homeTalent / 20
    except:
        homeTalent = 2

    try:
        awayTalent = awayTalent / 20
    except:
        awayTalent = 2

    totalTalent = homeTalent + awayTalent
    return totalTalent

# # Calc Spread # #
def calcSpreadScore(homeTeam, awayTeam, currentCloseness):

    homeTeam = formatTeam(homeTeam)
    awayTeam = formatTeam(awayTeam)

    configuration = cfbd.Configuration()
    configuration.api_key['Authorization'] = config['CFB_API']
    configuration.api_key_prefix['Authorization'] = 'Bearer'

    api_instance = cfbd.BettingApi(cfbd.ApiClient(configuration))
    try:
        lines = api_instance.get_lines(year=int(config['YEAR']), home=homeTeam, away=awayTeam)
        # _home_score & _away_score
        # # Either want a close game or blowout for under dog
        homeScore = lines[0]._home_score
        awayScore = lines[0]._away_score
        bettingLine = lines[0]._lines[0]['formattedSpread']
        splitBettingLine = bettingLine.split()
        arrayLength = len(splitBettingLine)
        favoredAmount = -1 * (float(splitBettingLine[(arrayLength - 1)]))
        counter = 0
        favoredTeam = ""
        while counter < (arrayLength - 1):
            favoredTeam += splitBettingLine[counter] + " "
            counter += 1
        favoredTeam = favoredTeam.strip()
        currentClosenessScore = functions.closenessScore(currentCloseness)
        # need to make sure that underdog is not penalized for blowout
        # if underdog is winning currentClosenessScore should be 100
        if (favoredTeam == awayTeam) and (homeScore > awayScore):
            spreadScore = (100 * favoredAmount) / 30
        elif (favoredTeam == homeTeam) and (awayScore > homeScore):
            spreadScore = (100 * favoredAmount) / 30
        else:
            spreadScore = (currentClosenessScore * favoredAmount) / 30

        return spreadScore
    # try to get team that throws exception and figure it out
    except Exception as e:
        # search for both teams in apiTeams.txt and team that is not there gets +spread
        # get found teams talent score and evaluate from there in two try excepts
        print("Exception when calling BettingApi->get_lines: %s\n" % e)
        print(homeTeam, awayTeam, currentCloseness)
        return 0


def calcImportanceScore(homeTeam, awayTeam, date):

    homeTeam = formatTeam(homeTeam)
    awayTeam = formatTeam(awayTeam)

    configuration = cfbd.Configuration()
    configuration.api_key['Authorization'] = config['CFB_API']
    configuration.api_key_prefix['Authorization'] = 'Bearer'
    api_instance = cfbd.GamesApi(cfbd.ApiClient(configuration))

    try: 
        homeTeamJSON = api_instance.get_team_records(year=date, team=homeTeam)

    # get just the record
        homeTeamWins = int(homeTeamJSON[0]._total['wins'])
        homeTeamLosses = int(homeTeamJSON[0]._total['losses'])

    # get W/L ratio
        homeGamesPlayed = homeTeamWins + homeTeamLosses
        homeWinPercentage = homeTeamWins / homeGamesPlayed

    # factor in historical importance until 10 games played
        if homeGamesPlayed > 10:
            homeImportanceScore = homeWinPercentage
        else:
            # get some historical data to combine with win percentage
            # win percentage counts for % of 10 games played
            homeImportanceScore = 20

        # delete later when correct else is written for above
        homeImportanceScore = homeWinPercentage
    
    except:
        homeImportanceScore = 0
    
    try:
        awayTeamJSON = api_instance.get_team_records(year=date, team=awayTeam)

        awayTeamWins = awayTeamJSON[0]._total['wins']
        awayTeamLosses = awayTeamJSON[0]._total['losses']

        awayGamesPlayed = awayTeamWins + awayTeamLosses
        awayWinPercentage = awayTeamWins / awayGamesPlayed

        if awayGamesPlayed > 10:
            awayImportanceScore = awayWinPercentage
        else:
            awayImportanceScore = 20

        # delete later when a correct else is written
        awayImportanceScore = awayWinPercentage
    
    except:
        awayImportanceScore = 0

    finalImportanceScore = (homeImportanceScore * 50) + (awayImportanceScore * 50)

    return finalImportanceScore