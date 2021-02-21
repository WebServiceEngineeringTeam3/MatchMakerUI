/**
 * This function is used to make the call to the backend Inquiry service.
 * @method  fetchSkuDetails
 * @param  {string}
 * @returns  {response object}
 */
import 'whatwg-fetch';
//whatwg-fetch is required for FETCH api in devices

import {MATCH_MAKER_DOMAIN } from '../models/Constants';


/* This function is used to make the call to MatchMakerService to obtain player info
 * @method  fetchPlayerInfo *
 * @returns  {response object}*/
export async function fetchPlayerInfo(gamerId) {
    console.time('fetchPlayerInfo');
    const endpoint = '/matchmaker/getPlayer?gamerId=';
    const domain = MATCH_MAKER_DOMAIN;

    // Building URL
    var url = domain + endpoint + gamerId;

    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            console.log("ERROR in MatchMakerService: " + error);
        })

    try{
        const json = await response.json();
        console.timeEnd('fetchPlayerInfo');
        return json;
    }
    catch(error){
        console.log("ERROR in fetchPlayerInfo method: " + error);
        let errorJson = {gamerId:gamerId, playerInfo:{ gamerId: gamerId, firstName: null}, errorResponse:{ code: 503, message: "SERVICE UNAVAILABLE"}};
        return errorJson;
    }
}

/* This function is used to make the call to Match Maker Service to update or add player
 * @method  postPlayer *
 * @param crudType
 * @param gamerId
 * @param firstName
 * @param lastName
 * @param age
 * @param skillLevel
 * @param region
 * @param language
 * @param personalityType
 * @param minimumWaitTime
 * @param game
 * @param gameMode
 * @returns  {response object}*/
export async function postPlayer(crudType, gamerId, firstName, lastName, age, skillLevel, region, language, personalityType, minimumWaitTime, game, gameMode) {
    console.time('postPlayer');
    console.log("Start postPlayer: " + JSON.stringify(firstName) + " " + JSON.stringify(lastName));
    const endpoint = '/matchmaker/postPlayer';
    const domain = MATCH_MAKER_DOMAIN;
    var url = domain + endpoint;

    let json_string = {
        "crudType": crudType,
        "playerInfo": {
            "firstName": firstName,
            "game": game,
            "gameMode": gameMode,
            "gamerId": gamerId,
            "language": language,
            "lastName": lastName,
            "age": age,
            "minimumWaitTime": minimumWaitTime,
            "personalityType": personalityType,
            "region": region,
            "skillLevel": skillLevel
        }
    };

    const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(json_string),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            console.log("ERROR in match maker service: " + error);
        })

    const json = await response.json();
    console.timeEnd('postCustomer');
    return json;
}
