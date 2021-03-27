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

/* This function is used to make the call to MatchMakerService to search for potential players
 * @method  search *
 * @returns  {response object}*/
export async function search(skillLevel, personalityType, preferredGame){
    console.time('search');
    const endpoint = '/matchmaker/search?skill_level=';
    const domain = MATCH_MAKER_DOMAIN;

    // Building URL
    var url = domain + endpoint + skillLevel + "&personality_type=" + personalityType + "&preferred_game=" + preferredGame;

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
        console.timeEnd('search');
        return json;
    }
    catch(error){
        console.log("ERROR in search method: " + error);
        let errorJson = {errorResponse:{ code: 503, message: "SERVICE UNAVAILABLE"}};
        return errorJson;
    }
}

/* This function is used to invoke addFriends endpoint in Match Maker Service
 * @method  fetchPlayerInfo *
 * @returns  {response object}*/
export async function addFriends(gamerId, friendIds) {
    console.time('addFriends');
    const friend_ids_param = "&friend_ids=";
    const endpoint = '/matchmaker/addFriends?player_id=';
    const domain = MATCH_MAKER_DOMAIN;

    // Building URL
    var url = domain + endpoint + gamerId + friend_ids_param + friendIds;

    const response = await fetch(url, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            console.log("ERROR in MatchMakerService: " + error);
        })

    try{
        const httpStatus = await response.status;
        console.log("httpStatus: " + httpStatus);
        console.timeEnd('addFriends');
        return httpStatus;
    }
    catch(error){
        console.log("ERROR in addFriends method: " + error);
        let errorStatus = 500;
        return errorStatus;
    }
}

/* This function is used to invoke /gamer_friends endpoint in Match Maker Service
 * @method  gamerFriendsInfo *
 * @returns  {response object}*/
export async function gamerFriendsInfo(friendIds) {
    console.time('gamerFriendsInfo');
    const endpoint = '/matchmaker/gamer_friends?gamerIds=';
    const domain = MATCH_MAKER_DOMAIN;

    // Building URL
    var url = domain + endpoint + friendIds;

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
        console.timeEnd('gamerFriendsInfo');
        return json;
    }
    catch(error){
        console.log("ERROR in gamerFriendsInfo method: " + error);
        let errorJson = {errorResponse:{ code: 503, message: "SERVICE UNAVAILABLE"}};
        return errorJson;
    }
}

/* This function is used to make the call to Match Maker Service to create a group
 * @method  postGroup *
 * @param gamerId
 * @param gamerFriendIds
 * @returns  {String}*/
export async function postGroup(gamerId, gamerFriendIds, gamerGroupId) {
    console.time('postGroup');
    const endpoint = '/matchmaker/group?gamer_id=';
    const domain = MATCH_MAKER_DOMAIN;
    var url = domain + endpoint + gamerId + "&gamer_group_id=" + gamerGroupId + "&gamer_friend_ids=" + gamerFriendIds;

    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(function (error) {
            console.log("ERROR in match maker service when posting new Group: " + error);
    })

    const stringResponse = await response;
    console.timeEnd('postGroup');
    return stringResponse;
}