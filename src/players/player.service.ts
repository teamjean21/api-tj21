/**
 * Data Model Interfaces
 */
import { Player } from "./player.interface";

/**
 * Service Methods
 */

export const find = async (name : string): Promise<Player> => {
    const playerRequest = await fetch("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Riot-Token': process.env.TOKEN as string,
        }
    }).then(function(response){ 
        return response.json();
    })

    const playerRank = await fetch("https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/"+playerRequest.id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Riot-Token': process.env.TOKEN as string,
        }
    }).then(function(response){ 
        return response.json();
    })

    const player :Player = {
        name:playerRequest.name, 
        summonerLevel:playerRequest.summonerLevel,
        profileIcon:"http://ddragon.leagueoflegends.com/cdn/12.19.1/img/profileicon/"+playerRequest.profileIconId+".png",
    };

    playerRank.forEach((rank: { queueType: string; tier: string; rank: string; leaguePoints:string; wins: number; losses: number;}) => {
        if(rank.queueType == "RANKED_SOLO_5x5"){
            player.rankSoloDuo = {
                tier : rank.tier,
                rank: rank.rank,
                leaguePoints: rank.leaguePoints,
                wins: rank.wins,
                losses: rank.losses
            };
        }
        if(rank.queueType == "RANKED_FLEX_SR"){
            player.rankFlex = {
                tier : rank.tier,
                rank: rank.rank,
                leaguePoints: rank.leaguePoints,
                wins: rank.wins,
                losses: rank.losses
            };
        }
    });
    return player;
}